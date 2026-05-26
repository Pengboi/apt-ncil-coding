import { chromium, Browser, Page } from 'playwright';

/**
 * TACTICAL OPS - Game Demonstration Script
 * This script automates the browser to showcase the game features
 */

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pressKey(page: Page, key: string, duration: number = 100): Promise<void> {
  await page.keyboard.down(key);
  await delay(duration);
  await page.keyboard.up(key);
}

async function main(): Promise<void> {
  console.log('🎮 TACTICAL OPS - Game Demo Starting...\n');
  
  const browser: Browser = await chromium.launch({
    headless: false,  // Set to true to run without visible window
    slowMo: 50,       // Slow down operations by 50ms for visibility
  });
  
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  
  const page: Page = await context.newPage();
  
  try {
    // Navigate to the game
    console.log('📍 Loading game at http://localhost:3000...');
    await page.goto('http://localhost:3000');
    await delay(2000);
    
    // Take initial screenshot
    await page.screenshot({ path: 'demo-01-main-menu.png' });
    console.log('✅ Screenshot saved: demo-01-main-menu.png');
    
    // Click on the canvas to focus
    const canvas = page.locator('canvas');
    await canvas.click();
    await delay(500);
    
    // ============================================
    // DEMO 1: Basic Movement
    // ============================================
    console.log('\n🏃 DEMO 1: Basic Movement');
    console.log('Moving right...');
    
    // Move right
    await page.keyboard.down('d');
    await delay(1500);
    await page.keyboard.up('d');
    await delay(500);
    
    await page.screenshot({ path: 'demo-02-movement-right.png' });
    console.log('✅ Screenshot saved: demo-02-movement-right.png');
    
    // Jump
    console.log('Jumping...');
    await pressKey(page, ' ', 200);
    await delay(1000);
    
    await page.screenshot({ path: 'demo-03-jump.png' });
    console.log('✅ Screenshot saved: demo-03-jump.png');
    
    // ============================================
    // DEMO 2: Shooting
    // ============================================
    console.log('\n🔫 DEMO 2: Shooting');
    console.log('Aiming and shooting...');
    
    // Move mouse to aim position
    await page.mouse.move(800, 500);
    await delay(500);
    
    // Shoot a few times
    for (let i = 0; i < 5; i++) {
      await pressKey(page, 'm', 100);
      await delay(200);
    }
    
    await page.screenshot({ path: 'demo-04-shooting.png' });
    console.log('✅ Screenshot saved: demo-04-shooting.png');
    
    // ============================================
    // DEMO 3: Combat with Enemies
    // ============================================
    console.log('\n💥 DEMO 3: Finding and Shooting Enemies');
    
    // Move toward enemy area
    console.log('Moving forward to find enemies...');
    await page.keyboard.down('d');
    await delay(2000);
    await page.keyboard.up('d');
    await delay(500);
    
    // Take screenshot showing enemy
    await page.screenshot({ path: 'demo-05-enemy-spotted.png' });
    console.log('✅ Screenshot saved: demo-05-enemy-spotted.png');
    
    // Shoot at enemy
    console.log('Engaging enemy...');
    for (let i = 0; i < 10; i++) {
      await pressKey(page, 'm', 100);
      await delay(150);
    }
    
    await delay(500);
    await page.screenshot({ path: 'demo-06-combat.png' });
    console.log('✅ Screenshot saved: demo-06-combat.png');
    
    // ============================================
    // DEMO 4: Collecting Pickups
    // ============================================
    console.log('\n🎁 DEMO 4: Collecting Pickups');
    console.log('Moving to collect medkit...');
    
    // Jump to platform
    await pressKey(page, ' ', 200);
    await delay(800);
    
    // Move to pickup
    await page.keyboard.down('d');
    await delay(1000);
    await page.keyboard.up('d');
    await delay(500);
    
    await page.screenshot({ path: 'demo-07-pickup-collected.png' });
    console.log('✅ Screenshot saved: demo-07-pickup-collected.png');
    
    // ============================================
    // DEMO 5: Save Point
    // ============================================
    console.log('\n💾 DEMO 5: Save Point');
    console.log('Moving to save terminal...');
    
    // Move to save point
    await page.keyboard.down('d');
    await delay(1500);
    await page.keyboard.up('d');
    await delay(500);
    
    // Save
    await pressKey(page, 'e', 200);
    await delay(1000);
    
    await page.screenshot({ path: 'demo-08-save-point.png' });
    console.log('✅ Screenshot saved: demo-08-save-point.png');
    
    // ============================================
    // DEMO 6: Area Transition
    // ============================================
    console.log('\n🚪 DEMO 6: Area Transition');
    console.log('Moving to exit...');
    
    // Continue to exit
    await page.keyboard.down('d');
    await delay(2000);
    await page.keyboard.up('d');
    await delay(1500);  // Wait for transition
    
    await page.screenshot({ path: 'demo-09-area-transition.png' });
    console.log('✅ Screenshot saved: demo-09-area-transition.png');
    
    // ============================================
    // DEMO 7: Taking Damage
    // ============================================
    console.log('\n💔 DEMO 7: Taking Damage from Enemy');
    console.log('Letting enemy shoot us...');
    
    // Stand still and let enemy shoot
    await delay(3000);
    
    await page.screenshot({ path: 'demo-10-taking-damage.png' });
    console.log('✅ Screenshot saved: demo-10-taking-damage.png');
    
    // ============================================
    // FINAL: Full gameplay screenshot
    // ============================================
    console.log('\n📸 Final Gameplay Screenshot');
    
    // Do some final movement
    await page.keyboard.down('a');
    await delay(1000);
    await page.keyboard.up('a');
    await delay(500);
    
    await page.screenshot({ path: 'demo-11-final-gameplay.png', fullPage: false });
    console.log('✅ Screenshot saved: demo-11-final-gameplay.png');
    
    console.log('\n✨ Demo Complete!');
    console.log('All screenshots saved in the project root.');
    
  } catch (error) {
    console.error('❌ Error during demo:', error);
  } finally {
    // Keep browser open for a bit to see final state
    await delay(3000);
    await browser.close();
  }
}

// Run the demo
main().catch(console.error);
