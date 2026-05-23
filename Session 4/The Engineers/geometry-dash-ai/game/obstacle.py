import random
import pygame
from game.constants import (
    OBSTACLE_WIDTH,
    OBSTACLE_HEIGHT,
    OBSTACLE_COLOR,
    OBSTACLE_SPEED,
    GROUND_Y,
    SCREEN_WIDTH,
    MIN_OBSTACLE_GAP,
    MAX_OBSTACLE_GAP,
)


class Obstacle:
    def __init__(self, x):
        self.width = OBSTACLE_WIDTH
        self.height = OBSTACLE_HEIGHT
        self.x = x
        self.y = GROUND_Y - self.height
        self.speed = OBSTACLE_SPEED

    def update(self):
        self.x -= self.speed

    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)

    def draw(self, surface):
        points = [
            (self.x, self.y + self.height),
            (self.x + self.width // 2, self.y),
            (self.x + self.width, self.y + self.height),
        ]
        pygame.draw.polygon(surface, OBSTACLE_COLOR, points)

    def is_off_screen(self):
        return self.x + self.width < 0


class ObstacleManager:
    def __init__(self):
        self.obstacles = []
        self.next_gap = random.randint(MIN_OBSTACLE_GAP, MAX_OBSTACLE_GAP)
        self.distance_since_last = 0

    def update(self):
        self.distance_since_last += OBSTACLE_SPEED

        if self.distance_since_last >= self.next_gap:
            self.obstacles.append(Obstacle(SCREEN_WIDTH))
            self.distance_since_last = 0
            self.next_gap = random.randint(MIN_OBSTACLE_GAP, MAX_OBSTACLE_GAP)

        for obs in self.obstacles:
            obs.update()

        self.obstacles = [obs for obs in self.obstacles if not obs.is_off_screen()]

    def draw(self, surface):
        for obs in self.obstacles:
            obs.draw(surface)

    def check_collision(self, player_rect):
        for obs in self.obstacles:
            if player_rect.colliderect(obs.get_rect()):
                return True
        return False

    def reset(self):
        self.obstacles = []
        self.distance_since_last = 0
        self.next_gap = random.randint(MIN_OBSTACLE_GAP, MAX_OBSTACLE_GAP)
