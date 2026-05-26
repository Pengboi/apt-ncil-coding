# Geometry Dash AI — Challenges & Solutions

## 1. Cross-Session Garbage Stacking

### Problem
When building 4-frame stacks for training, frames from the end of one session were being concatenated with frames from the start of another. Session A's last frame (player about to die) followed by Session B's first frame (level just started) creates a meaningless input — the model trains on a transition that never actually happened.

### Solution
`build_stacked_per_session()` in `train.py` creates frame stacks *within each session only*. The first `FRAME_STACK - 1` frames of each session are warm-up (used as context but not as training targets). No cross-session concatenation.

```python
# Per session: stack frames i, i+1, i+2, i+3 → target is action at i+3
for i in range(n_samples):
    stacked[i] = frames[i:i + FRAME_STACK]
```

### Lesson
When building sequential training data from discrete recording sessions, always verify that the stacking boundary doesn't cross session lines. This bug is silent — the model trains without errors, just learns garbage transitions.

---

## 2. Jump Probability Never Exceeds 0.50

### Problem
The model's jump probability for any frame never crossed 0.50, making argmax-based decisions always predict "idle." The model appeared to never learn to jump.

### Root Cause
~75% of training frames are idle (no jump). The class imbalance pushes the model toward predicting idle for everything. Even with class-weighted loss, the learned probabilities hover below 0.50 for jump.

### Solution
Lowered `JUMP_THRESHOLD` from 0.50 to 0.30 in `config.py`. Instead of argmax (which is equivalent to threshold 0.50), `play.py` uses softmax + threshold. If `P(jump) >= 0.30`, the AI jumps.

### Lesson
In highly imbalanced action spaces, argmax is the wrong decision rule. The model *does* learn relative jump likelihood, but the absolute probabilities reflect the class prior. A tuned threshold or top-k sampling is more appropriate than argmax.

---

## 3. Cross-Origin Iframe Screenshot Returns Blank

### Problem
Switched from full-viewport `driver.get_screenshot_as_png()` to `element.screenshot_as_png` targeting the game iframe. The result was a blank/black image — no game content visible.

### Root Cause
The game runs inside a cross-origin iframe (`iframehtml5`). Browser security policies prevent JavaScript (and by extension, Selenium's element screenshot API) from accessing rendered content of cross-origin frames. The element screenshot returns an empty image.

### Solution
Reverted to `driver.get_screenshot_as_png()` for the actual capture (which renders the iframe content as part of the viewport), then **crop** to the game element's bounding box. This gives game-only pixels without the cross-origin restriction.

### Lesson
`element.screenshot_as_png` doesn't work on cross-origin iframes. Full-viewport screenshot + crop is the reliable approach. Always verify the capture output visually, not just that the code runs without errors.

---

## 4. Retina Display Scale Factor Mismatch

### Problem
On macOS Retina displays, `driver.get_screenshot_as_png()` returns a 2x image (2048x1536 for a 1024x768 window), but `element.location` and `element.size` report coordinates in CSS pixels (the 1024x768 space). Cropping with CSS coordinates on a 2x image grabbed only the top-left quarter of the game.

### Solution
Initially: queried `window.devicePixelRatio` and scaled crop coordinates by it. Later simplified by adding `--force-device-scale-factor=0.5` to Chrome launch flags, which renders at half resolution (faster screenshots) and makes the scale factor 0.5. Then added `get_scale_factor(driver)` to programmatically detect the ratio, ensuring the crop math stays correct regardless of what the Chrome flag is set to.

### Lesson
On macOS, always account for the device pixel ratio when converting between CSS coordinates and screenshot pixel coordinates. Better yet, query it programmatically rather than hard-coding, so the code works regardless of the Chrome flag or display settings.

---

## 5. Capture Pipeline Performance

### Problem
The initial capture pipeline was too slow to sustain 30 FPS. The bottleneck was converting a full-resolution screenshot to a numpy array, then resizing with numpy/scipy operations.

### Solution (iterative)

1. **PIL resize before numpy**: Instead of `numpy → resize`, do `PIL → resize → numpy`. PIL's bilinear resize is C-optimized and 3.1x faster than numpy-based resizing.

2. **Half-resolution rendering**: `--force-device-scale-factor=0.5` makes Chrome render at 512x384 instead of 1024x768 (4x fewer pixels to encode, decode, and process).

3. **Game-only cropping**: Cropping to the game element before resizing reduces the resize input further (game area is smaller than full viewport — no navbar, sidebar, footer).

### Lesson
When the final output is tiny (84x84), there's no point processing large images. Reduce resolution as early as possible in the pipeline: render smaller → crop first → then resize.

---

## 6. Ship Mode Hold vs. Cube Mode Tap

### Problem
The initial implementation used `send_jump()` — a single tap per frame (key_down → pause → key_up). This is correct for cube mode (tap to jump) but wrong for ship mode (hold space for sustained upward thrust). The AI couldn't fly the ship because it was releasing space every frame.

### Solution
Replaced `send_jump()` with `send_key_down()` and `send_key_up()`. `play.py` now tracks `space_held` state and only sends key transitions:
- If AI says jump and space isn't held → `key_down`
- If AI says idle and space is held → `key_up`

This correctly handles both modes: cube gets a tap (hold for 1-2 frames then release), ship gets a sustained hold.

### Lesson
Action semantics matter. "Jump" means different things in different game modes. The model already learns the right pattern (cube: short bursts of jump=1, ship: sustained runs of jump=1), but the execution layer must translate those labels into the correct input sequence. Training data capture was already correct (per-frame `jump_pressed` naturally captures both tap and hold patterns) — only the inference execution was wrong.

---

## 7. Mode Confusion Between Cube and Ship

### Problem
A single model trained on both cube and ship data couldn't distinguish when to tap vs. hold. The two modes have fundamentally different physics but shared the same network, leading to mode confusion — the model would tap in ship mode (causing it to crash) or hold in cube mode (causing it to over-jump).

### Solution
Mixture-of-Experts architecture: two completely separate `JumpNet` models, one trained on cube-only data, one trained on ship-only data. During inference, the user (or a mode detector) selects which expert to use. `train.py` splits data by mode label and trains each expert independently.

### Lesson
When two sub-tasks have conflicting action patterns, a single model will average them into mediocrity. Separate models for separate modes is simpler and more effective than trying to teach one model a mode-conditioned policy.

---

## 8. Old Data Inconsistency

### Problem
Original training data was recorded with `mss` (screen capture library) at 800x600 window size. The new pipeline uses Selenium at 1024x768 with iframe-targeted cropping and scale-factor-aware resizing. The old data captures different pixels at different scale — training on mixed data would confuse the model.

### Status
**Unresolved.** The 37 old cube sessions (~29k frames) need to be re-recorded with the new capture pipeline. The old data is preserved but can't be used alongside new data.

### Lesson
When changing capture parameters (resolution, crop region, preprocessing), all existing training data becomes stale. Either re-record everything, or maintain backward-compatible preprocessing paths. For a small project, re-recording is simpler.

---

## 9. RL Preview Lagging Behind Live Game

### Problem
During RL fine-tuning, the OpenCV preview window lagged massively behind the actual game — sometimes seconds behind. The same capture pipeline ran smoothly in `record.py` at 30 FPS.

### Root Cause
Two compounding issues:

1. **GPU sync overhead on single-sample inference**: `sample_action()` ran the model on MPS every frame. For batch-size-1 inference, the time spent copying data to/from the GPU (synchronization overhead) exceeded the actual computation time. A 1.7M-param model that runs in <1ms on CPU took 5-15ms on MPS due to transfer overhead.

2. **Single-threaded main loop**: `record.py` runs capture in a background thread and the main thread only displays the latest preview. `rl_train.py` did everything in the main thread — capture, inference, action, preview build, `cv2.imshow`, `cv2.waitKey`. If any step was slow, the entire loop stalled and the preview fell behind.

### Solution
- **CPU inference during play, GPU for training**: The model runs on CPU during episode play (~1ms per frame, zero transfer overhead). At episode end, it temporarily moves to MPS/CUDA for the REINFORCE gradient update (where batched computation benefits from GPU), then back to CPU.

- **Threaded play loop**: The capture→inference→action loop runs in a daemon thread (same pattern as `record.py`). The main thread only reads `latest_preview` behind a lock and displays it. Even if one frame takes longer, the next frame is already being processed and the preview stays responsive.

### Lesson
For small models doing single-sample inference, CPU is faster than GPU because GPU's advantage (massive parallelism) is wasted on batch-size-1. The copy-in/copy-out overhead dominates. Use GPU for batched training updates, CPU for per-frame inference. Also, always separate capture logic from display logic into different threads — they have different latency requirements.

---

## 10. RL Episode End Freezes Preview (Computation Graph Retention)

### Problem
After the threaded play loop was implemented, the preview was responsive during gameplay but **froze completely at episode end** (when the model died). The CV window would hang for several seconds, then the restart would happen and gameplay would resume.

### Root Cause
During episode play, `sample_action()` was computing `log_prob` and `entropy` tensors **with gradients attached** (part of the autograd computation graph). These were stored in every `Transition` object across all frames of the episode. For a 900-frame episode, that meant 900 separate forward-pass computation graphs retained in memory.

At episode end, `loss.backward()` had to reverse **all 900 forward passes** through the CNN to compute gradients. This is fundamentally different from how `train.py` works — BC training uses a DataLoader that feeds small batches and discards graphs immediately. REINFORCE requires log_probs from the *entire episode*, but holding 900 graphs and backpropping through all of them is catastrophically expensive.

Additionally, MPS doesn't implement `aten::_slow_conv2d_backward`, so attempting to backprop through conv layers on MPS raised a `NotImplementedError`.

### Solution

1. **Don't retain computation graphs during play**: `sample_action()` now runs under `torch.no_grad()`. Only the raw `(state, action, reward)` tuples are stored — no tensors with gradient history.

2. **Batch recompute at episode end**: When the episode ends, stack all saved states into one batch tensor, run **one forward pass** through the model, recompute all log_probs and entropy from scratch, then backprop once. This turns O(N) backward passes into O(1).

```python
# During play: no graph retained
with torch.no_grad():
    action = dist.sample().item()

# At episode end: one batched forward pass
all_states = torch.stack(transition states)  # shape: (N, 4, 84, 84)
logits = model(all_states)                   # one forward pass
log_probs = Categorical(softmax(logits)).log_prob(actions)
loss = -(log_probs * advantages).mean()
loss.backward()                              # one backward pass
```

3. **Use CPU for everything**: Since MPS doesn't support conv2d backward for this architecture, and the model is small enough that CPU is fast, everything runs on CPU. No device transfers needed.

### Lesson
In RL, the relationship between data collection and gradient computation is fundamentally different from supervised learning. You must collect data *without* gradient graphs (exploration phase), then recompute the policy evaluation *with* gradients in one batch (learning phase). Never store `log_prob` tensors across hundreds of steps — store raw data and recompute.

---

## 11. RL Policy Collapses to "Never Jump"

### Problem
After 100+ episodes of REINFORCE training, the model's jump probability collapsed to ~0.00 across all frames. The output showed `idle=1.00 jump=0.00` on nearly every frame. The model had learned to never jump — the exact opposite of what was needed. Episodes were dying in ~30-40 frames with no improvement over time.

### Root Cause
Three compounding factors:

1. **Class imbalance in exploration**: When sampling from the policy distribution, idle is the default (a BC model outputs ~75% idle probability). Random sampling occasionally produces jumps, but most episodes are dominated by idle actions. REINFORCE then reinforces whatever the model happened to do — and since it mostly idled, it got reinforced for idling.

2. **Survival reward is misleading**: The "+1 per frame alive" reward seems neutral (both idle and jump get the same reward per frame), but in practice, episodes where the model *never* jumps survive for a bit (30-40 frames before hitting the first obstacle) and get moderate reward. Episodes where it randomly jumps at the wrong time die *sooner* (jumping into a spike). The signal says: "jumping kills you faster" — so the model learns to never jump.

3. **Low entropy coefficient (0.01)**: The entropy bonus was too small to maintain exploration. Once the policy started drifting toward idle, there wasn't enough entropy pressure to keep sampling jumps and discovering that some jumps are beneficial.

This is a well-known failure mode in RL called **reward hacking** or **local optimum collapse**. The model found a stable but terrible strategy (never jump = survive a bit) that's locally better than random exploration (random jumps = die sooner).

### Solution
**BC-regularized REINFORCE** — keep a frozen copy of the BC model and add a KL divergence penalty that prevents the RL policy from drifting too far from BC:

```python
# Frozen BC reference (never updated)
bc_model = JumpNet()
bc_model.load_state_dict(torch.load(model_path))
for p in bc_model.parameters():
    p.requires_grad = False

# KL divergence penalty in the loss
with torch.no_grad():
    bc_probs = torch.softmax(bc_model(states), dim=1)
kl_div = (bc_probs * (bc_probs.log() - rl_probs.log())).sum(dim=1).mean()
loss = policy_loss + entropy_loss + KL_COEFF * kl_div
```

This ensures:
- The model **can't forget** what BC taught it (jump when obstacles approach)
- RL can still **improve** beyond BC (better timing, recovery from mistakes)
- If RL tries something bad, the KL penalty pulls it back toward BC

Additionally tuned hyperparameters:
- **Entropy coeff**: 0.01 → 0.05 (5x more exploration pressure)
- **Learning rate**: 1e-4 → 5e-4 (faster learning, balanced by KL constraint)
- **KL coeff**: 0.1 (moderate — allows improvement but prevents collapse)

This technique is the same one used in RLHF (Reinforcement Learning from Human Feedback) for training ChatGPT, where a KL penalty prevents the language model from drifting too far from the supervised fine-tuning baseline.

### Lesson
Pure RL from a BC starting point can still collapse to a degenerate policy. The BC model's knowledge is fragile — without explicit protection, REINFORCE can destroy it. A KL divergence penalty (or similar BC-regularization) is essential for RL fine-tuning of pre-trained models. Also, monitor for collapse early — if `idle=1.00 jump=0.00` persists across many episodes, the entropy bonus is too low or the KL constraint is missing.

---

## Summary Table

| # | Challenge | Category | Resolution |
|---|-----------|----------|------------|
| 1 | Cross-session garbage stacking | Training data | Per-session stacking in `build_stacked_per_session()` |
| 2 | Jump probability never > 0.50 | Decision threshold | Lowered threshold to 0.30, softmax instead of argmax |
| 3 | Cross-origin iframe blank screenshot | Browser security | Full-viewport screenshot + crop |
| 4 | Retina scale factor mismatch | Display/DPR | Query `devicePixelRatio`, scale crop coords |
| 5 | Slow capture pipeline | Performance | PIL-first resize, half-res rendering, game-only crop |
| 6 | Ship hold vs. cube tap | Action semantics | Hold/release state tracking, `send_key_down/up` |
| 7 | Mode confusion | Architecture | Two separate models (MoE), split by mode |
| 8 | Old data inconsistency | Data versioning | Re-record needed (pending) |
| 9 | RL preview lagging behind game | Performance/threading | CPU inference + threaded play loop |
| 10 | RL episode-end freeze (graph retention) | RL training | `torch.no_grad()` during play, batch recompute at episode end |
| 11 | RL collapses to "never jump" | RL training | BC-regularized REINFORCE (KL divergence penalty + higher entropy) |
