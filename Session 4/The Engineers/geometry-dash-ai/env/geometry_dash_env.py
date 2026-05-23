import numpy as np
import pygame
import gymnasium as gym
from gymnasium import spaces
from game.game import GeometryDashGame
from game.constants import SCREEN_WIDTH, SCREEN_HEIGHT


class GeometryDashEnv(gym.Env):
    metadata = {"render_modes": ["human", "rgb_array"]}

    def __init__(self, render_mode=None):
        super().__init__()

        self.render_mode = render_mode
        self.game = GeometryDashGame(render=(render_mode == "human"))

        self.observation_width = 84
        self.observation_height = 84

        self.action_space = spaces.Discrete(2)

        self.observation_space = spaces.Box(
            low=0,
            high=255,
            shape=(self.observation_height, self.observation_width, 1),
            dtype=np.uint8,
        )

    def _process_observation(self, surface):
        image = pygame.surfarray.array3d(surface)
        image = image.transpose(1, 0, 2)
        image = np.mean(image, axis=2).astype(np.uint8)
        image = pygame.transform.scale(
            pygame.surfarray.make_surface(image.T),
            (self.observation_width, self.observation_height),
        )
        image = pygame.surfarray.array3d(image)
        image = np.mean(image, axis=2).astype(np.uint8)
        image = image[:, :, np.newaxis]
        return image

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)

        surface = self.game.reset()
        observation = self._process_observation(surface)

        return observation, {}

    def step(self, action):
        surface, reward, terminated, info = self.game.step(action)
        observation = self._process_observation(surface)

        truncated = False

        if self.game.score > 5000:
            truncated = True

        return observation, float(reward), terminated, truncated, info

    def render(self):
        if self.render_mode == "human":
            self.game.clock.tick(60)

    def close(self):
        self.game.close()
