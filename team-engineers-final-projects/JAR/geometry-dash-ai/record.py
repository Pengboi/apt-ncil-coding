import os
import time
import threading
import numpy as np
import cv2
from pynput import keyboard
import config
from capture import create_browser, wait_for_game, find_game_element, get_scale_factor, capture_frame, preprocess_frame

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


class Recorder:
    def __init__(self):
        self.frames = []
        self.actions = []
        self.modes = []
        self.is_recording = False
        self.is_running = True
        self.jump_pressed = False
        self.current_mode = config.CUBE_MODE
        self.session_count = self._get_next_session()
        self.frame_count = 0
        self.keyboard_detected = False
        self.latest_preview = None
        self.preview_lock = threading.Lock()
        self.data_lock = threading.Lock()

    def _get_next_session(self):
        existing = [d for d in os.listdir(config.DATA_DIR) if d.startswith("session_")]
        nums = []
        for d in existing:
            try:
                nums.append(int(d.split("_")[1]))
            except (ValueError, IndexError):
                pass
        return max(nums, default=0) + 1

    def on_key_press(self, key):
        try:
            key_char = key.char.lower() if key.char else ""
        except AttributeError:
            key_char = ""

        key_name = str(key).replace("Key.", "").lower()

        if not self.keyboard_detected:
            self.keyboard_detected = True
            print(f"[KEYBOARD] Input monitoring is working! Detected key: {key_name or key_char}")

        if key_name == config.JUMP_KEY:
            if not self.jump_pressed:
                print("[SPACE] Key pressed - JUMP")
            self.jump_pressed = True

        if key_char == config.RECORD_KEY:
            if not self.is_recording:
                self.start_recording()
            else:
                self.stop_recording()

        if key_char == config.MODE_KEY:
            self.toggle_mode()

        if key_char == config.DISCARD_KEY:
            self.discard_recording()

    def on_key_release(self, key):
        key_name = str(key).replace("Key.", "").lower()
        if key_name == config.JUMP_KEY:
            print("[SPACE] Key released - NO JUMP")
            self.jump_pressed = False

    def toggle_mode(self):
        self.current_mode = config.SHIP_MODE if self.current_mode == config.CUBE_MODE else config.CUBE_MODE
        label = MODE_LABELS[self.current_mode]
        print(f"\n{'=' * 40}")
        print(f"  [MODE] >>> {label} <<<")
        print(f"{'=' * 40}")

    def start_recording(self):
        with self.data_lock:
            self.is_recording = True
            self.frames = []
            self.actions = []
            self.modes = []
            self.frame_count = 0
        mode_label = MODE_LABELS[self.current_mode]
        print(f"\n[REC ON] Recording session {self.session_count} ({mode_label})... Press '{config.RECORD_KEY.upper()}' to stop.")

    def stop_recording(self):
        with self.data_lock:
            self.is_recording = False
            frames_copy = list(self.frames)
            actions_copy = list(self.actions)
            modes_copy = list(self.modes)

        session_dir = os.path.join(config.DATA_DIR, f"session_{self.session_count:03d}")
        os.makedirs(session_dir, exist_ok=True)

        frames_array = np.array(frames_copy, dtype=np.float32)
        actions_array = np.array(actions_copy, dtype=np.int8)
        modes_array = np.array(modes_copy, dtype=np.int8)

        np.save(os.path.join(session_dir, "frames.npy"), frames_array)
        np.save(os.path.join(session_dir, "actions.npy"), actions_array)
        np.save(os.path.join(session_dir, "modes.npy"), modes_array)

        jump_pct = (actions_array.sum() / len(actions_array)) * 100 if len(actions_array) > 0 else 0
        cube_count = (modes_array == config.CUBE_MODE).sum()
        ship_count = (modes_array == config.SHIP_MODE).sum()
        print(f"[REC OFF] Saved session_{self.session_count:03d}: {len(frames_copy)} frames, {jump_pct:.1f}% jumps | cube={cube_count} ship={ship_count}")
        self.session_count += 1

    def discard_recording(self):
        with self.data_lock:
            self.is_recording = False
            count = self.frame_count
            self.frames = []
            self.actions = []
            self.modes = []
            self.frame_count = 0
        self.latest_preview = None

        print(f"\n[DELETE] Discarded {count} in-flight frames. Press '{config.RECORD_KEY.upper()}' to start again.")

    def _build_preview(self, processed):
        preview = (processed * 255).astype(np.uint8)
        preview_color = cv2.cvtColor(preview, cv2.COLOR_GRAY2BGR)
        if self.jump_pressed:
            preview_color[:, :, 2] = np.minimum(preview_color[:, :, 2].astype(np.int16) + 80, 255).astype(np.uint8)
        else:
            preview_color[:, :, 0] = np.minimum(preview_color[:, :, 0].astype(np.int16) + 40, 255).astype(np.uint8)
        mode_color = MODE_COLORS[self.current_mode]
        label = MODE_LABELS[self.current_mode]
        preview_color[:12, :, :] = mode_color
        cv2.putText(preview_color, label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(preview_color, label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 255), 1, cv2.LINE_AA)
        return preview_color

    def capture_loop(self, driver, game_element, scale_factor):
        interval = 1.0 / config.FPS
        while self.is_running:
            should_record = False
            with self.data_lock:
                should_record = self.is_recording

            if should_record:
                start = time.time()
                raw = capture_frame(driver, game_element, scale_factor)
                processed = preprocess_frame(raw)
                current_mode = self.current_mode
                with self.data_lock:
                    self.frames.append(processed)
                    self.actions.append(config.ACTION_JUMP if self.jump_pressed else config.ACTION_NONE)
                    self.modes.append(current_mode)
                    self.frame_count += 1
                    fc = self.frame_count

                preview = self._build_preview(processed)
                with self.preview_lock:
                    self.latest_preview = preview

                if fc % 30 == 0:
                    action_str = "JUMP" if self.jump_pressed else "idle"
                    mode_str = MODE_LABELS[current_mode]
                    print(f"[CAPTURE] Frame {fc} | action={action_str} | mode={mode_str} | shape={processed.shape}")
                elapsed = time.time() - start
                sleep_time = max(0, interval - elapsed)
                time.sleep(sleep_time)
            else:
                time.sleep(0.01)

    def run(self):
        print("=" * 60)
        print("  GEOMETRY DASH AI - DATA RECORDER")
        print("=" * 60)
        print(f"\n1. The game will open in Chrome")
        print(f"2. Click PLAY to start the game")
        print(f"3. Press '{config.RECORD_KEY.upper()}' to START recording")
        print(f"4. Play using SPACE to jump")
        print(f"5. Press '{config.RECORD_KEY.upper()}' to STOP recording (saves)")
        print(f"6. Press '{config.MODE_KEY.upper()}' to TOGGLE mode (CUBE <-> SHIP)")
        print(f"7. Press '{config.DISCARD_KEY.upper()}' to DISCARD current recording")
        print(f"8. Press Ctrl+C to quit\n")

        driver = create_browser()
        print("Browser opened! Detecting game iframe...")
        time.sleep(3)

        game_element = wait_for_game(driver) or find_game_element(driver)
        scale_factor = get_scale_factor(driver)
        print(f"Game element found: {game_element.size['width']}x{game_element.size['height']} (scale={scale_factor})")
        print("Click PLAY on the game, then press R to record.\n")

        capture_thread = threading.Thread(target=self.capture_loop, args=(driver, game_element, scale_factor), daemon=True)
        capture_thread.start()

        listener = keyboard.Listener(
            on_press=self.on_key_press,
            on_release=self.on_key_release
        )
        listener.start()

        print("[DIAG] Keyboard listener started. Press ANY key to verify it's working...")
        print("[DIAG] If you don't see '[KEYBOARD] Input monitoring is working!' within")
        print("[DIAG] 10 seconds, the accessibility permission is NOT granted.\n")

        window_name = "AI Vision - What the model sees"
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
                    mode_color = MODE_COLORS[self.current_mode]
                    mode_label = MODE_LABELS[self.current_mode]
                    black[:12, :, :] = mode_color
                    cv2.putText(black, mode_label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1, cv2.LINE_AA)
                    cv2.putText(black, mode_label, (4, 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 255), 1, cv2.LINE_AA)
                    cv2.imshow(window_name, black)

                if cv2.waitKey(33) & 0xFF == ord("q"):
                    break
        except KeyboardInterrupt:
            pass

        print("\n\nShutting down...")
        if self.is_recording:
            self.stop_recording()
        self.is_running = False
        listener.stop()
        cv2.destroyAllWindows()
        driver.quit()
        print("Done! Run 'python train.py' next to train your AI.")


if __name__ == "__main__":
    recorder = Recorder()
    recorder.run()
