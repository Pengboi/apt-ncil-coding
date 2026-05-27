# Geometry Dash AI — RL Fine-Tuning Plan

## Why Add RL?

Imitation learning (behavioral cloning) trains the model to mimic human actions. This works well for states the human visited during recording, but the model inevitably makes small mistakes during play. Each mistake takes it into unfamiliar territory — states it never trained on. Errors compound, and the model spirals into failure.

**RL fine-tuning** solves this by letting the model learn from its own experience. Starting from the BC weights, the model plays the game, collects rewards, and adjusts its policy based on what actually works. This closes the distribution shift gap.

## Pipeline Overview

```
Phase 1 (existing):              Phase 2 (new):
record.py → train.py (BC)  →  rl_train.py (RL fine-tuning)
                ↓                       ↓
         cube/ship_model.pt      cube/ship_model.pt (overwritten)
                ↓                       ↓
             play.py              play.py (unchanged)
```

The `.pt` files are the bridge. `play.py` doesn't change — it just loads whatever weights are in the model files. Whether those weights came from BC alone or BC+RL is irrelevant at inference time.

## Algorithm: REINFORCE with Baseline

We chose **REINFORCE with a running baseline** over PPO for the initial implementation. REINFORCE is simpler (~30 lines of core training logic), and since we're fine-tuning from a strong BC starting point (not training from scratch), the policy is already reasonable. REINFORCE just needs to nudge it, not discover basic jumping from zero.

### How REINFORCE Works

1. The model plays an episode (one life), collecting `(state, action, log_prob, reward)` at each step
2. At episode end, compute **discounted returns**: G_t = r_t + gamma * r_{t+1} + gamma^2 * r_{t+2} + ...
3. Compute **advantage**: A_t = G_t - baseline (running average of past returns)
4. **Loss** = -log_prob * advantage (push up probability of actions that led to better-than-expected outcomes)
5. Add **entropy bonus**: +entropy_coeff * H(pi) to prevent the policy from collapsing to a deterministic "never jump" strategy
6. Backprop and update weights

### Why Not PPO (Yet)

| | REINFORCE | PPO |
|---|---|---|
| Complexity | ~30 lines | ~100 lines |
| Stability | Noisy but adequate for fine-tuning | More stable, clipped updates |
| Data efficiency | Uses each episode once | Replays each batch multiple times |
| When to upgrade | Start here | If REINFORCE is too unstable |

Since we're fine-tuning from BC weights (not random), the policy is already in a good neighborhood. REINFORCE should be sufficient. PPO is available as an upgrade path if needed.

## Two-Expert Design for RL

The same MoE architecture applies to RL training. Each expert is fine-tuned independently:

```
rl_train.py --mode cube   → loads cube_model.pt → plays → trains → saves cube_model.pt
rl_train.py --mode ship   → loads ship_model.pt → plays → trains → saves ship_model.pt
```

### Why Not Joint Training

- Cube and ship have fundamentally different action semantics (tap vs hold)
- Reward signals may differ (ship survival depends on sustained altitude control)
- Training one at a time is simpler to debug and tune
- The mode boundary is clear — no benefit to joint training for a 2-class problem

### Mode Switching During Episodes

Geometry Dash levels switch between cube and ship automatically. Options:

- **Manual (recommended for v1):** You press `M` when the mode changes, RL switches which expert it's training. Simple and reliable.
- **Auto-detect:** Visually classify cube vs ship from screenshots. Harder and potentially unreliable.
- **Ignore:** Train one expert; frames from the wrong mode are noise but tolerable in small doses.

## New Files and Changes

### New: `rl_train.py`

The main RL training script. Usage:

```bash
python rl_train.py --mode cube    # fine-tune cube expert
python rl_train.py --mode ship    # fine-tune ship expert
```

**Core loop:**

```python
for episode in range(NUM_EPISODES):
    # 1. Play one life
    state = reset_episode()
    while not dead and frames < MAX_FRAMES:
        stacked = update_frame_buffer(state)
        action, log_prob = sample_action(model, stacked)  # sample, not threshold
        execute_action(action)
        reward = 1.0  # +1 per frame alive
        store_transition(stacked, action, log_prob, reward)
        state = capture_next_frame()
        dead = detect_death()

    # 2. Compute returns and advantages
    returns = compute_discounted_returns(transitions, gamma)
    advantages = returns - running_baseline

    # 3. REINFORCE update (batched every BATCH_SIZE episodes)
    if episode_count % BATCH_SIZE == 0:
        loss = -mean(log_probs * advantages) + entropy_bonus
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    # 4. Save checkpoint periodically
    if episode % 50 == 0:
        save_model()
```

**Key differences from play.py:**
- **Samples actions** from the probability distribution (exploration), instead of using a threshold (exploitation)
- **Records log probabilities** needed for the REINFORCE gradient
- **Detects death** and restarts the level automatically
- **Runs the optimizer** to update weights

### Changes to `capture.py`

Two new functions needed:

**`detect_death(driver, game_element, scale_factor, prev_frame=None)`**

Checks if the player died this frame. Implementation approach:
- Primary: Check for a restart/retry overlay DOM element inside the game iframe
- Fallback: Pixel-diff heuristic — if the game was playing and the frame suddenly changes dramatically (progress bar resets, death overlay appears), flag as dead
- Returns `True` on death, `False` otherwise

**`restart_level(driver)`**

After death, programmatically restart the level. Options:
- Click a restart button element (if one exists in the DOM)
- Send a key press that triggers restart (some implementations restart on Space/Enter)
- Click at a known screen coordinate where the restart button appears

These functions need **investigation** — the death screen and restart mechanism depend on the specific game implementation at `ozgames.io`. A small script should be written to capture and analyze the death screen before implementing these.

### Changes to `config.py`

Add a clearly labeled RL settings block:

```python
# --- RL Fine-Tuning ---
RL_LEARNING_RATE = 1e-4       # Lower than BC — fine-tuning, not learning from scratch
RL_NUM_EPISODES = 500         # Total episodes to train
RL_BATCH_SIZE = 10            # Episodes per gradient update
RL_GAMMA = 0.99               # Discount factor
RL_ENTROPY_COEFF = 0.01       # Entropy bonus coefficient
RL_BASELINE_DECAY = 0.99      # EMA decay for the running baseline
RL_MAX_EPISODE_FRAMES = 900   # Cap at 30 seconds (30 FPS * 30s)
```

### Unchanged Files

| File | Why unchanged |
|------|---------------|
| `train.py` | BC trainer is still needed as Phase 1 |
| `record.py` | Human data collection still needed — BC + RL > RL alone |
| `play.py` | Loads same `.pt` files, inference code is mode-agnostic |
| `JumpNet` architecture | Same network used for both BC and RL — that's the point of fine-tuning |

## Reward Design

### V1: Survival Time (simplest)

```
reward = +1 per frame alive
episode ends on death
total return = number of frames survived
```

This captures the core signal: "don't die." The longer the model survives, the higher the reward. Simple, robust, no game-specific knowledge needed.

### V2: Progress Bar (future enhancement)

If we can read the level progress percentage from the screenshot (OCR or pixel sampling), we can reward actual progress:

```
reward = progress_delta  (e.g., went from 12% to 13% → reward = 1.0)
bonus = +10 for completing a level
```

This is stronger signal but requires reliable progress detection. Leave for later.

### V3: Shaped Rewards (future)

More sophisticated shaping:
- Proximity bonus for passing obstacles
- Penalty for obvious mistakes (jumping into a wall)
- Mode-appropriate rewards (cube: accuracy, ship: altitude stability)

These require deeper game understanding and are probably overkill for a first project.

## Sampling vs. Threshold

| | BC Training | BC Inference (play.py) | RL Training |
|---|---|---|---|
| Action selection | Teacher's label (ground truth) | Threshold on softmax | Sample from distribution |
| Exploration | None (imitating human) | None (deterministic) | Essential (discovers new strategies) |
| Log probs | Not needed | Not needed | Required for gradient |

During RL training, we **must sample** instead of using the threshold. The threshold is deterministic — it always picks the same action for the same state. Sampling introduces randomness, which is how the model explores and discovers that, say, jumping earlier at a certain obstacle leads to longer survival.

## Implementation Order

1. **Investigate death/restart** — Write a small script to capture the death screen, find the DOM elements or pixel patterns that indicate death, and determine how to restart the level programmatically.

2. **Add `detect_death` + `restart_level` to `capture.py`** — Implement based on findings from step 1.

3. **Add RL config to `config.py`** — The settings block listed above.

4. **Build `rl_train.py`** — REINFORCE + baseline, single-expert training, with:
   - OpenCV preview window (same style as record.py/play.py)
   - Episode logging (frames survived, total reward, avg reward)
   - Periodic checkpoint saving
   - BC weight archival before RL overwrites

5. **Test on cube expert** — Easier to verify since cube mode is tap-based. Check that the model survives longer over training.

6. **Test on ship expert** — Verify that hold-based control works correctly with RL sampling (the model must learn to hold for varying durations, not just tap).

7. **Iterate** — Tune gamma, entropy coefficient, learning rate, and batch size based on learning curves.

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Policy collapses to "never jump" | Entropy bonus (0.01) encourages exploration; BC starting point already knows when to jump |
| REINFORCE too noisy | Running baseline reduces variance; batched updates (every 10 episodes) smooth gradient |
| Death detection unreliable | Start with simple heuristics, add DOM-based detection after investigation |
| Catastrophic forgetting of BC | Lower learning rate (1e-4 vs 1e-3); archive BC weights before RL starts |
| Ship mode unlearned hold behavior | Sampling should preserve hold patterns since BC already learned them; reward signal reinforces sustained flight |
| Level restart fails | Fallback: click at screen center (common restart button location), or kill and restart browser tab |
