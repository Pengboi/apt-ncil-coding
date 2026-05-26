import { chromium } from 'playwright';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pressKey(page, key, duration = 100) {
  await page.keyboard.down(key);
  await delay(duration);
  await page.keyboard.up(key);
}

async function main() {
  console.log('🎮 TACTICAL OPS - Game Demo Starting...\n');
  
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50,
  });
  
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📍 Loading game at http://localhost:3000...');
    await page.goto('http://localhost:3000');
    await delay(2000);
    
    await page.screenshot({ path: 'demo-01-main-menu.png' });
    console.log('✅ Screenshot: demo-01-main-menu.png');
    
    const canvas = page.locator('canvas');
    await canvas.click();
    await delay(500);
    
    console.log('\n🏃 DEMO 1: Movement');
    await page.keyboard.down('d');
    await delay(1500);
    await page.keyboard.up('d');
    await delay(500);
    
    await page.screenshot({ path: 'demo-02-movement.png' });
    console.log('✅ Screenshot: demo-02-movement.png');
    
    console.log('Jumping...');
    await pressKey(page, ' ', 200);
    await delay(1000);
    await page.screenshot({ path: 'demo-03-jump.png' });
    console.log('✅ Screenshot: demo-03-jump.png');
    
    console.log('\n🔫 DEMO 2: Shooting');
    await page.mouse.move(800, 500);
    for (let i = 0; i < 5; i++) {
      await pressKey(page, 'm', 100);
      await delay(200);
    }
    await page.screenshot({ path: 'demo-04-shooting.png' });
    console.log('✅ Screenshot: demo-04-shooting.png');
    
    console.log('\n💥 DEMO 3: Combat');
    await page.keyboard.down('d');
    await delay(2000);
    await page.keyboard.up('d');
    await delay(500);
    await page.screenshot({ path: 'demo-05-enemy.png' });
    console.log('✅ Screenshot: demo-05-enemy.png');
    
    for (let i = 0; i < 10; i++) {
      await pressKey(page, 'm', 100);
      await delay(150);
    }
    await page.screenshot({ path: 'demo-06-combat.png' });
    console.log('✅ Screenshot: demo-06-combat.png');
    
    console.log('\n🎁 DEMO 4: Pickups');
    await pressKey(page, ' ', 200);
    await delay(800);
    await page.keyboard.down('d');
    await delay(1000);
    await page.keyboard.up('d');
    await delay(500);
    await page.screenshot({ path: 'demo-07-pickup.png' });
    console.log('✅ Screenshot: demo-07-pickup.png');
    
    console.log('\n💾 DEMO 5: Save Point');
    await page.keyboard.down('d');
    await delay(1500);
    await page.keyboard.up('d');
    await delay(500);
    await pressKey(page, 'e', 200);
    await delay(1000);
    await page.screenshot({ path: 'demo-08-save.png' });
    console.log('✅ Screenshot: demo-08-save.png');
    
    console.log('\n🚪 DEMO 6: Area Transition');
    await page.keyboard.down('d');
    await delay(2000);
    await page.keyboard.up('d');
    await delay(1500);
    await page.screenshot({ path: 'demo-09-transition.png' });
    console.log('✅ Screenshot: demo-09-transition.png');
    
    console.log('\n💔 DEMO 7: Taking Damage');
    await delay(3000);
    await page.screenshot({ path: 'demo-10-damage.png' });
    console.log('✅ Screenshot: demo-10-damage.png');
    
    console.log('\n📸 Final Screenshot');
    await page.keyboard.down('a');
    await delay(1000);
    await page.keyboard.up('a');
    await delay(500);
    await page.screenshot({ path: 'demo-11-final.png' });
    console.log('✅ Screenshot: demo-11-final.png');
    
    console.log('\n✨ Demo Complete! Screenshots saved.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await delay(3000);
    await browser.close();
  }
}

main().catch(console.error);
