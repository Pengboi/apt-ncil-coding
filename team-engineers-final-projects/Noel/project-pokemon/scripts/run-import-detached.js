// scripts/run-import-detached.js
// Starts the card import in the BACKGROUND so you can close terminal
// Usage: npm run import-cards:async

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../import-cards.log');
const statusFile = path.join(__dirname, '../import-status.json');

// Check if already running
function checkIfRunning() {
  try {
    if (fs.existsSync(statusFile)) {
      const status = JSON.parse(fs.readFileSync(statusFile, 'utf-8'));
      if (status.isRunning) {
        console.log('⚠️  Import is already running!');
        console.log('   Check status: npm run import-cards:status');
        console.log('   View logs: npm run import-cards:logs');
        process.exit(0);
      }
    }
  } catch (e) {}
}

checkIfRunning();

console.log('🚀 Starting Pokemon Card Import in BACKGROUND mode');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('This process will continue even if you close the terminal.');
console.log('');
console.log('Commands:');
console.log('  Check status:  npm run import-cards:status');
console.log('  View logs:     tail -f import-cards.log');
console.log('  Stop import:   pkill -f "import-all-cards-async"');
console.log('');
console.log(`Logs: ${logFile}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Clear old log
fs.writeFileSync(logFile, `Import started at ${new Date().toISOString()}\n\n`);

// Spawn detached process
const child = spawn('node', [
  path.join(__dirname, 'import-all-cards-async.js')
], {
  detached: true,
  stdio: ['ignore', fs.openSync(logFile, 'a'), fs.openSync(logFile, 'a')]
});

// Unref so parent can exit
child.unref();

// Give it a moment to start
setTimeout(() => {
  console.log('✅ Import process started!');
  console.log(`   PID: ${child.pid}`);
  console.log('');
  console.log('Run this to check progress:');
  console.log('  npm run import-cards:status\n');
  process.exit(0);
}, 1000);
