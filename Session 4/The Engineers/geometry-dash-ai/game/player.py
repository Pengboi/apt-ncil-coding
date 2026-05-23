import pygame
from game.constants import (
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    PLAYER_X,
    PLAYER_COLOR,
    GRAVITY,
    JUMP_STRENGTH,
    GROUND_Y,
)


class Player:
    def __init__(self):
        self.width = PLAYER_WIDTH
        self.height = PLAYER_HEIGHT
        self.x = PLAYER_X
        self.y = GROUND_Y - self.height
        self.velocity = 0
        self.is_jumping = False

    def jump(self):
        if not self.is_jumping:
            self.velocity = JUMP_STRENGTH
            self.is_jumping = True

    def update(self):
        self.velocity += GRAVITY
        self.y += self.velocity

        if self.y >= GROUND_Y - self.height:
            self.y = GROUND_Y - self.height
            self.velocity = 0
            self.is_jumping = False

    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)

    def draw(self, surface):
        pygame.draw.rect(
            surface, PLAYER_COLOR, (self.x, self.y, self.width, self.height)
        )

    def reset(self):
        self.y = GROUND_Y - self.height
        self.velocity = 0
        self.is_jumping = False
