import sys
import random
import pygame
from game.constants import (
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    FPS,
    GROUND_Y,
    GROUND_HEIGHT,
    BG_COLOR,
    GROUND_COLOR,
    TEXT_COLOR,
    OBSTACLE_SPEED,
)
from game.player import Player
from game.obstacle import ObstacleManager


class GeometryDashGame:
    def __init__(self, render=True):
        self.render = render
        self.player = Player()
        self.obstacle_manager = ObstacleManager()
        self.score = 0
        self.game_over = False
        self.clock = None
        self.screen = None
        self.font = None

        if self.render:
            pygame.init()
            self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
            pygame.display.set_caption("Geometry Dash AI")
            self.clock = pygame.time.Clock()
            self.font = pygame.font.SysFont("Arial", 24)

    def reset(self):
        self.player.reset()
        self.obstacle_manager.reset()
        self.score = 0
        self.game_over = False
        return self._get_observation()

    def step(self, action):
        """
        action: 0 = do nothing, 1 = jump
        Returns: (observation, reward, game_over, info)
        """
        if action == 1:
            self.player.jump()

        self.player.update()
        self.obstacle_manager.update()

        reward = 1.0

        player_rect = self.player.get_rect()
        player_rect.inflate_ip(-4, -4)

        if self.obstacle_manager.check_collision(player_rect):
            self.game_over = True
            reward = -10.0

        if not self.game_over:
            self.score += 1

        observation = self._get_observation()
        info = {"score": self.score}

        return observation, reward, self.game_over, info

    def _get_observation(self):
        if not self.render:
            self.screen = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))

        self.screen.fill(BG_COLOR)

        pygame.draw.rect(
            self.screen, GROUND_COLOR, (0, GROUND_Y, SCREEN_WIDTH, GROUND_HEIGHT)
        )

        self.player.draw(self.screen)
        self.obstacle_manager.draw(self.screen)

        if self.render and self.font:
            score_text = self.font.render(f"Score: {self.score}", True, TEXT_COLOR)
            self.screen.blit(score_text, (10, 10))

            if self.game_over:
                go_text = self.font.render(
                    "GAME OVER - Press R to Restart", True, TEXT_COLOR
                )
                go_rect = go_text.get_rect(
                    center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
                )
                self.screen.blit(go_text, go_rect)

        if self.render:
            pygame.display.flip()

        return self.screen

    def run_human(self):
        """Let a human play the game with the spacebar."""
        self.reset()

        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE and not self.game_over:
                        self.player.jump()
                    if event.key == pygame.K_r and self.game_over:
                        self.reset()
                    if event.key == pygame.K_ESCAPE:
                        pygame.quit()
                        sys.exit()

            if not self.game_over:
                self.player.update()
                self.obstacle_manager.update()

                player_rect = self.player.get_rect()
                player_rect.inflate_ip(-4, -4)

                if self.obstacle_manager.check_collision(player_rect):
                    self.game_over = True
                else:
                    self.score += 1

            self._get_observation()
            self.clock.tick(FPS)

    def close(self):
        if self.render:
            pygame.quit()


if __name__ == "__main__":
    game = GeometryDashGame(render=True)
    game.run_human()
