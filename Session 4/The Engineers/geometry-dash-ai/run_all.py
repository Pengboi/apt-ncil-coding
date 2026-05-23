import os
import sys
import time
import subprocess

VENV_PYTHON = os.path.join(os.path.dirname(__file__), ".venv", "bin", "python")
AUTO_RECORD = os.path.join(os.path.dirname(__file__), "auto_record.py")
TRAIN = os.path.join(os.path.dirname(__file__), "train.py")
PLAY = os.path.join(os.path.dirname(__file__), "play.py")


def run_step(name, cmd):
    print()
    print("#" * 60)
    print(f"# {name}")
    print("#" * 60)
    start = time.time()
    result = subprocess.run(cmd, env={**os.environ, "SDL_VIDEODRIVER": "dummy"})
    elapsed = time.time() - start
    if result.returncode != 0:
        print(f"\n[FAILED] {name} exited with code {result.returncode}")
        sys.exit(1)
    print(f"\n[DONE] {name} completed in {elapsed:.1f}s")
    return elapsed


def main():
    overall_start = time.time()
    record_rounds = int(sys.argv[1]) if len(sys.argv) > 1 else 200
    rl_timesteps = int(sys.argv[2]) if len(sys.argv) > 2 else 500_000

    print()
    print("*" * 60)
    print("  GEOMETRY DASH AI — FULL AUTOMATED PIPELINE")
    print("*" * 60)
    print(f"  1. Auto-record: {record_rounds} rounds")
    print(f"  2. Imitation learning")
    print(f"  3. Reinforcement learning: {rl_timesteps:,} timesteps")
    print(f"  4. Evaluation")
    print("*" * 60)

    t1 = run_step(
        "Step 1: Auto-Recording Gameplay",
        [VENV_PYTHON, AUTO_RECORD, str(record_rounds)],
    )

    t2 = run_step(
        "Step 2: Training (Imitation + RL)",
        [VENV_PYTHON, TRAIN, "full", "10", str(rl_timesteps)],
    )

    t3 = run_step(
        "Step 3: Evaluation (10 episodes)",
        [VENV_PYTHON, PLAY, "--episodes", "10"],
    )

    total = time.time() - overall_start
    print()
    print("*" * 60)
    print("  PIPELINE COMPLETE")
    print("*" * 60)
    print(f"  Recording:    {t1:.1f}s")
    print(f"  Training:     {t2:.1f}s")
    print(f"  Evaluation:   {t3:.1f}s")
    print(f"  Total:        {total:.1f}s ({total / 60:.1f} min)")
    print("*" * 60)


if __name__ == "__main__":
    main()
