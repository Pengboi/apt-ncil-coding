const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  // Navigate to the F1 page
  await page.goto('http://localhost:3001/f1-history', {
    waitUntil: 'networkidle'
  });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'f1-page-current.png',
    fullPage: true 
  });
  
  // Take screenshot of hero section only
  await page.screenshot({ 
    path: 'f1-hero-current.png',
    clip: { x: 0, y: 0, width: 1440, height: 630 }
  });
  
  // Take screenshot of drivers section
  const driversSection = await page.locator('text=Driver Personnel').first();
  if (await driversSection.isVisible().catch(() => false)) {
    await driversSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'f1-drivers-current.png',
      clip: { x: 0, y: 630, width: 1440, height: 700 }
    });
  }
  
  console.log('Screenshots saved!');
  await browser.close();
})();
