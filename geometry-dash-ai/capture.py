import cv2
import numpy as np
from io import BytesIO
from PIL import Image
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import config


def create_browser():
    options = Options()
    options.add_argument(f"--window-size={config.BROWSER_WIDTH},{config.BROWSER_HEIGHT}")
    options.add_argument("--window-position=0,0")
    options.add_argument("--disable-infobars")
    options.add_argument("--no-first-run")
    options.add_argument("--disable-notifications")
    options.add_argument("--disable-extensions")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(config.GAME_URL)
    return driver


def capture_frame(driver):
    png = driver.get_screenshot_as_png()
    img = Image.open(BytesIO(png))
    img = img.convert("RGB")
    return np.array(img, dtype=np.uint8)


def preprocess_frame(frame):
    if frame.shape[2] == 4:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGRA2GRAY)
    elif frame.shape[2] == 3:
        gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
    else:
        gray = frame
    resized = cv2.resize(gray, (config.FRAME_WIDTH, config.FRAME_HEIGHT))
    normalized = resized.astype(np.float32) / 255.0
    return normalized


def send_jump(driver):
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.webdriver.common.keys import Keys
    ActionChains(driver).key_down(Keys.SPACE).pause(0.05).key_up(Keys.SPACE).perform()
