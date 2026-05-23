import os
import time
import threading
import numpy as np
import cv2
import torch
from pynput import keyboard
import config
from capture import create_browser, wait_for_game, find_game_element, get_scale_factor, capture_frame, preprocess_frame, send_key_down, send_key_up
from train import JumpNet

PREVIEW_SCALE = 4
PREVIEW_WIDTH = config.FRAME_WIDTH * PREVIEW_SCALE
PREVIEW_HEIGHT = config.FRAME_HEIGHT * PREVIEW_SCALE

MODE_COLORS = {
    config.CUBE_MODE: (200, 120, 50),
    config.SHIP_MODE: (50, 200, 120),
}
MODE_LABELS = {
    config.CUBE_MODE: "CUBE",
    config.SHIP_MODE: "ROCKET",
}
MODE_PATHS = {
    config.CUBE_MODE: config.CUBE_MODEL_PATH,
    config.SHIP_MODE: config.SHIP_MODEL_PATH,
}


class AIPlayer:
    def __init__(self):
        self.models = {}
        self.device = None
        self.ai_active = False
        self.is_running = True
        self.driver = None
        self.frame_buffer = None
        self.current_expert = config.CUBE_MODE
        self.space_held = False
        self.latest_preview = None
        self.preview_lock = threading.Lock()
        self.frame_count = 0

    def load_models(self):
        self.device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
        print(f"Using device: {self.device}")

        loaded_any = False
        for mode, path in MODE_PATHS.items():
            label = MODE_LABELS[mode]
            if os.path.exists(path):
                model = JumpNet().to(self.device)
                model.load_state_dict(torch.load(path, map_location=self.device, weights_only=True))
                model.eval()
                self.models[mode] = model
                print(f"  {label} expert loaded from {path}")
                loaded_any = True
            else:
                print(f"  {label} expert: no model found at {path} (skipping)")

        if not loaded_any:
            print("\nNo trained models found! Run 'python train.py' first.")
            return False

        available = [MODE_LABELS[m] for m in self.models]
        print(f"\nAvailable experts: {', '.join(available)}")
        self.current_expert = config.CUBE_MODE if config.CUBE_MODE in self.models else list(self.models.keys())[0]
        print(f"Default expert: {MODE_LABELS[self.current_expert]}")
        return True

    def predict(self, stacked):
        model = self.models[self.current_expert]
        tensor = torch.from_numpy(stacked).unsqueeze(0).float().to(self.device)
        with torch.no_grad():
            output = model(tensor)
            probs = torch.softmax(output, dim=1)
            jump_prob = probs[0, 1].item()
            action = config.ACTION_JUMP if jump_prob >= config.JUMP_THRESHOLD else config.ACTION_NONE
            return action, probs[0].cpu().numpy()

    def on_key_press(self, key):
        try:
            key_char = key.char.lower() if key.char else ""
        except AttributeError:
            key_char = ""

        if key_char == config.AI_TOGGLE_KEY:
            if self.space_held and self.driver:
                send_key_up(self.driver)
                self.space_held = False
            self.ai_active = not self.ai_active
            self.frame_buffer = None
            self.frame_count = 0
            status = "ON" if self.ai_active else "OFF"
            expert = MODE_LABELS[self.current_expert]
            print(f"\n[AI {status}] Expert: {expert}")

        if key_char == config.MODE_KEY:
            if self.space_held and self.driver:
                send_key_up(self.driver)
                self.space_held = False
            self.current_expert = config.SHIP_MODE if self.current_expert == config.CUBE_MODE else config.CUBE_MODE
            self.frame_buffer = None
            label = MODE_LABELS[self.current_expert]
            print(f"\n{'=' * 40}")
            print(f"  [EXPERT] >>> {label} <<<")
            print(f"{'=' * 40}")

    def play_loop(self, driver, game_element, scale_factor):
        interval = 1.0 / config.FPS
        while self.is_running:
            if self.ai_active and self.current_expert in self.models:
                start = time.time()
                raw = capture_frame(driver, game_element, scale_factor)
                processed = preprocess_frame(raw)

                if self.frame_buffer is None:
                    self.frame_buffer = np.tile(processed, (config.FRAME_STACK, 1, 1))
                else:
                    self.frame_buffer = np.concatenate([self.frame_buffer[1:], processed[np.newaxis, ...]], axis=0)

                action, probs = self.predict(self.frame_buffer)

                should_hold = action == config.ACTION_JUMP
                if should_hold and not self.space_held:
                    send_key_down(self.driver)
                    self.space_held = True
                elif not should_hold and self.space_held:
                    send_key_up(self.driver)
                    self.space_held = False

                if self.frame_count % 30 == 0:
                    idle_p, jump_p = probs[0], probs[1]
                    action_str = "JUMP" if action == config.ACTION_JUMP else "idle"
                    print(f"[AI] {action_str} (idle={idle_p:.2f} jump={jump_p:.2f} threshold={config.JUMP_THRESHOLD})")
                self.frame_count += 1

                preview = (processed * 255).astype(np.uint8)
                preview_color = cv2.cvtColor(preview, cv2.COLOR_GRAY2BGR)
                if action == config.ACTION_JUMP:
                    preview_color[:, :, 2] = np.minimum(preview_color[:, :, 2].astype(np.int16) + 80, 255).astype(np.uint8)
                else:
                    preview_color[:, :, 0] = np.minimum(preview_color[:, :, 0].astype(np.int16) + 40, 255).astype(np.uint8)

                mode_color = MODE_COLORS[self.current_expert]
                expert_label = MODE_LABELS[self.current_expert]
                preview_color[:12, :, :] = mode_color
                cv2.putText(preview_color, expert_label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1, cv2.LINE_AA)
                cv2.putText(preview_color, expert_label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 255), 1, cv2.LINE_AA)

                with self.preview_lock:
                    self.latest_preview = preview_color

                elapsed = time.time() - start
                sleep_time = max(0, interval - elapsed)
                time.sleep(sleep_time)
            else:
                time.sleep(0.01)

    def run(self):
        print("=" * 60)
        print("  GEOMETRY DASH AI - MIXTURE OF EXPERTS PLAYER")
        print("=" * 60)

        if not self.load_models():
            return

        print(f"\nJump threshold: {config.JUMP_THRESHOLD} (jump when probability >= {config.JUMP_THRESHOLD})")

        print(f"\n1. The game will open in Chrome")
        print(f"2. Click PLAY to start the game")
        print(f"3. Press '{config.AI_TOGGLE_KEY.upper()}' to TOGGLE AI on/off")
        print(f"4. Press '{config.MODE_KEY.upper()}' to SWITCH expert (CUBE <-> SHIP)")
        print(f"5. When AI is ON, the active expert plays for you")
        print(f"6. Press Ctrl+C to quit\n")

        self.driver = create_browser()
        print("Browser opened! Detecting game iframe...")
        time.sleep(3)

        game_element = wait_for_game(self.driver) or find_game_element(self.driver)
        scale_factor = get_scale_factor(self.driver)
        print(f"Game element found: {game_element.size['width']}x{game_element.size['height']} (scale={scale_factor})")
        print("Click PLAY on the game, then press U to activate AI.\n")

        play_thread = threading.Thread(target=self.play_loop, args=(self.driver, game_element, scale_factor), daemon=True)
        play_thread.start()

        listener = keyboard.Listener(on_press=self.on_key_press)
        listener.start()

        window_name = "AI Vision"
        cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
        cv2.resizeWindow(window_name, PREVIEW_WIDTH, PREVIEW_HEIGHT)
        cv2.moveWindow(window_name, 1440 - PREVIEW_WIDTH - 20, 20)

        try:
            while self.is_running:
                with self.preview_lock:
                    preview = self.latest_preview
                if preview is not None:
                    cv2.imshow(window_name, preview)
                else:
                    black = np.zeros((config.FRAME_HEIGHT, config.FRAME_WIDTH, 3), dtype=np.uint8)
                    mode_color = MODE_COLORS[self.current_expert]
                    mode_label = MODE_LABELS[self.current_expert]
                    black[:12, :, :] = mode_color
                    cv2.putText(black, mode_label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1, cv2.LINE_AA)
                    cv2.putText(black, mode_label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 255), 1, cv2.LINE_AA)
                    cv2.imshow(window_name, black)
                if cv2.waitKey(33) & 0xFF == ord("q"):
                    break
        except KeyboardInterrupt:
            pass

        print("\n\nShutting down...")
        self.is_running = False
        self.ai_active = False
        listener.stop()
        cv2.destroyAllWindows()
        self.driver.quit()
        print("Done!")


if __name__ == "__main__":
    player = AIPlayer()
    player.run()
