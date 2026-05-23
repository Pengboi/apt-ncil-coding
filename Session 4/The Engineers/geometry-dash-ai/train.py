import os
import sys
import glob
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from stable_baselines3 import PPO
from stable_baselines3.common.callbacks import BaseCallback

from env.geometry_dash_env import GeometryDashEnv

RECORDINGS_DIR = os.path.join(os.path.dirname(__file__), "recordings")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")


class ImitationDataset(Dataset):
    def __init__(self, recordings_dir):
        self.observations = []
        self.actions = []

        files = sorted(glob.glob(os.path.join(recordings_dir, "*.npz")))
        if not files:
            raise FileNotFoundError(
                f"No recordings found in {recordings_dir}/\n"
                "Run 'python record.py' first to record your gameplay!"
            )

        total_frames = 0
        total_jumps = 0
        for filepath in files:
            data = np.load(filepath)
            frames = data["frames"]
            actions = data["actions"]
            self.observations.append(frames)
            self.actions.append(actions)
            total_frames += len(frames)
            total_jumps += int(np.sum(actions))
            print(
                f"  Loaded: {os.path.basename(filepath)} "
                f"({len(frames)} frames, {int(np.sum(actions))} jumps)"
            )

        self.observations = np.concatenate(self.observations, axis=0)
        self.actions = np.concatenate(self.actions, axis=0)

        self.observations = self.observations.astype(np.float32) / 255.0
        self.observations = self.observations[:, :, :, np.newaxis]

        print(
            f"\nDataset ready: {len(self.observations)} frames, "
            f"{total_jumps} jumps ({total_jumps / len(self.observations) * 100:.1f}% jump rate)"
        )

    def __len__(self):
        return len(self.observations)

    def __getitem__(self, idx):
        return self.observations[idx].transpose(2, 0, 1), int(self.actions[idx])


class ImitationNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=8, stride=4, padding=0),
            nn.ReLU(),
            nn.Conv2d(16, 32, kernel_size=4, stride=2, padding=0),
            nn.ReLU(),
            nn.Flatten(),
            nn.Linear(32 * 9 * 9, 256),
            nn.ReLU(),
        )
        self.classifier = nn.Sequential(
            nn.Linear(256, 2),
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)


def train_imitation(epochs=10, batch_size=64, lr=0.001):
    print("=" * 60)
    print("PHASE 1: IMITATION LEARNING")
    print("=" * 60)
    print("The AI is studying your recordings like a textbook...")
    print()

    dataset = ImitationDataset(RECORDINGS_DIR)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    device = torch.device(
        "mps"
        if torch.backends.mps.is_available()
        else "cuda"
        if torch.cuda.is_available()
        else "cpu"
    )
    print(f"Using device: {device}")

    model = ImitationNetwork().to(device)
    optimizer = optim.Adam(model.parameters(), lr=lr)
    criterion = nn.CrossEntropyLoss()

    os.makedirs(MODELS_DIR, exist_ok=True)

    for epoch in range(epochs):
        total_loss = 0.0
        correct = 0
        total = 0

        for batch_obs, batch_actions in dataloader:
            batch_obs = batch_obs.to(device)
            batch_actions = batch_actions.to(device)

            optimizer.zero_grad()
            outputs = model(batch_obs)
            loss = criterion(outputs, batch_actions)
            loss.backward()
            optimizer.step()

            total_loss += loss.item()
            predicted = outputs.argmax(dim=1)
            correct += (predicted == batch_actions).sum().item()
            total += batch_actions.size(0)

        accuracy = correct / total * 100
        print(
            f"  Epoch {epoch + 1}/{epochs} | "
            f"Loss: {total_loss / len(dataloader):.4f} | "
            f"Accuracy: {accuracy:.1f}%"
        )

    imitation_path = os.path.join(MODELS_DIR, "imitation_model.pth")
    torch.save(model.state_dict(), imitation_path)
    print(f"\nImitation model saved to: {imitation_path}")
    print(f"Accuracy after training: {accuracy:.1f}%")
    print()

    return model, device


def train_reinforcement(total_timesteps=500_000, imitation_model=None, device=None):
    print("=" * 60)
    print("PHASE 2: REINFORCEMENT LEARNING")
    print("=" * 60)

    if imitation_model is not None:
        print("Starting from your imitation model (head start!)")
    else:
        print("Starting from scratch (no human recordings)")

    print(f"Training for {total_timesteps:,} timesteps...")
    print("The AI is practicing on its own now. This may take a while.")
    print()

    env = GeometryDashEnv(render_mode=None)

    os.makedirs(MODELS_DIR, exist_ok=True)

    model = PPO(
        "CnnPolicy",
        env,
        learning_rate=0.0003,
        n_steps=2048,
        batch_size=64,
        n_epochs=10,
        verbose=1,
        tensorboard_log=None,
    )

    if imitation_model is not None:
        print("Transferring imitation knowledge to RL model...")
        _transfer_imitation_to_ppo(model, imitation_model, device)

    callback = ProgressCallback(check_freq=10000)

    model.learn(total_timesteps=total_timesteps, callback=callback)

    model_path = os.path.join(MODELS_DIR, "ppo_geometry_dash")
    model.save(model_path)
    print(f"\nRL model saved to: {model_path}.zip")

    env.close()
    return model


def _transfer_imitation_to_ppo(ppo_model, imitation_model, device):
    try:
        ppo_policy = ppo_model.policy
        imitation_state = imitation_model.state_dict()

        ppo_cnn = ppo_policy.features_extractor.cnn
        ppo_cnn[0].weight.data = torch.tensor(
            imitation_state["features.0.weight"].numpy()
        ).to(ppo_cnn[0].weight.device)
        ppo_cnn[0].bias.data = torch.tensor(
            imitation_state["features.0.bias"].numpy()
        ).to(ppo_cnn[0].bias.device)
        ppo_cnn[2].weight.data = torch.tensor(
            imitation_state["features.2.weight"].numpy()
        ).to(ppo_cnn[2].weight.device)
        ppo_cnn[2].bias.data = torch.tensor(
            imitation_state["features.2.bias"].numpy()
        ).to(ppo_cnn[2].bias.device)

        print("  Transferred CNN weights from imitation model!")
    except Exception as e:
        print(f"  Could not transfer weights: {e}")
        print("  Continuing with random weights (RL will learn from scratch)")


class ProgressCallback(BaseCallback):
    def __init__(self, check_freq=10000):
        super().__init__()
        self.check_freq = check_freq

    def _on_step(self):
        if self.num_timesteps % self.check_freq == 0:
            print(f"  Timesteps: {self.num_timesteps:,}")
        return True


def train_full(imitation_epochs=10, rl_timesteps=500_000):
    print()
    print("*" * 60)
    print("  GEOMETRY DASH AI — FULL TRAINING")
    print("*" * 60)
    print()

    has_recordings = (
        os.path.exists(RECORDINGS_DIR)
        and len(glob.glob(os.path.join(RECORDINGS_DIR, "*.npz"))) > 0
    )

    imitation_model = None
    device = None

    if has_recordings:
        imitation_model, device = train_imitation(epochs=imitation_epochs)
    else:
        print("No recordings found. Skipping imitation phase.")
        print("Run 'python record.py' first for faster training!\n")

    model = train_reinforcement(
        total_timesteps=rl_timesteps, imitation_model=imitation_model, device=device
    )

    print()
    print("*" * 60)
    print("  TRAINING COMPLETE!")
    print("*" * 60)
    print(f"  Model saved in: {MODELS_DIR}/")
    print(f"  Run 'python play.py' to watch your AI play!")
    print("*" * 60)


if __name__ == "__main__":
    os.environ["SDL_VIDEODRIVER"] = "dummy"

    if len(sys.argv) > 1:
        mode = sys.argv[1]
        if mode == "imitation":
            train_imitation(epochs=int(sys.argv[2]) if len(sys.argv) > 2 else 10)
        elif mode == "rl":
            timesteps = int(sys.argv[2]) if len(sys.argv) > 2 else 500_000
            train_reinforcement(total_timesteps=timesteps)
        elif mode == "full":
            epochs = int(sys.argv[2]) if len(sys.argv) > 2 else 10
            timesteps = int(sys.argv[3]) if len(sys.argv) > 3 else 500_000
            train_full(imitation_epochs=epochs, rl_timesteps=timesteps)
        else:
            print(f"Unknown mode: {mode}")
            print("Usage: python train.py [imitation|rl|full] [epochs] [timesteps]")
    else:
        train_full()
