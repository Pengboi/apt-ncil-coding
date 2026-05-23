import os
import sys
import random
import numpy as np
import pygame

os.environ["SDL_VIDEODRIVER"] = "dummy"

from game.constants import (
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    FPS,
    BG_COLOR,
    GROUND_COLOR,
    GROUND_Y,
    GROUND_HEIGHT,
    OBSTACLE_SPEED,
    PLAYER_X,
    PLAYER_WIDTH,
    GRAVITY,
    JUMP_STRENGTH,
)
from game.player import Player
from game.obstacle import ObstacleManager

RECORDINGS_DIR = os.path.join(os.path.dirname(__file__), "recordings")


def heuristic_should_jump(player, obstacle_manager):
    nearest = None
    nearest_dist = float("inf")
    for obs in obstacle_manager.obstacles:
        dist = obs.x - (player.x + player.width)
        if dist < nearest_dist:
            nearest = obs
            nearest_dist = dist

    if nearest is None:
        return False

    if player.is_jumping:
        return False

    jump_zone_start = 200
    jump_zone_end = 50

    if jump_zone_end <= nearest_dist <= jump_zone_start:
        noise = random.gauss(0, 20)
        adjusted_dist = nearest_dist + noise
        if adjusted_dist < 160:
            return True

    if nearest_dist < jump_zone_end and nearest_dist > -10:
        return True

    if random.random() < 0.02:
        return True

    return False


def auto_record(num_rounds=200):
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    clock = pygame.time.Clock()

    os.makedirs(RECORDINGS_DIR, exist_ok=True)

    all_scores = []
    total_frames = 0
    total_jumps = 0

    print("=" * 60)
    print("AUTO-RECORDING WITH HEURISTIC AI")
    print("=" * 60)
    print(f"Generating {num_rounds} gameplay recordings...")
    print()

    for round_num in range(num_rounds):
        player = Player()
        obstacle_manager = ObstacleManager()
        score = 0
        game_over = False
        frames = []
        actions = []

        while not game_over:
            current_action = 0

            should_jump = heuristic_should_jump(player, obstacle_manager)
            if should_jump and not player.is_jumping:
                current_action = 1
                player.jump()

            player.update()
            obstacle_manager.update()

            player_rect = player.get_rect()
            player_rect.inflate_ip(-4, -4)

            if obstacle_manager.check_collision(player_rect):
                game_over = True
            else:
                score += 1

                screen.fill(BG_COLOR)
                pygame.draw.rect(
                    screen, GROUND_COLOR, (0, GROUND_Y, SCREEN_WIDTH, GROUND_HEIGHT)
                )
                player.draw(screen)
                obstacle_manager.draw(screen)

                image = pygame.surfarray.array3d(screen)
                image = image.transpose(1, 0, 2)
                gray = np.mean(image, axis=2).astype(np.uint8)
                surf = pygame.surfarray.make_surface(gray.T)
                small_surf = pygame.transform.scale(surf, (84, 84))
                small_gray = pygame.surfarray.array3d(small_surf)
                small_gray = np.mean(small_gray, axis=2).astype(np.uint8)

                frames.append(small_gray)
                actions.append(current_action)

            clock.tick(FPS)

        if frames:
            filename = f"auto_{round_num:04d}.npz"
            filepath = os.path.join(RECORDINGS_DIR, filename)
            np.savez_compressed(
                filepath,
                frames=np.array(frames, dtype=np.uint8),
                actions=np.array(actions, dtype=np.int8),
                score=np.array([score], dtype=np.int32),
            )
            all_scores.append(score)
            total_frames += len(frames)
            total_jumps += int(np.sum(actions))

        if (round_num + 1) % 20 == 0 or round_num == 0:
            avg = sum(all_scores) / len(all_scores) if all_scores else 0
            print(
                f"  Round {round_num + 1}/{num_rounds} | "
                f"Last score: {score} | Avg: {avg:.0f} | "
                f"Total frames: {total_frames}"
            )

    pygame.quit()

    print()
    print("=" * 60)
    print("AUTO-RECORDING COMPLETE")
    print("=" * 60)
    print(f"  Recordings saved: {len(all_scores)}")
    print(f"  Best score: {max(all_scores) if all_scores else 0}")
    print(f"  Worst score: {min(all_scores) if all_scores else 0}")
    print(
        f"  Average score: {sum(all_scores) / len(all_scores):.0f}"
        if all_scores
        else ""
    )
    print(f"  Total frames: {total_frames}")
    print(f"  Total jumps: {total_jumps}")
    if total_frames > 0:
        print(f"  Jump rate: {total_jumps / total_frames * 100:.1f}%")
    print(f"  Save location: {RECORDINGS_DIR}/")
    print("=" * 60)


if __name__ == "__main__":
    rounds = int(sys.argv[1]) if len(sys.argv) > 1 else 200
    auto_record(num_rounds=rounds)
