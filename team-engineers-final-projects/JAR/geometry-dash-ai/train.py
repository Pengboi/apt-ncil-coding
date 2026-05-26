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
    def __init__(self, in_channels=None, dropout=None):
        super().__init__()
        if in_channels is None:
            in_channels = config.FRAME_STACK
        if dropout is None:
            dropout = config.DROPOUT
        self.features = nn.Sequential(
            nn.Conv2d(in_channels, 32, kernel_size=8, stride=4, padding=0),
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
            nn.Dropout(dropout),
            nn.Linear(512, config.NUM_ACTIONS),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


MIN_SESSION_FRAMES = 10


def _find_mode_segments(frames, actions, modes):
    segments = []
    start = 0
    current_mode = modes[0]
    for i in range(1, len(modes)):
        if modes[i] != current_mode:
            segments.append((frames[start:i], actions[start:i], current_mode))
            start = i
            current_mode = modes[i]
    segments.append((frames[start:], actions[start:], current_mode))
    return segments


def load_and_split_data(pure_only=False):
    sessions = sorted([d for d in os.listdir(config.DATA_DIR) if d.startswith("session_")])

    if not sessions:
        print("No recording data found! Run 'python record.py' first.")
        exit(1)

    cube_sessions = []
    ship_sessions = []
    skipped = 0

    for session in sessions:
        session_path = os.path.join(config.DATA_DIR, session)
        frames_path = os.path.join(session_path, "frames.npy")
        actions_path = os.path.join(session_path, "actions.npy")
        modes_path = os.path.join(session_path, "modes.npy")

        if not (os.path.exists(frames_path) and os.path.exists(actions_path)):
            skipped += 1
            continue

        frames = np.load(frames_path)
        actions = np.load(actions_path)

        if len(frames) < MIN_SESSION_FRAMES:
            print(f"  {session}: {len(frames)} frames - SKIPPED (below {MIN_SESSION_FRAMES})")
            skipped += 1
            continue

        if os.path.exists(modes_path):
            modes = np.load(modes_path)
        else:
            modes = np.full(len(frames), config.CUBE_MODE, dtype=np.int8)
            print(f"  {session}: {len(frames)} frames - no modes.npy, defaulting to CUBE")

        cube_count = (modes == config.CUBE_MODE).sum()
        ship_count = (modes == config.SHIP_MODE).sum()
        is_mixed = cube_count > 0 and ship_count > 0

        if pure_only and is_mixed:
            print(f"  {session}: {len(frames)} frames ({cube_count} cube, {ship_count} ship) - SKIPPED (mixed, --pure)")
            skipped += 1
            continue

        tag = " [mixed]" if is_mixed else ""
        jump_pct = (actions.sum() / len(actions)) * 100
        print(f"  {session}: {len(frames)} frames ({cube_count} cube, {ship_count} ship), {jump_pct:.1f}% jumps{tag}")

        segments = _find_mode_segments(frames, actions, modes)
        for seg_frames, seg_actions, seg_mode in segments:
            if len(seg_frames) < MIN_SESSION_FRAMES:
                continue
            if seg_mode == config.CUBE_MODE:
                cube_sessions.append((seg_frames, seg_actions))
            else:
                ship_sessions.append((seg_frames, seg_actions))

    if skipped:
        print(f"\n  Skipped {skipped} sessions")

    result = {}
    if cube_sessions:
        result["cube"] = cube_sessions
    if ship_sessions:
        result["ship"] = ship_sessions
    return result


def build_stacked_per_session(sessions, frame_stack=None):
    if frame_stack is None:
        frame_stack = config.FRAME_STACK
    all_stacked = []
    all_actions = []

    for frames, actions in sessions:
        if len(frames) < frame_stack:
            continue

        n_samples = len(frames) - frame_stack + 1
        stacked = np.zeros((n_samples, frame_stack, config.FRAME_HEIGHT, config.FRAME_WIDTH), dtype=np.float32)
        for i in range(n_samples):
            stacked[i] = frames[i:i + frame_stack]
        stacked_actions = actions[frame_stack - 1:]

        if n_samples > config.SESSION_STACK_CAP:
            idx = np.random.choice(n_samples, config.SESSION_STACK_CAP, replace=False)
            idx.sort()
            stacked = stacked[idx]
            stacked_actions = stacked_actions[idx]

        all_stacked.append(stacked)
        all_actions.append(stacked_actions)

    if not all_stacked:
        return np.empty((0, frame_stack, config.FRAME_HEIGHT, config.FRAME_WIDTH), dtype=np.float32), np.empty(0, dtype=np.int8)

    return np.concatenate(all_stacked, axis=0), np.concatenate(all_actions, axis=0)


def build_diff_stacked_per_session(sessions, history=None, diff_offsets=None):
    if history is None:
        history = config.SHIP_HISTORY
    if diff_offsets is None:
        diff_offsets = config.SHIP_DIFF_OFFSETS
    n_channels = 1 + len(diff_offsets)
    all_stacked = []
    all_actions = []

    for frames, actions in sessions:
        if len(frames) < history:
            continue

        n_samples = len(frames) - history + 1
        stacked = np.zeros((n_samples, n_channels, config.FRAME_HEIGHT, config.FRAME_WIDTH), dtype=np.float32)
        for i in range(n_samples):
            t = history - 1 + i
            stacked[i, 0] = frames[t]
            for c, offset in enumerate(diff_offsets):
                stacked[i, c + 1] = frames[t] - frames[t - offset]
        stacked_actions = actions[history - 1:]

        if n_samples > config.SESSION_STACK_CAP:
            idx = np.random.choice(n_samples, config.SESSION_STACK_CAP, replace=False)
            idx.sort()
            stacked = stacked[idx]
            stacked_actions = stacked_actions[idx]

        all_stacked.append(stacked)
        all_actions.append(stacked_actions)

    if not all_stacked:
        return np.empty((0, n_channels, config.FRAME_HEIGHT, config.FRAME_WIDTH), dtype=np.float32), np.empty(0, dtype=np.int8)

    return np.concatenate(all_stacked, axis=0), np.concatenate(all_actions, axis=0)


def train_expert(name, model_path, stacked_frames, actions, device,
                 in_channels=None, lr=None, dropout=None, patience=None):
    if in_channels is None:
        in_channels = config.FRAME_STACK
    if lr is None:
        lr = config.LEARNING_RATE
    if dropout is None:
        dropout = config.DROPOUT
    if patience is None:
        patience = config.EARLY_STOP_PATIENCE

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

    model = JumpNet(in_channels=in_channels, dropout=dropout).to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

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
    best_epoch = 0
    patience_counter = 0

    print(f"\nTraining for up to {config.EPOCHS} epochs (early stop after {patience} without improvement)...\n")

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
            best_epoch = epoch
            patience_counter = 0
            torch.save(model.state_dict(), model_path)
        else:
            patience_counter += 1

        if (epoch + 1) % 5 == 0 or epoch == 0:
            print(f"Epoch {epoch + 1:3d}/{config.EPOCHS} | "
                  f"Train Loss: {train_loss:.4f} Acc: {train_acc:.4f} | "
                  f"Val Loss: {val_loss:.4f} Acc: {val_acc:.4f} JumpRecall: {val_jump_recall:.4f}"
                  f"{' *' if val_acc >= best_val_acc else ''}")

        if patience_counter >= patience:
            print(f"\nEarly stopping at epoch {epoch + 1} (no improvement for {patience} epochs)")
            break

    print(f"\nBest validation accuracy: {best_val_acc:.4f} (epoch {best_epoch + 1})")
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


def train(train_mode=None, pure_only=False):
    print("=" * 60)
    if train_mode is not None:
        label = "CUBE" if train_mode == config.CUBE_MODE else "SHIP"
        print(f"  GEOMETRY DASH AI - MIXTURE OF EXPERTS TRAINER ({label} only)")
    else:
        print("  GEOMETRY DASH AI - MIXTURE OF EXPERTS TRAINER")
    print("=" * 60)

    version = get_next_version()
    print(f"\nModel version: v{version}")

    if archive_current_models(version - 1):
        print(f"  Previous models archived to models/archive/")
    else:
        print("  No previous models to archive")

    print(f"\nFrame stacking: CUBE={config.FRAME_STACK} raw frames, SHIP=1+{len(config.SHIP_DIFF_OFFSETS)} diff channels (history={config.SHIP_HISTORY})")
    print(f"Session cap: {config.SESSION_STACK_CAP} stacked samples per segment\n")
    print("Loading recorded data...")
    data = load_and_split_data(pure_only=pure_only)

    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    print(f"\nUsing device: {device}")

    results = {}

    if "cube" in data:
        if train_mode is not None and train_mode != config.CUBE_MODE:
            print("\n--- CUBE DATA --- skipped (--mode ship)")
        else:
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
        if train_mode is None or train_mode == config.CUBE_MODE:
            print("\nNo cube mode data found! Record some with mode=CUBE first.")

    if "ship" in data:
        if train_mode is not None and train_mode != config.SHIP_MODE:
            print("\n--- SHIP DATA --- skipped (--mode cube)")
        else:
            sessions = data["ship"]
            total_raw = sum(len(f) for f, a in sessions)
            print(f"\n--- SHIP DATA ---")
            print(f"Sessions: {len(sessions)}, Raw frames: {total_raw:,}")
            stacked, stacked_actions = build_diff_stacked_per_session(sessions)
            print(f"Stacked samples: {len(stacked):,} (diff channels={config.SHIP_IN_CHANNELS}, history={config.SHIP_HISTORY})")
            if len(stacked) > 0:
                acc = train_expert("ship", config.SHIP_MODEL_PATH, stacked, stacked_actions, device,
                                   in_channels=config.SHIP_IN_CHANNELS,
                                   lr=config.SHIP_LEARNING_RATE,
                                   dropout=config.SHIP_DROPOUT,
                                   patience=config.SHIP_EARLY_STOP_PATIENCE)
                results["ship"] = acc
            else:
                print("Not enough ship data to train. Skipping.")
    else:
        if train_mode is None or train_mode == config.SHIP_MODE:
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
    import argparse
    parser = argparse.ArgumentParser(description="Train Geometry Dash AI experts")
    parser.add_argument("--mode", choices=["cube", "ship"], default=None,
                        help="Train only one expert (omit for both)")
    parser.add_argument("--pure", action="store_true",
                        help="Only use single-mode sessions (skip mixed cube+ship sessions)")
    args = parser.parse_args()

    train_mode = None
    if args.mode == "cube":
        train_mode = config.CUBE_MODE
    elif args.mode == "ship":
        train_mode = config.SHIP_MODE

    train(train_mode, pure_only=args.pure)
