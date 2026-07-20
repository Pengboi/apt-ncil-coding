"use strict";
// scripts/import-all-cards.ts
// Imports ALL Pokemon cards from TCGdex API into Supabase
// This is a one-time bulk import - run carefully!
// 
// Usage:
//   npx ts-node scripts/import-all-cards.ts
//
// Or compile and run:
//   npx tsc scripts/import-all-cards.ts && node scripts/import-all-cards.js
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
// Load env
const envPath = path.join(__dirname, '../.env.local');
dotenv.config({ path: envPath });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials!');
    console.error('Make sure .env.local exists with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// TCGdex API base URL
const TCG_API = 'https://api.tcgdex.net/v2/en';
const stats = {
    setsProcessed: 0,
    cardsFound: 0,
    cardsInserted: 0,
    cardsSkipped: 0,
    errors: [],
};
// Rate limiting delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
/**
 * Fetch all sets from TCGdex
 */
async function fetchAllSets() {
    console.log('📚 Fetching all Pokemon card sets...');
    try {
        const response = await fetch(`${TCG_API}/sets`);
        if (!response.ok) {
            throw new Error(`Failed to fetch sets: ${response.status}`);
        }
        const sets = await response.json();
        console.log(`✅ Found ${sets.length} sets`);
        return sets;
    }
    catch (error) {
        console.error('❌ Error fetching sets:', error);
        stats.errors.push(`Failed to fetch sets: ${error}`);
        return [];
    }
}
/**
 * Fetch all cards from a specific set
 */
async function fetchCardsFromSet(setId) {
    try {
        const response = await fetch(`${TCG_API}/sets/${setId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch set ${setId}: ${response.status}`);
        }
        const setData = await response.json();
        const cards = setData.cards || [];
        return cards.map((card) => ({
            id: card.id,
            name: card.name,
            localId: card.localId,
            rarity: card.rarity,
            image: card.image,
            category: card.category,
            hp: card.hp,
        }));
    }
    catch (error) {
        console.error(`❌ Error fetching cards from set ${setId}:`, error);
        stats.errors.push(`Failed to fetch set ${setId}: ${error}`);
        return [];
    }
}
/**
 * Insert a card into the database
 */
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
                // Duplicate - already exists
                stats.cardsSkipped++;
                return true;
            }
            throw error;
        }
        stats.cardsInserted++;
        return true;
    }
    catch (error) {
        console.error(`❌ Error inserting card ${card.id}:`, error);
        stats.errors.push(`Failed to insert card ${card.id}: ${error}`);
        return false;
    }
}
/**
 * Add a card to tracking (for price monitoring)
 */
async function addToTracking(cardId, cardName) {
    try {
        const { error } = await supabase
            .from('tracked_cards')
            .upsert({
            card_id: cardId,
            notes: `${cardName} - Auto-imported`,
            is_active: true,
            priority: 0,
        }, {
            onConflict: 'card_id',
            ignoreDuplicates: true,
        });
        if (error && error.code !== '23505') {
            console.error(`⚠️ Error tracking card ${cardId}:`, error);
        }
        return true;
    }
    catch (error) {
        // Silently fail - tracking is optional
        return false;
    }
}
/**
 * Main import function
 */
async function importAllCards(trackAll = false) {
    console.log('🚀 Starting Pokemon Card Database Import\n');
    console.log(`Supabase: ${supabaseUrl}\n`);
    const startTime = Date.now();
    // Fetch all sets
    const sets = await fetchAllSets();
    if (sets.length === 0) {
        console.error('❌ No sets found. Aborting.');
        return;
    }
    console.log(`\n📥 Importing cards from ${sets.length} sets...`);
    console.log('⏳ This may take several minutes...\n');
    // Process each set
    for (let i = 0; i < sets.length; i++) {
        const set = sets[i];
        const progress = `[${i + 1}/${sets.length}]`;
        console.log(`${progress} Processing: ${set.name} (${set.id})`);
        // Fetch cards from this set
        const cards = await fetchCardsFromSet(set.id);
        stats.cardsFound += cards.length;
        console.log(`         Found ${cards.length} cards`);
        // Insert each card
        for (const card of cards) {
            await insertCard(card, set.id, set.name);
            // Optionally track for price monitoring
            if (trackAll) {
                await addToTracking(card.id, card.name);
            }
            // Small delay to avoid rate limits
            await delay(10);
        }
        stats.setsProcessed++;
        // Progress update every 10 sets
        if ((i + 1) % 10 === 0) {
            console.log(`\n📊 Progress: ${stats.cardsInserted} cards inserted, ${stats.cardsSkipped} skipped\n`);
        }
        // Delay between sets to be nice to the API
        await delay(100);
    }
    const duration = Math.round((Date.now() - startTime) / 1000);
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 IMPORT COMPLETE!');
    console.log('='.repeat(60));
    console.log(`Sets processed:     ${stats.setsProcessed}`);
    console.log(`Cards found:        ${stats.cardsFound}`);
    console.log(`Cards inserted:     ${stats.cardsInserted}`);
    console.log(`Cards skipped:      ${stats.cardsSkipped} (already existed)`);
    console.log(`Errors:             ${stats.errors.length}`);
    console.log(`Duration:           ${duration}s`);
    console.log('='.repeat(60));
    if (stats.errors.length > 0) {
        console.log('\n⚠️  Errors encountered:');
        stats.errors.slice(0, 10).forEach(err => console.log(`   • ${err}`));
        if (stats.errors.length > 10) {
            console.log(`   ... and ${stats.errors.length - 10} more`);
        }
    }
    console.log('\n✅ Import complete!');
    console.log('   Next: Run npm run dev and go to /price-tracker');
}
// Parse command line arguments
const args = process.argv.slice(2);
const trackAll = args.includes('--track-all');
if (trackAll) {
    console.log('🏷️  Will track ALL cards for price monitoring (this adds many rows!)\n');
}
// Run the import
importAllCards(trackAll).catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
});
