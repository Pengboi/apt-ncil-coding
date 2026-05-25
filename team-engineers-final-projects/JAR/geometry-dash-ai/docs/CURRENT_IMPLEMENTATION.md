# Geometry Dash AI — Current Implementation

## Overview

An imitation learning system that trains a Mixture-of-Experts (MoE) model to play Geometry Dash. Two separate neural networks — one for **Cube mode** (tap to jump) and one for **Ship/Rocket mode** (hold to fly) — are trained on human gameplay recordings.

## Architecture

```
record.py  →  train.py  →  play.py
 (capture)    (train)     (infer)
     ↓            ↓           ↓
  data/       models/     browser + AI
```

### Pipeline Flow

1. **Record** — A human plays Geometry Dash in a Chrome browser. Every frame, the game screen is captured, preprocessed to 84x84 grayscale, and saved alongside the player's input (jump/idle) and current mode (cube/ship).
2. **Train** — Recorded sessions are loaded, split by mode, stacked into 4-frame sequences (per-session to avoid cross-contamination), and used to train two separate `JumpNet` models via supervised learning (CrossEntropyLoss with class weights).
3. **Play** — Both trained models are loaded. The AI captures the game screen in real-time, feeds it through the active expert, and decides whether to hold or release the space bar based on a probability threshold.

## File Reference

### `config.py`

All project-wide settings in one place:

| Setting | Value | Purpose |
|---------|-------|---------|
| `BROWSER_WIDTH/HEIGHT` | 1024x768 | Fixed browser window size |
| `FRAME_WIDTH/HEIGHT` | 84x84 | Neural network input resolution |
| `FPS` | 30 | Capture rate |
| `FRAME_STACK` | 4 | Number of consecutive frames per input |
| `JUMP_THRESHOLD` | 0.30 | Minimum jump probability to act (softmax, not argmax) |
| `CUBE_MODE/SHIP_MODE` | 0/1 | Mode identifiers |
| `LEARNING_RATE` | 1e-3 | BC training learning rate |
| `EPOCHS` | 30 | BC training epochs |
| `BATCH_SIZE` | 64 | BC training batch size |
| `DROPOUT` | 0.3 | Dropout in classifier head |

Also defines all paths (`DATA_DIR`, `MODELS_DIR`, `LOGS_DIR`, `ARCHIVE_DIR`, `VERSION_FILE`, model paths) and auto-creates directories on import.

### `capture.py`

Browser control and frame processing:

- **`create_browser()`** — Opens Chrome at 1024x768 with `--force-device-scale-factor=0.5` (renders at half resolution for faster screenshots). Navigates to the game URL.
- **`find_game_element(driver)`** — Locates the game iframe. Tries `#iframehtml5` by ID, then heuristic (large iframe with game-related src), then falls back to `<body>`.
- **`wait_for_game(driver, timeout=15)`** — Polls up to 15 seconds for the game iframe to appear and reach at least 100x100 pixels. Returns the iframe element or None.
- **`get_scale_factor(driver)`** — Queries `window.devicePixelRatio` from the browser. Used to scale crop coordinates to match the actual screenshot resolution.
- **`capture_frame(driver, game_element, scale_factor)`** — Takes a full-viewport screenshot via `driver.get_screenshot_as_png()`, converts to grayscale, crops to the game element's bounding box (scaled by `scale_factor`), and resizes to 84x84 using PIL bilinear interpolation. Returns a uint8 numpy array.
- **`preprocess_frame(frame)`** — Normalizes uint8 frame to float32 in [0, 1].
- **`send_key_down(driver)` / `send_key_up(driver)`** — Press/release space bar via Selenium ActionChains. Used by play.py for hold-based control (ship mode).

### `record.py`

Data collection tool with real-time preview:

- **Controls:**
  - `R` — Start/stop recording (saves session on stop)
  - `M` — Toggle mode between CUBE and ROCKET
  - `P` — Discard current recording (don't save)
  - `SPACE` — Jump input (recorded as action)
  - `Ctrl+C` — Quit

- **Session format:** Each recording saves to `data/session_XXX/` with:
  - `frames.npy` — float32 array of shape (N, 84, 84), preprocessed frames
  - `actions.npy` — int8 array (0=idle, 1=jump), per-frame
  - `modes.npy` — int8 array (0=cube, 1=ship), per-frame

- **Preview window:** OpenCV window showing what the model sees, with a colored top bar (orange=CUBE, green=ROCKET) and red/blue tint indicating jump/idle state.

- **Startup flow:** Opens browser → waits for game iframe → detects scale factor → starts capture thread + keyboard listener → enters preview loop.

### `train.py`

Mixture-of-Experts trainer:

- **`JumpNet`** — CNN with 3 conv layers (8x8→4x4→3x3 kernels, stride 4→2→1, channels 32→64→64), flatten, then 2-layer classifier (3136→512→2) with dropout. Input: (batch, 4, 84, 84). Output: 2 logits (idle, jump).

- **`load_and_split_data()`** — Scans `data/session_XXX/`, loads frames/actions/modes, splits into cube and ship sessions. Sessions without `modes.npy` default to cube mode.

- **`build_stacked_per_session(sessions)`** — Creates 4-frame stacks within each session (no cross-session contamination). First 3 frames are warm-up; effective samples = N-3 per session.

- **`train_expert(name, model_path, stacked_frames, actions, device)`** — Full training loop:
  - 80/20 train/val split (stratified)
  - CrossEntropyLoss with auto-balanced class weights (jump weight capped at 2.0)
  - Tracks loss, accuracy, and jump recall per epoch
  - Saves best model by validation accuracy
  - Plots training curves to `logs/`

- **Versioning & Archival:**
  - `models/version.txt` — auto-increments each training run
  - Previous models archived to `models/archive/cube_model_vX.pt` / `ship_model_vX.pt`

### `play.py`

Real-time AI player with expert switching:

- **Controls:**
  - `U` — Toggle AI on/off
  - `M` — Switch active expert (CUBE ↔ ROCKET)
  - `Ctrl+C` or `Q` — Quit

- **Inference:** Captures frame → stacks 4 frames → forward pass → softmax → compares jump probability to `JUMP_THRESHOLD` (0.30) → holds or releases space bar.

- **Hold/release control:** Unlike the old tap-based `send_jump()`, the AI now tracks whether space is currently held. It only sends `key_down` when transitioning to jump, and `key_up` when transitioning to idle. This correctly handles ship mode (hold to fly) vs cube mode (tap to jump).

- **Space held state:** Reset when toggling AI off or switching experts, preventing stuck keys.

## Data Flow Diagram

```
Browser (Chrome 1024x768, scale=0.5)
  │
  ├─ screenshot (512x384 PNG)
  │     │
  │     ├─ crop to game element (scaled coords)
  │     ├─ convert to grayscale
  │     └─ resize to 84x84
  │
  ├─ preprocess: uint8 → float32 / 255
  │
  ├─ stack 4 frames → (4, 84, 84)
  │
  └─ JumpNet forward pass
        │
        ├─ Conv2d(4→32, 8x8, stride 4) → ReLU
        ├─ Conv2d(32→64, 4x4, stride 2) → ReLU
        ├─ Conv2d(64→64, 3x3, stride 1) → ReLU
        ├─ Flatten → 3136
        ├─ Linear(3136→512) → ReLU → Dropout(0.3)
        └─ Linear(512→2) → logits
              │
              ├─ softmax → [idle_prob, jump_prob]
              └─ jump_prob >= 0.30? → hold space : release space
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Two separate models (MoE) | Cube and ship have fundamentally different physics (tap vs hold). A single model confuses the two. |
| Per-session frame stacking | Stacking across session boundaries creates garbage samples (unrelated frames glued together). |
| Jump threshold 0.30 | ~75% of frames are idle, so jump probability rarely exceeds 0.50. Threshold of 0.30 gives reasonable sensitivity. |
| Scale factor 0.5 | Renders Chrome at half resolution, making screenshots ~4x smaller (512x384 vs 1024x768). Significant speedup since output is 84x84 anyway. |
| Full-viewport screenshot + crop | `element.screenshot_as_png` returns blank on cross-origin iframes. Full-page screenshot works but requires cropping. |
| Hold/release key control | Ship mode requires holding space (continuous thrust). The old tap-per-frame approach was correct for cube but wrong for ship. |

## Directory Structure

```
geometry-dash-ai/
├── config.py              # All settings
├── capture.py             # Browser, capture, preprocessing, input
├── record.py              # Data collection tool
├── train.py               # MoE trainer (JumpNet, data loading, training loop)
├── play.py                # AI player with expert switching
├── data/
│   └── session_XXX/       # Recorded gameplay sessions
│       ├── frames.npy     # (N, 84, 84) float32
│       ├── actions.npy    # (N,) int8 [0=idle, 1=jump]
│       └── modes.npy      # (N,) int8 [0=cube, 1=ship]
├── models/
│   ├── cube_model.pt      # Trained cube expert
│   ├── ship_model.pt      # Trained ship expert
│   ├── version.txt        # Training version counter
│   └── archive/           # Previous model versions
├── logs/                  # Training curve plots
└── docs/                  # Documentation
```
