import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODELS_DIR = os.path.join(BASE_DIR, "models")
LOGS_DIR = os.path.join(BASE_DIR, "logs")

GAME_URL = "https://ozgames.io/geometry-dash.embed"

BROWSER_WIDTH = 1024
BROWSER_HEIGHT = 768

FRAME_WIDTH = 84
FRAME_HEIGHT = 84
FPS = 30

RECORD_KEY = "r"
AI_TOGGLE_KEY = "u"
MODE_KEY = "m"
DISCARD_KEY = "p"
JUMP_KEY = "space"

ACTION_JUMP = 1
ACTION_NONE = 0
NUM_ACTIONS = 2

CUBE_MODE = 0
SHIP_MODE = 1

LEARNING_RATE = 1e-3
BATCH_SIZE = 64
EPOCHS = 30
VALIDATION_SPLIT = 0.2
DROPOUT = 0.3

FRAME_STACK = 4

JUMP_THRESHOLD = 0.30

ARCHIVE_DIR = os.path.join(BASE_DIR, "models", "archive")
VERSION_FILE = os.path.join(MODELS_DIR, "version.txt")

CUBE_MODEL_PATH = os.path.join(MODELS_DIR, "cube_model.pt")
SHIP_MODEL_PATH = os.path.join(MODELS_DIR, "ship_model.pt")
MODEL_PATH = CUBE_MODEL_PATH

# --- RL Fine-Tuning ---
RL_LEARNING_RATE = 5e-4
RL_NUM_EPISODES = 500
RL_BATCH_SIZE = 10
RL_GAMMA = 0.99
RL_ENTROPY_COEFF = 0.05
RL_BASELINE_DECAY = 0.99
RL_MAX_EPISODE_FRAMES = 900
RL_KL_COEFF = 0.1

for d in [DATA_DIR, MODELS_DIR, LOGS_DIR, ARCHIVE_DIR]:
    os.makedirs(d, exist_ok=True)
