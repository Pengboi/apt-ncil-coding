import time
import numpy as np
from io import BytesIO
from PIL import Image
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import config

GAME_IFRAME_ID = "iframehtml5"


def create_browser():
    options = Options()
    options.add_argument(f"--window-size={config.BROWSER_WIDTH},{config.BROWSER_HEIGHT}")
    options.add_argument("--window-position=0,0")
    options.add_argument("--force-device-scale-factor=0.5")
    options.add_argument("--disable-infobars")
    options.add_argument("--no-first-run")
    options.add_argument("--disable-notifications")
    options.add_argument("--disable-extensions")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(config.GAME_URL)
    return driver


def find_game_element(driver):
    try:
        iframe = driver.find_element(By.ID, GAME_IFRAME_ID)
        return iframe
    except Exception:
        pass

    try:
        iframes = driver.find_elements(By.TAG_NAME, "iframe")
        for iframe in iframes:
            src = iframe.get_attribute("src") or ""
            w = iframe.size["width"]
            h = iframe.size["height"]
            if w > 200 and h > 200 and ("game" in src or "dash" in src or "embed" in src):
                return iframe
    except Exception:
        pass

    return driver.find_element(By.TAG_NAME, "body")


def wait_for_game(driver, timeout=15):
    print("Waiting for game to load...")
    start = time.time()
    while time.time() - start < timeout:
        try:
            iframe = driver.find_element(By.ID, GAME_IFRAME_ID)
            if iframe.size["width"] > 100 and iframe.size["height"] > 100:
                print(f"Game iframe found: {iframe.size['width']}x{iframe.size['height']}")
                return iframe
        except Exception:
            pass
        time.sleep(0.5)
    print("Game iframe not found, falling back to full page capture")
    return None


def get_scale_factor(driver):
    try:
        return float(driver.execute_script("return window.devicePixelRatio"))
    except Exception:
        return 1.0


def capture_frame(driver, game_element, scale_factor):
    png = driver.get_screenshot_as_png()
    img = Image.open(BytesIO(png)).convert("L")
    loc = game_element.location
    sz = game_element.size
    left = int(loc["x"] * scale_factor)
    top = int(loc["y"] * scale_factor)
    right = int((loc["x"] + sz["width"]) * scale_factor)
    bottom = int((loc["y"] + sz["height"]) * scale_factor)
    img = img.crop((left, top, right, bottom))
    img = img.resize((config.FRAME_WIDTH, config.FRAME_HEIGHT), Image.BILINEAR)
    return np.array(img, dtype=np.uint8)


def preprocess_frame(frame):
    return frame.astype(np.float32) / 255.0


def send_jump(driver):
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.webdriver.common.keys import Keys
    ActionChains(driver).key_down(Keys.SPACE).pause(0.05).key_up(Keys.SPACE).perform()
