import os
import time
import shutil
import argparse
import threading
import numpy as np
import cv2
import torch
import torch.nn as nn
from torch.distributions import Categorical
import config
from capture import (
    create_browser, wait_for_game, find_game_element, get_scale_factor,
    capture_frame, preprocess_frame, send_key_down, send_key_up,
    DeathDetector, restart_level,
)
from train import JumpNet

PREVIEW_SCALE = 4
PREVIEW_WIDTH = config.FRAME_WIDTH * PREVIEW_SCALE
PREVIEW_HEIGHT = config.FRAME_HEIGHT * PREVIEW_SCALE

MODE_LABELS = {
    config.CUBE_MODE: "CUBE",
    config.SHIP_MODE: "ROCKET",
}
MODE_COLORS = {
    config.CUBE_MODE: (200, 120, 50),
    config.SHIP_MODE: (50, 200, 120),
}
MODE_PATHS = {
    config.CUBE_MODE: config.CUBE_MODEL_PATH,
    config.SHIP_MODE: config.SHIP_MODEL_PATH,
}


class Transition:
    __slots__ = ["state", "action", "reward", "expert"]

    def __init__(self, state, action, reward, expert):
        self.state = state
        self.action = action
        self.reward = reward
        self.expert = expert


def compute_discounted_returns(rewards, gamma):
    returns = []
    g = 0.0
    for r in reversed(rewards):
        g = r + gamma * g
        returns.insert(0, g)
    return returns


def archive_bc_weights(mode):
    path = MODE_PATHS[mode]
    if not os.path.exists(path):
        return
    label = MODE_LABELS[mode].lower()
    archive_name = f"{label}_bc_pre_rl.pt"
    shutil.copy2(path, os.path.join(config.ARCHIVE_DIR, archive_name))
    print(f"  Archived BC weights: {archive_name}")


def sample_action(model, stacked, device):
    with torch.no_grad():
        tensor = torch.from_numpy(stacked).unsqueeze(0).float().to(device)
        logits = model(tensor)
        probs = torch.softmax(logits, dim=1)
        dist = Categorical(probs)
        action = dist.sample()
    return action.item(), probs[0].cpu().numpy()


def update_expert(model, bc_model, optimizer, transitions, returns, expert_id, device):
    indices = [i for i, t in enumerate(transitions) if t.expert == expert_id]
    if not indices:
        return None

    expert_returns = torch.tensor([returns[i] for i in indices], dtype=torch.float32)

    baseline = expert_returns.mean()
    advantages = expert_returns - baseline
    if len(advantages) > 1 and advantages.std() > 0:
        advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)

    all_states = torch.tensor(np.stack([transitions[i].state for i in indices])).float().to(device)
    all_actions = torch.tensor([transitions[i].action for i in indices]).long().to(device)

    model.train()
    logits = model(all_states)
    probs = torch.softmax(logits, dim=1)
    dist = Categorical(probs)
    log_probs = dist.log_prob(all_actions)
    entropy = dist.entropy().mean()

    policy_loss = -(log_probs * advantages.detach()).mean()
    entropy_loss = -config.RL_ENTROPY_COEFF * entropy

    with torch.no_grad():
        bc_logits = bc_model(all_states)
        bc_probs = torch.softmax(bc_logits, dim=1)
    kl_div = (bc_probs * (bc_probs.log() - probs.log())).sum(dim=1).mean()
    kl_loss = config.RL_KL_COEFF * kl_div

    loss = policy_loss + entropy_loss + kl_loss

    optimizer.zero_grad()
    loss.backward()
    nn.utils.clip_grad_norm_(model.parameters(), 0.5)
    optimizer.step()
    model.eval()

    return loss.item(), kl_div.item()


def build_preview(processed, action, probs, episode, expert):
    preview = (processed * 255).astype(np.uint8)
    preview_color = cv2.cvtColor(preview, cv2.COLOR_GRAY2BGR)
    if action == config.ACTION_JUMP:
        preview_color[:, :, 2] = np.minimum(preview_color[:, :, 2].astype(np.int16) + 80, 255).astype(np.uint8)
    else:
        preview_color[:, :, 0] = np.minimum(preview_color[:, :, 0].astype(np.int16) + 40, 255).astype(np.uint8)

    mode_color = MODE_COLORS[expert]
    expert_label = MODE_LABELS[expert]
    preview_color[:12, :, :] = mode_color
    cv2.putText(preview_color, f"RL {expert_label} E{episode}", (2, 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1, cv2.LINE_AA)
    return preview_color


def rl_train(train_mode=None):
    print("=" * 60)
    if train_mode is not None:
        label = MODE_LABELS[train_mode]
        print(f"  GEOMETRY DASH AI - RL FINE-TUNING ({label} only)")
    else:
        print(f"  GEOMETRY DASH AI - RL FINE-TUNING (Dual Expert)")
    print("=" * 60)

    device = torch.device("cpu")
    print(f"\nDevice: {device}")

    models = {}
    bc_models = {}
    optimizers = {}

    for mode in [config.CUBE_MODE, config.SHIP_MODE]:
        path = MODE_PATHS[mode]
        mlabel = MODE_LABELS[mode]

        if train_mode is not None and mode != train_mode:
            print(f"  {mlabel}: skipped (--mode flag)")

            if not os.path.exists(path):
                placeholder = JumpNet().to(device)
                torch.save(placeholder.state_dict(), path)
                print(f"  {mlabel}: created placeholder model at {path}")
            continue

        if not os.path.exists(path):
            print(f"  {mlabel}: no model found at {path}!")
            if train_mode is not None:
                print(f"  Run 'python train.py' first.")
                return
            continue

        archive_bc_weights(mode)
        model = JumpNet().to(device)
        model.load_state_dict(torch.load(path, map_location=device, weights_only=True))
        model.eval()

        bc_model = JumpNet().to(device)
        bc_model.load_state_dict(torch.load(path, map_location=device, weights_only=True))
        bc_model.eval()
        for p in bc_model.parameters():
            p.requires_grad = False

        models[mode] = model
        bc_models[mode] = bc_model
        optimizers[mode] = torch.optim.Adam(model.parameters(), lr=config.RL_LEARNING_RATE)
        print(f"  {mlabel}: loaded from {path} (BC reference saved)")

    if not models:
        print("\nNo models to train! Run 'python train.py' first.")
        return

    print(f"\nAlgorithm: REINFORCE + BC-regularized (KL penalty)")
    print(f"Episodes: {config.RL_NUM_EPISODES}")
    print(f"Batch size: {config.RL_BATCH_SIZE}")
    print(f"Gamma: {config.RL_GAMMA}")
    print(f"Entropy coeff: {config.RL_ENTROPY_COEFF}")
    print(f"KL coeff: {config.RL_KL_COEFF}")
    print(f"LR: {config.RL_LEARNING_RATE}")
    print(f"Max frames/episode: {config.RL_MAX_EPISODE_FRAMES}")

    print(f"\n1. The game will open in Chrome")
    print(f"2. Click PLAY to start the level")
    print(f"3. Press 'G' to START RL training")
    print(f"4. Press 'S' to STOP RL training")
    print(f"5. Press 'M' to SWITCH expert (CUBE <-> ROCKET) mid-episode")
    print(f"6. Press 'W' to SAVE fine-tuned models to disk")
    print(f"7. Press Ctrl+C or Q to QUIT without saving\n")

    driver = create_browser()
    print("Browser opened! Detecting game iframe...")
    time.sleep(3)

    game_element = wait_for_game(driver) or find_game_element(driver)
    scale_factor = get_scale_factor(driver)
    print(f"Game element: {game_element.size['width']}x{game_element.size['height']} (scale={scale_factor})")

    shared = {
        "training_active": False,
        "is_running": True,
        "should_save": False,
        "latest_preview": None,
        "episode": 0,
        "current_expert": config.CUBE_MODE if config.CUBE_MODE in models else list(models.keys())[0],
        "reset_frame_buffer": False,
        "preview_lock": threading.Lock(),
        "expert_lock": threading.Lock(),
        "driver_dead": False,
    }

    running_baseline = [0.0]
    all_episode_rewards = []

    def play_loop():
        detector = DeathDetector()
        frame_buffer = None
        space_held = False
        episode = 0
        transitions = []
        episode_rewards = []
        episode_frames = 0

        interval = 1.0 / config.FPS

        while shared["is_running"] and episode < config.RL_NUM_EPISODES:
            if not shared["training_active"]:
                time.sleep(0.01)
                continue

            try:
                start_time = time.time()

                if episode_frames == 0:
                    detector.reset()
                    frame_buffer = None
                    transitions = []
                    episode_rewards = []
                    if space_held:
                        send_key_up(driver)
                        space_held = False
                    with shared["expert_lock"]:
                        shared["current_expert"] = config.CUBE_MODE if config.CUBE_MODE in models else list(models.keys())[0]

                raw = capture_frame(driver, game_element, scale_factor)
                processed = preprocess_frame(raw)

                if frame_buffer is None:
                    frame_buffer = np.tile(processed, (config.FRAME_STACK, 1, 1))
                elif shared["reset_frame_buffer"]:
                    frame_buffer = np.tile(processed, (config.FRAME_STACK, 1, 1))
                    shared["reset_frame_buffer"] = False
                else:
                    frame_buffer = np.concatenate([frame_buffer[1:], processed[np.newaxis, ...]], axis=0)

                with shared["expert_lock"]:
                    current_expert = shared["current_expert"]

                active_model = models.get(current_expert)
                if active_model is None:
                    fallback = list(models.keys())[0]
                    current_expert = fallback
                    active_model = models[fallback]

                action, probs_display = sample_action(active_model, frame_buffer, device)

                should_hold = action == config.ACTION_JUMP
                if should_hold and not space_held:
                    send_key_down(driver)
                    space_held = True
                elif not should_hold and space_held:
                    send_key_up(driver)
                    space_held = False

                reward = 1.0
                transitions.append(Transition(frame_buffer.copy(), action, reward, current_expert))
                episode_rewards.append(reward)
                episode_frames += 1

                dead = detector.check(raw)
                maxed = episode_frames >= config.RL_MAX_EPISODE_FRAMES

                preview = build_preview(processed, action, probs_display, episode, current_expert)
                with shared["preview_lock"]:
                    shared["latest_preview"] = preview

                if episode_frames % 30 == 0:
                    action_str = "JUMP" if action == config.ACTION_JUMP else "idle"
                    elapsed = time.time() - start_time
                    print(f"  [E{episode}] Frame {episode_frames} | {MODE_LABELS[current_expert]} | {action_str} | idle={probs_display[0]:.2f} jump={probs_display[1]:.2f} | {elapsed*1000:.0f}ms")

                if shared["should_save"]:
                    for m, mdl in models.items():
                        torch.save(mdl.state_dict(), MODE_PATHS[m])
                    shared["should_save"] = False
                    print(f"[RL] Models SAVED")

                if dead or maxed:
                    episode += 1
                    shared["episode"] = episode
                    reason = "DEATH" if dead else "MAX FRAMES"
                    total_reward = sum(episode_rewards)
                    all_episode_rewards.append(total_reward)

                    returns = compute_discounted_returns(episode_rewards, config.RL_GAMMA)

                    if running_baseline[0] == 0.0:
                        running_baseline[0] = total_reward
                    else:
                        running_baseline[0] = config.RL_BASELINE_DECAY * running_baseline[0] + (1 - config.RL_BASELINE_DECAY) * total_reward

                    losses = {}
                    kl_divs = {}
                    for m, mdl in models.items():
                        result = update_expert(mdl, bc_models[m], optimizers[m], transitions, returns, m, device)
                        if result is not None:
                            losses[MODE_LABELS[m]] = result[0]
                            kl_divs[MODE_LABELS[m]] = result[1]

                    avg_reward = np.mean(all_episode_rewards[-20:]) if all_episode_rewards else 0

                    if episode % config.RL_BATCH_SIZE == 0 or episode <= 3:
                        loss_str = " | ".join(f"{k}={v:.4f}" for k, v in losses.items())
                        kl_str = " | ".join(f"{k}={v:.4f}" for k, v in kl_divs.items())
                        print(f"\n[RL] Episode {episode}/{config.RL_NUM_EPISODES} | "
                              f"{reason} | {episode_frames} frames | "
                              f"reward={total_reward:.0f} | baseline={running_baseline[0]:.0f} | "
                              f"avg20={avg_reward:.0f} | loss: {loss_str} | KL: {kl_str}")

                    if space_held:
                        send_key_up(driver)
                        space_held = False

                    if dead and shared["is_running"]:
                        restart_level(driver)

                    episode_frames = 0
                    transitions = []
                    episode_rewards = []
                else:
                    elapsed = time.time() - start_time
                    sleep_time = max(0, interval - elapsed)
                    time.sleep(sleep_time)

            except Exception as e:
                if not shared["is_running"]:
                    break
                print(f"[RL] Error in play loop: {e}")
                shared["driver_dead"] = True
                break

        if space_held:
            try:
                send_key_up(driver)
            except Exception:
                pass

    play_thread = threading.Thread(target=play_loop, daemon=True)
    play_thread.start()

    from pynput import keyboard

    def on_key_press(key):
        try:
            key_char = key.char.lower() if key.char else ""
        except AttributeError:
            key_char = ""

        if key_char == "g":
            shared["training_active"] = True
            print("\n[RL] Training STARTED")
        elif key_char == "s":
            shared["training_active"] = False
            print("\n[RL] Training STOPPED")
        elif key_char == "m":
            with shared["expert_lock"]:
                cur = shared["current_expert"]
                other = config.SHIP_MODE if cur == config.CUBE_MODE else config.CUBE_MODE
                if other in models:
                    shared["current_expert"] = other
                    shared["reset_frame_buffer"] = True
                    print(f"\n[RL] Expert switched to {MODE_LABELS[other]} (frame buffer reset)")
                else:
                    print(f"\n[RL] {MODE_LABELS[other]} model not loaded, staying on {MODE_LABELS[cur]}")
        elif key_char == "w":
            shared["should_save"] = True
            print("\n[RL] Saving models...")
        elif key_char == "q":
            shared["is_running"] = False

    listener = keyboard.Listener(on_press=on_key_press)
    listener.start()

    window_name = "RL Training"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, PREVIEW_WIDTH, PREVIEW_HEIGHT)
    cv2.moveWindow(window_name, 1440 - PREVIEW_WIDTH - 20, 20)

    try:
        while shared["is_running"] and not shared["driver_dead"]:
            with shared["preview_lock"]:
                preview = shared["latest_preview"]

            if preview is not None:
                cv2.imshow(window_name, preview)
            else:
                black = np.zeros((config.FRAME_HEIGHT, config.FRAME_WIDTH, 3), dtype=np.uint8)
                with shared["expert_lock"]:
                    expert = shared["current_expert"]
                mode_color = MODE_COLORS[expert]
                black[:12, :, :] = mode_color
                if not shared["training_active"]:
                    cv2.putText(black, f"RL {MODE_LABELS[expert]} | Press G", (2, 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1, cv2.LINE_AA)
                else:
                    cv2.putText(black, f"RL {MODE_LABELS[expert]} E{shared['episode']}", (2, 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1, cv2.LINE_AA)
                cv2.imshow(window_name, black)

            if cv2.waitKey(33) & 0xFF == ord("q"):
                shared["is_running"] = False
                break
    except KeyboardInterrupt:
        shared["is_running"] = False

    shared["is_running"] = False
    time.sleep(0.1)

    if shared["should_save"]:
        for m, mdl in models.items():
            torch.save(mdl.state_dict(), MODE_PATHS[m])
        print(f"\n[RL] Models SAVED")
    else:
        print(f"\n[RL] Quit without saving — BC weights unchanged")

    print(f"Episodes trained: {shared['episode']}")
    if all_episode_rewards:
        print(f"Best avg reward (last 20): {np.mean(all_episode_rewards[-20:]):.0f}")

    listener.stop()
    cv2.destroyAllWindows()
    try:
        driver.quit()
    except Exception:
        pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="RL Fine-Tuning for Geometry Dash AI")
    parser.add_argument("--mode", choices=["cube", "ship"], default=None,
                        help="Train only one expert (omit for dual-expert mode)")
    args = parser.parse_args()

    train_mode = None
    if args.mode == "cube":
        train_mode = config.CUBE_MODE
    elif args.mode == "ship":
        train_mode = config.SHIP_MODE

    rl_train(train_mode)
