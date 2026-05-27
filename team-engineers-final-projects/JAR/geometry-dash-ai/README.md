# Geometry Dash AI

An AI that learns to play Geometry Dash using imitation learning (behavioral cloning) followed by optional RL fine-tuning. Two separate neural networks — one for **Cube mode** (tap to jump) and one for **Ship/Rocket mode** (hold to fly) — are trained on human gameplay recordings, then optionally refined with REINFORCE.

## Setup

```bash
pip install -r requirements.txt
```

Requires Chrome and a display (uses Selenium for browser control and OpenCV for preview).

## Pipeline

```
record.py  →  train.py  →  play.py
 (capture)    (BC train)    (infer)
                  ↓
              rl_train.py  →  play.py --rl
              (RL fine-tune)    (infer RL)
```

## Usage

### 1. Record gameplay data

```bash
python record.py
```

- `R` — Start/stop recording (saves a session on stop)
- `M` — Toggle mode (CUBE / ROCKET)
- `P` — Discard current recording
- `SPACE` — Jump input

Sessions save to `data/session_XXX/` as `frames.npy`, `actions.npy`, `modes.npy`.

### 2. Train from demonstrations (behavioral cloning)

```bash
python train.py                # train both experts
python train.py --mode cube    # train only cube expert
python train.py --mode ship    # train only ship expert
```

Saves BC models to `models/cube_model.pt` and `models/ship_model.pt`. Previous models are archived to `models/archive/`.

### 3. RL fine-tuning (optional)

```bash
python rl_train.py             # fine-tune both experts
python rl_train.py --mode cube # fine-tune only cube
```

Loads BC weights, plays episodes, and applies REINFORCE with a KL divergence penalty to stay close to the BC policy. Saves RL models to `models/cube_model_rl.pt` and `models/ship_model_rl.pt` — **BC models are never overwritten**.

Controls during RL training:

- `G` — Start training
- `D` — Signal death (when the AI dies)
- `S` — Stop training
- `M` — Switch expert (CUBE ↔ ROCKET)
- `W` — Save RL models to disk
- `Q` — Quit without saving

### 4. Play

```bash
python play.py          # use BC models
python play.py --rl     # use RL-finetuned models
```

Controls during play:

- `U` — Toggle AI on/off
- `M` — Switch expert (CUBE ↔ ROCKET)
- `Q` — Quit

## Model files

| File | Source | Used by |
|------|--------|---------|
| `cube_model.pt` | `train.py` | `play.py` (default) |
| `ship_model.pt` | `train.py` | `play.py` (default) |
| `cube_model_rl.pt` | `rl_train.py` (press W to save) | `play.py --rl` |
| `ship_model_rl.pt` | `rl_train.py` (press W to save) | `play.py --rl` |

## Architecture

Each expert is a `JumpNet` CNN: 3 conv layers (8x8→4x4→3x3 kernels) → 2-layer classifier. Input: 4 stacked 84x84 grayscale frames. Output: 2 logits (idle, jump).

Mixture-of-Experts: cube and ship have fundamentally different physics (tap vs hold), so separate models avoid mode confusion.
