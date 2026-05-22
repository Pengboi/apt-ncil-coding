"use strict";
// scripts/import-all-cards-async.ts
// Imports ALL Pokemon cards in the BACKGROUND
// Run with: npm run import-cards:async
// Check status: npm run import-cards:status
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Load env
const envPath = path.join(__dirname, '../.env.local');
dotenv.config({ path: envPath });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!');
    process.exit(1);
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const TCG_API = 'https://api.tcgdex.net/v2/en';
// Status file for tracking progress
const STATUS_FILE = path.join(__dirname, '../import-status.json');
// Initialize status
const status = {
    isRunning: true,
    startedAt: new Date().toISOString(),
    setsProcessed: 0,
    totalSets: 0,
    cardsInserted: 0,
    cardsSkipped: 0,
    cardsFound: 0,
    errors: 0,
    lastSet: '',
    estimatedCompletion: '',
};
function saveStatus() {
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}
function loadStatus() {
    try {
        if (fs.existsSync(STATUS_FILE)) {
            return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf-8'));
        }
    }
    catch (e) { }
    return null;
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function fetchAllSets() {
    try {
        const response = await fetch(`${TCG_API}/sets`);
        if (!response.ok)
            throw new Error(`Failed: ${response.status}`);
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching sets:', error);
        return [];
    }
}
async function fetchCardsFromSet(setId) {
    try {
        const response = await fetch(`${TCG_API}/sets/${setId}`);
        if (!response.ok)
            return [];
        const setData = await response.json();
        return setData.cards || [];
    }
    catch (error) {
        return [];
    }
}
async function insertCard(card, setId, setName) {
    try {
        const { error } = await supabase
            .from('cards')
            .upsert({
            id: card.id,
            name: card.name,
            set_id: setId,
            set_name: setName,
            rarity: card.rarity || 'Unknown',
            image_url: card.image || null,
            pokemon_name: card.name,
            card_type: card.category || 'Pokemon',
            hp: card.hp || null,
        }, {
            onConflict: 'id',
            ignoreDuplicates: true,
        });
        if (error) {
            if (error.code === '23505') {
                status.cardsSkipped++;
                return true;
            }
            throw error;
        }
        status.cardsInserted++;
        return true;
    }
    catch (error) {
        status.errors++;
        return false;
    }
}
async function importAllCards() {
    console.log('🚀 Starting Async Pokemon Card Import\n');
    console.log(`Supabase: ${supabaseUrl}`);
    console.log('Status file:', STATUS_FILE);
    console.log('Run `npm run import-cards:status` to check progress\n');
    const startTime = Date.now();
    saveStatus();
    const sets = await fetchAllSets();
    status.totalSets = sets.length;
    if (sets.length === 0) {
        status.isRunning = false;
        status.completedAt = new Date().toISOString();
        saveStatus();
        console.error('❌ No sets found');
        return;
    }
    // Estimate: ~100 cards per set, 100ms per card = ~10 cards/sec
    const estimatedSeconds = (sets.length * 100) / 10;
    const estimatedCompletion = new Date(startTime + estimatedSeconds * 1000);
    status.estimatedCompletion = estimatedCompletion.toISOString();
    saveStatus();
    console.log(`📚 Found ${sets.length} sets to process`);
    console.log(`⏱️  Estimated completion: ${estimatedCompletion.toLocaleTimeString()}\n`);
    for (let i = 0; i < sets.length; i++) {
        const set = sets[i];
        status.lastSet = set.name;
        const cards = await fetchCardsFromSet(set.id);
        status.cardsFound += cards.length;
        for (const card of cards) {
            await insertCard(card, set.id, set.name);
            await delay(50); // Small delay
        }
        status.setsProcessed = i + 1;
        saveStatus();
        // Progress log every 10 sets
        if ((i + 1) % 10 === 0 || i === sets.length - 1) {
            const percent = Math.round(((i + 1) / sets.length) * 100);
            const elapsed = Math.round((Date.now() - startTime) / 1000 / 60);
            console.log(`[${percent}%] ${i + 1}/${sets.length} sets | ${status.cardsInserted} cards inserted | ${elapsed}m elapsed`);
        }
        await delay(100); // Delay between sets
    }
    status.isRunning = false;
    status.completedAt = new Date().toISOString();
    saveStatus();
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log('\n✅ Import Complete!');
    console.log(`Total cards: ${status.cardsInserted} inserted, ${status.cardsSkipped} skipped`);
    console.log(`Duration: ${Math.round(duration / 60)} minutes`);
}
// Check if this is a status check call
if (process.argv.includes('--status')) {
    const currentStatus = loadStatus();
    if (!currentStatus) {
        console.log('ℹ️  No import status found. Run `npm run import-cards:async` to start.');
        process.exit(0);
    }
    if (currentStatus.isRunning) {
        const percent = currentStatus.totalSets > 0
            ? Math.round((currentStatus.setsProcessed / currentStatus.totalSets) * 100)
            : 0;
        const eta = currentStatus.estimatedCompletion
            ? new Date(currentStatus.estimatedCompletion).toLocaleTimeString()
            : 'calculating...';
        console.log('🔄 Import is RUNNING\n');
        console.log(`Progress: ${percent}% (${currentStatus.setsProcessed}/${currentStatus.totalSets} sets)`);
        console.log(`Cards: ${currentStatus.cardsInserted} inserted, ${currentStatus.cardsSkipped} skipped`);
        console.log(`Current set: ${currentStatus.lastSet || '...'}`);
        console.log(`Started: ${new Date(currentStatus.startedAt).toLocaleString()}`);
        console.log(`ETA: ${eta}`);
    }
    else if (currentStatus.completedAt) {
        console.log('✅ Import COMPLETED\n');
        console.log(`Cards: ${currentStatus.cardsInserted} inserted, ${currentStatus.cardsSkipped} skipped`);
        console.log(`Completed: ${new Date(currentStatus.completedAt).toLocaleString()}`);
    }
    else {
        console.log('⏹️  Import NOT STARTED');
    }
    process.exit(0);
}
// Run the import
importAllCards().catch(err => {
    console.error('Fatal error:', err);
    status.isRunning = false;
    saveStatus();
    process.exit(1);
});
