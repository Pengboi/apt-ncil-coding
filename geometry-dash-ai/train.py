import os
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import config


class GeometryDashDataset(Dataset):
    def __init__(self, stacked_frames, actions):
        self.frames = torch.from_numpy(stacked_frames).float()
        self.actions = torch.from_numpy(actions).long()

    def __len__(self):
        return len(self.frames)

    def __getitem__(self, idx):
        return self.frames[idx], self.actions[idx]


class JumpNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(config.FRAME_STACK, 32, kernel_size=8, stride=4, padding=0),
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=4, stride=2, padding=0),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, stride=1, padding=0),
            nn.ReLU(),
            nn.Flatten(),
        )
        self.classifier = nn.Sequential(
            nn.Linear(64 * 7 * 7, 512),
            nn.ReLU(),
            nn.Dropout(config.DROPOUT),
            nn.Linear(512, config.NUM_ACTIONS),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


def load_and_split_data():
    sessions = sorted([d for d in os.listdir(config.DATA_DIR) if d.startswith("session_")])

    if not sessions:
        print("No recording data found! Run 'python record.py' first.")
        exit(1)

    cube_sessions = []
    ship_sessions = []

    for session in sessions:
        session_path = os.path.join(config.DATA_DIR, session)
        frames_path = os.path.join(session_path, "frames.npy")
        actions_path = os.path.join(session_path, "actions.npy")
        modes_path = os.path.join(session_path, "modes.npy")

        if not (os.path.exists(frames_path) and os.path.exists(actions_path)):
            continue

        frames = np.load(frames_path)
        actions = np.load(actions_path)

        if os.path.exists(modes_path):
            modes = np.load(modes_path)
        else:
            modes = np.full(len(frames), config.CUBE_MODE, dtype=np.int8)
            print(f"  {session}: {len(frames)} frames - no modes.npy, defaulting to CUBE")

        cube_mask = modes == config.CUBE_MODE
        ship_mask = modes == config.SHIP_MODE

        cube_count = cube_mask.sum()
        ship_count = ship_mask.sum()
        jump_pct = (actions.sum() / len(actions)) * 100
        print(f"  {session}: {len(frames)} frames ({cube_count} cube, {ship_count} ship), {jump_pct:.1f}% jumps")

        if cube_mask.any():
            cube_sessions.append((frames[cube_mask], actions[cube_mask]))
        if ship_mask.any():
            ship_sessions.append((frames[ship_mask], actions[ship_mask]))

    result = {}
    if cube_sessions:
        result["cube"] = cube_sessions
    if ship_sessions:
        result["ship"] = ship_sessions
    return result


def build_stacked_per_session(sessions):
    all_stacked = []
    all_actions = []

    for frames, actions in sessions:
        if len(frames) < config.FRAME_STACK:
            continue

        n_samples = len(frames) - config.FRAME_STACK + 1
        stacked = np.zeros((n_samples, config.FRAME_STACK, config.FRAME_HEIGHT, config.FRAME_WIDTH), dtype=np.float32)
        for i in range(n_samples):
            stacked[i] = frames[i:i + config.FRAME_STACK]
        stacked_actions = actions[config.FRAME_STACK - 1:]

        all_stacked.append(stacked)
        all_actions.append(stacked_actions)

    if not all_stacked:
        return np.empty((0, config.FRAME_STACK, config.FRAME_HEIGHT, config.FRAME_WIDTH), dtype=np.float32), np.empty(0, dtype=np.int8)

    return np.concatenate(all_stacked, axis=0), np.concatenate(all_actions, axis=0)


def train_expert(name, model_path, stacked_frames, actions, device):
    print(f"\n{'=' * 60}")
    print(f"  Training {name.upper()} expert")
    print(f"{'=' * 60}")

    print(f"\nStacked frames shape: {stacked_frames.shape}")
    print(f"Actions shape: {actions.shape}")
    jump_ratio = (actions.sum() / len(actions)) * 100
    print(f"Jump ratio: {jump_ratio:.1f}%")

    X_train, X_val, y_train, y_val = train_test_split(
        stacked_frames, actions, test_size=config.VALIDATION_SPLIT, random_state=42, stratify=actions
    )

    print(f"Training samples: {len(X_train)}")
    print(f"Validation samples: {len(X_val)}")

    train_dataset = GeometryDashDataset(X_train, y_train)
    val_dataset = GeometryDashDataset(X_val, y_val)
    train_loader = DataLoader(train_dataset, batch_size=config.BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=config.BATCH_SIZE, shuffle=False)

    model = JumpNet().to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=config.LEARNING_RATE)

    idle_count = (actions == 0).sum()
    jump_count = (actions == 1).sum()
    jump_weight = min(idle_count / jump_count, 2.0) if jump_count > 0 else 2.0
    class_weights = torch.tensor([1.0, jump_weight], dtype=torch.float32).to(device)
    criterion = nn.CrossEntropyLoss(weight=class_weights)
    print(f"Class weights: idle=1.0, jump={jump_weight:.2f} (capped at 2.0)")

    train_losses = []
    val_losses = []
    train_accs = []
    val_accs = []
    val_jump_recalls = []
    best_val_acc = 0

    print(f"\nTraining for {config.EPOCHS} epochs...\n")

    for epoch in range(config.EPOCHS):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for batch_frames, batch_actions in train_loader:
            batch_frames = batch_frames.to(device)
            batch_actions = batch_actions.to(device)

            optimizer.zero_grad()
            outputs = model(batch_frames)
            loss = criterion(outputs, batch_actions)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            total += batch_actions.size(0)
            correct += (predicted == batch_actions).sum().item()

        train_loss = running_loss / len(train_loader)
        train_acc = correct / total
        train_losses.append(train_loss)
        train_accs.append(train_acc)

        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        jump_total = 0
        jump_correct = 0

        with torch.no_grad():
            for batch_frames, batch_actions in val_loader:
                batch_frames = batch_frames.to(device)
                batch_actions = batch_actions.to(device)

                outputs = model(batch_frames)
                loss = criterion(outputs, batch_actions)
                val_loss += loss.item()
                _, predicted = torch.max(outputs, 1)
                total += batch_actions.size(0)
                correct += (predicted == batch_actions).sum().item()

                jump_mask = batch_actions == 1
                jump_total += jump_mask.sum().item()
                jump_correct += (predicted[jump_mask] == 1).sum().item()

        val_loss = val_loss / len(val_loader)
        val_acc = correct / total
        val_jump_recall = jump_correct / jump_total if jump_total > 0 else 0
        val_losses.append(val_loss)
        val_accs.append(val_acc)
        val_jump_recalls.append(val_jump_recall)

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), model_path)

        if (epoch + 1) % 5 == 0 or epoch == 0:
            print(f"Epoch {epoch + 1:3d}/{config.EPOCHS} | "
                  f"Train Loss: {train_loss:.4f} Acc: {train_acc:.4f} | "
                  f"Val Loss: {val_loss:.4f} Acc: {val_acc:.4f} JumpRecall: {val_jump_recall:.4f}"
                  f"{' *' if val_acc >= best_val_acc else ''}")

    print(f"\nBest validation accuracy: {best_val_acc:.4f}")
    print(f"Final jump recall: {val_jump_recalls[-1]:.4f} (1.0 = never misses a jump)")
    print(f"Model saved to: {model_path}")

    fig, axes = plt.subplots(1, 3, figsize=(18, 5))

    axes[0].plot(train_losses, label="Train")
    axes[0].plot(val_losses, label="Validation")
    axes[0].set_title(f"{name.title()} Expert - Loss")
    axes[0].set_xlabel("Epoch")
    axes[0].set_ylabel("Loss")
    axes[0].legend()

    axes[1].plot(train_accs, label="Train")
    axes[1].plot(val_accs, label="Validation")
    axes[1].set_title(f"{name.title()} Expert - Accuracy")
    axes[1].set_xlabel("Epoch")
    axes[1].set_ylabel("Accuracy")
    axes[1].legend()

    axes[2].plot(val_jump_recalls, label="Val Jump Recall", color="orange")
    axes[2].set_title(f"{name.title()} Expert - Jump Recall")
    axes[2].set_xlabel("Epoch")
    axes[2].set_ylabel("Recall")
    axes[2].legend()

    plt.tight_layout()
    plot_path = os.path.join(config.LOGS_DIR, f"{name}_training_curves.png")
    plt.savefig(plot_path)
    print(f"Training curves saved to: {plot_path}")

    return best_val_acc


import shutil


def get_next_version():
    if os.path.exists(config.VERSION_FILE):
        with open(config.VERSION_FILE, "r") as f:
            return int(f.read().strip()) + 1
    return 1


def archive_current_models(version):
    model_files = [
        ("cube_model.pt", config.CUBE_MODEL_PATH),
        ("ship_model.pt", config.SHIP_MODEL_PATH),
    ]
    archived_any = False
    for name, path in model_files:
        if os.path.exists(path):
            archive_name = f"{name.replace('.pt', '')}_v{version}.pt"
            shutil.copy2(path, os.path.join(config.ARCHIVE_DIR, archive_name))
            print(f"  Archived: {archive_name}")
            archived_any = True
    return archived_any


def train():
    print("=" * 60)
    print("  GEOMETRY DASH AI - MIXTURE OF EXPERTS TRAINER")
    print("=" * 60)

    version = get_next_version()
    print(f"\nModel version: v{version}")

    if archive_current_models(version - 1):
        print(f"  Previous models archived to models/archive/")
    else:
        print("  No previous models to archive")

    print(f"\nFrame stacking: {config.FRAME_STACK} frames per sample (per-session)")
    print("\nLoading recorded data...")
    data = load_and_split_data()

    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    print(f"\nUsing device: {device}")

    results = {}

    if "cube" in data:
        sessions = data["cube"]
        total_raw = sum(len(f) for f, a in sessions)
        print(f"\n--- CUBE DATA ---")
        print(f"Sessions: {len(sessions)}, Raw frames: {total_raw:,}")
        stacked, stacked_actions = build_stacked_per_session(sessions)
        print(f"Stacked samples: {len(stacked):,}")
        if len(stacked) > 0:
            acc = train_expert("cube", config.CUBE_MODEL_PATH, stacked, stacked_actions, device)
            results["cube"] = acc
        else:
            print("Not enough cube data to train. Skipping.")
    else:
        print("\nNo cube mode data found! Record some with mode=CUBE first.")

    if "ship" in data:
        sessions = data["ship"]
        total_raw = sum(len(f) for f, a in sessions)
        print(f"\n--- SHIP DATA ---")
        print(f"Sessions: {len(sessions)}, Raw frames: {total_raw:,}")
        stacked, stacked_actions = build_stacked_per_session(sessions)
        print(f"Stacked samples: {len(stacked):,}")
        if len(stacked) > 0:
            acc = train_expert("ship", config.SHIP_MODEL_PATH, stacked, stacked_actions, device)
            results["ship"] = acc
        else:
            print("Not enough ship data to train. Skipping.")
    else:
        print("\nNo ship mode data found! Record some with mode=SHIP (press M) first.")

    with open(config.VERSION_FILE, "w") as f:
        f.write(str(version))

    print(f"\n{'=' * 60}")
    print(f"  TRAINING COMPLETE - v{version}")
    print(f"{'=' * 60}")
    for name, acc in results.items():
        print(f"  {name.upper()} expert: best val accuracy = {acc:.4f}")
    print(f"\nRun 'python play.py' to watch your AI play!")
    print(f"Press M during play to switch between CUBE and SHIP experts.")


if __name__ == "__main__":
    train()
