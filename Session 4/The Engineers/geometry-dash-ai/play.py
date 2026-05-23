import os
import sys
import numpy as np
import pygame
from stable_baselines3 import PPO
from env.geometry_dash_env import GeometryDashEnv
from game.constants import SCREEN_WIDTH, SCREEN_HEIGHT, FPS

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
DEFAULT_MODEL = os.path.join(MODELS_DIR, "ppo_geometry_dash")


def play_ai(model_path=None, num_episodes=5, speed=1):
    if model_path is None:
        model_path = DEFAULT_MODEL

    if not os.path.exists(model_path + ".zip"):
        print(f"Model not found: {model_path}.zip")
        print("Train the AI first by running: python train.py")
        return

    print("=" * 50)
    print("WATCHING THE AI PLAY GEOMETRY DASH")
    print("=" * 50)
    print(f"Model: {model_path}")
    print(f"Episodes: {num_episodes}")
    print(f"Speed: {speed}x")
    print("Press ESC to quit early")
    print("=" * 50)

    env = GeometryDashEnv(render_mode="human")

    model = PPO.load(model_path, env=env)

    pygame.font.init()
    font = pygame.font.SysFont("Arial", 20)
    big_font = pygame.font.SysFont("Arial", 28)

    scores = []

    for episode in range(num_episodes):
        obs, info = env.reset()
        total_reward = 0
        done = False
        step = 0

        while not done:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    env.close()
                    print(f"\nBest score: {max(scores) if scores else 0}")
                    return
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        env.close()
                        print(f"\nBest score: {max(scores) if scores else 0}")
                        return

            action, _states = model.predict(obs, deterministic=True)
            obs, reward, terminated, truncated, info = env.step(int(action))
            total_reward += reward
            step += 1
            done = terminated or truncated

            if env.render_mode == "human" and env.game.screen is not None:
                screen = env.game.screen

                overlay = pygame.Surface((220, 80), pygame.SRCALPHA)
                overlay.fill((0, 0, 0, 150))
                screen.blit(overlay, (SCREEN_WIDTH - 230, 5))

                ep_text = font.render(
                    f"Episode: {episode + 1}/{num_episodes}", True, (255, 255, 255)
                )
                screen.blit(ep_text, (SCREEN_WIDTH - 220, 10))

                score_text = font.render(f"Score: {info['score']}", True, (0, 255, 100))
                screen.blit(score_text, (SCREEN_WIDTH - 220, 35))

                action_text = font.render(
                    f"Action: {'JUMP' if action == 1 else 'IDLE'}", True, (255, 255, 0)
                )
                screen.blit(action_text, (SCREEN_WIDTH - 220, 58))

                pygame.display.flip()

            if speed > 1:
                for _ in range(speed - 1):
                    action, _ = model.predict(obs, deterministic=True)
                    obs, reward, terminated, truncated, info = env.step(int(action))
                    total_reward += reward
                    done = terminated or truncated
                    if done:
                        break

            if env.render_mode == "human" and env.game.clock:
                env.game.clock.tick(FPS)

        scores.append(info["score"])
        print(
            f"  Episode {episode + 1}: Score = {info['score']}, "
            f"Reward = {total_reward:.0f}"
        )

    env.close()

    print()
    print("=" * 50)
    print("RESULTS")
    print("=" * 50)
    print(f"  Episodes played: {num_episodes}")
    print(f"  Best score: {max(scores)}")
    print(f"  Worst score: {min(scores)}")
    print(f"  Average score: {sum(scores) / len(scores):.0f}")
    print("=" * 50)


if __name__ == "__main__":
    os.environ.setdefault("SDL_VIDEODRIVER", "")

    model_path = None
    num_episodes = 5
    speed = 1

    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] == "--model" and i + 1 < len(args):
            model_path = args[i + 1]
            i += 2
        elif args[i] == "--episodes" and i + 1 < len(args):
            num_episodes = int(args[i + 1])
            i += 2
        elif args[i] == "--speed" and i + 1 < len(args):
            speed = int(args[i + 1])
            i += 2
        else:
            i += 1

    play_ai(model_path=model_path, num_episodes=num_episodes, speed=speed)
