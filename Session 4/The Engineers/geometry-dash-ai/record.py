import os
import sys
import json
import numpy as np
import pygame
from game.constants import (
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    FPS,
    BG_COLOR,
    GROUND_COLOR,
    GROUND_Y,
    GROUND_HEIGHT,
    TEXT_COLOR,
)
from game.player import Player
from game.obstacle import ObstacleManager

RECORDINGS_DIR = os.path.join(os.path.dirname(__file__), "recordings")


def record_game(session_name="recording_1"):
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Geometry Dash AI — Recording Mode")
    clock = pygame.time.Clock()
    font = pygame.font.SysFont("Arial", 24)
    small_font = pygame.font.SysFont("Arial", 18)

    player = Player()
    obstacle_manager = ObstacleManager()
    score = 0
    game_over = False

    frames = []
    actions = []
    session_scores = []

    recording_count = 0

    os.makedirs(RECORDINGS_DIR, exist_ok=True)

    print("=" * 50)
    print("RECORDING MODE")
    print("=" * 50)
    print("SPACE = Jump")
    print("R = Restart (saves recording, starts new one)")
    print("Q = Quit and save all recordings")
    print("=" * 50)

    running = True
    current_action = 0

    while running:
        current_action = 0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not game_over:
                    current_action = 1
                    player.jump()
                if event.key == pygame.K_r and game_over:
                    _save_recording(
                        frames,
                        actions,
                        score,
                        session_name,
                        recording_count,
                        session_scores,
                    )
                    recording_count += 1

                    player.reset()
                    obstacle_manager.reset()
                    score = 0
                    game_over = False
                    frames = []
                    actions = []
                    print(
                        f"Recording #{recording_count} saved! Starting new recording..."
                    )
                if event.key == pygame.K_q:
                    if frames and not game_over:
                        _save_recording(
                            frames,
                            actions,
                            score,
                            session_name,
                            recording_count,
                            session_scores,
                        )
                        recording_count += 1
                    running = False

        if not game_over:
            if pygame.key.get_pressed()[pygame.K_SPACE]:
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

        score_text = font.render(f"Score: {score}", True, TEXT_COLOR)
        screen.blit(score_text, (10, 10))

        rec_text = small_font.render(
            f"Recording: #{recording_count + 1} | Frames: {len(frames)}",
            True,
            (0, 255, 0),
        )
        screen.blit(rec_text, (10, 40))

        action_text = small_font.render(
            f"Action: {'JUMP' if current_action == 1 else 'IDLE'}", True, (255, 255, 0)
        )
        screen.blit(action_text, (10, 60))

        if game_over:
            go_text = font.render(
                "GAME OVER — Press R to Save & Restart", True, TEXT_COLOR
            )
            go_rect = go_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
            screen.blit(go_text, go_rect)

        pygame.display.flip()

        if not game_over:
            image = pygame.surfarray.array3d(screen)
            image = image.transpose(1, 0, 2)
            gray = np.mean(image, axis=2).astype(np.uint8)
            small = np.array(
                pygame.transform.scale(pygame.surfarray.make_surface(gray.T), (84, 84))
                .get_buffer()
                .raw
            ).reshape(84, 84, 3)
            small_gray = np.mean(small, axis=2).astype(np.uint8)

            frames.append(small_gray)
            actions.append(current_action)

        clock.tick(FPS)

    pygame.quit()

    if session_scores:
        print("\n" + "=" * 50)
        print("RECORDING SESSION COMPLETE")
        print("=" * 50)
        print(f"Recordings saved: {recording_count}")
        print(f"Best score: {max(session_scores)}")
        print(f"Average score: {sum(session_scores) / len(session_scores):.0f}")
        print(f"Total frames recorded: {sum(session_scores)}")
        print(f"Save location: {RECORDINGS_DIR}/")
        print("=" * 50)


def _save_recording(
    frames, actions, score, session_name, recording_count, session_scores
):
    if not frames:
        return

    filename = f"{session_name}_{recording_count:03d}.npz"
    filepath = os.path.join(RECORDINGS_DIR, filename)

    np.savez_compressed(
        filepath,
        frames=np.array(frames, dtype=np.uint8),
        actions=np.array(actions, dtype=np.int8),
        score=np.array([score], dtype=np.int32),
    )

    session_scores.append(score)
    print(f"  Saved: {filename} (Score: {score}, Frames: {len(frames)})")


def list_recordings():
    if not os.path.exists(RECORDINGS_DIR):
        print("No recordings folder found.")
        return

    files = [f for f in os.listdir(RECORDINGS_DIR) if f.endswith(".npz")]
    if not files:
        print("No recordings found.")
        return

    print(f"\nFound {len(files)} recording(s) in {RECORDINGS_DIR}/")
    print("-" * 50)
    for f in sorted(files):
        data = np.load(os.path.join(RECORDINGS_DIR, f))
        score = data["score"][0]
        num_frames = len(data["actions"])
        jump_count = int(np.sum(data["actions"]))
        print(f"  {f}: Score={score}, Frames={num_frames}, Jumps={jump_count}")
    print("-" * 50)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "list":
        list_recordings()
    else:
        name = (
            sys.argv[1]
            if len(sys.argv) > 1 and sys.argv[1] != "list"
            else "recording_1"
        )
        record_game(session_name=name)
