const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  
  // Navigate to the website
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait a bit for images to load
  await page.waitForTimeout(3000);
  
  // Take screenshot of full page
  await page.screenshot({ path: 'website-check.png', fullPage: true });
  
  // Check console for errors
  const logs = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      logs.push(msg.text());
    }
  });
  
  // Check if images are loading
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      error: img.src && !img.complete
    }));
  });
  
  console.log('=== Images Found ===');
  console.log(JSON.stringify(images, null, 2));
  
  console.log('\n=== Console Errors ===');
  console.log(logs.length > 0 ? logs : 'No errors');
  
  await browser.close();
})();
