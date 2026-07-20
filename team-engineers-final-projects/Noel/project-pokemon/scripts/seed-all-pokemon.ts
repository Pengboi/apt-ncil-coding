import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const TCG_API = 'https://tcgtracking.com/tcgapi/v1';
const POKEMON_CAT = 3;
const USD_TO_GBP = 0.79;

const args = process.argv.slice(2);
const trackAll = args.includes('--track');
const skipPricing = args.includes('--skip-pricing');
const dryRun = args.includes('--dry-run');

interface TcgSet {
  id: number;
  name: string;
  abbreviation: string | null;
  product_count: number;
  is_supplemental: boolean;
  api_url: string;
  pricing_url: string;
}

interface TcgProduct {
  id: number;
  name: string;
  clean_name: string;
  set_name: string;
  set_abbr: string | null;
  number: string;
  rarity: string;
  image_url: string;
  tcgplayer_url: string;
  finishes: string[];
}

interface TcgPricing {
  prices: Record<string, {
    tcg?: Record<string, { low: number; market: number }>;
  }>;
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function seed() {
  const startTime = Date.now();
  console.log('🚀 Pokemon Card Database Seed (TCGTracking API)');
  console.log(`   Supabase: ${supabaseUrl}`);
  console.log(`   Options: ${[trackAll && '--track', skipPricing && '--skip-pricing', dryRun && '--dry-run'].filter(Boolean).join(', ') || 'none'}\n`);

  // 1. Fetch all Pokemon sets
  console.log('📚 Fetching Pokemon sets...');
  const setsData = await fetchJSON(`${TCG_API}/${POKEMON_CAT}/sets`);
  const sets: TcgSet[] = setsData.sets || [];
  console.log(`   Found ${sets.length} sets\n`);

  if (dryRun) {
    const totalProducts = sets.reduce((sum, s) => sum + s.product_count, 0);
    console.log(`[DRY RUN] Would process ${sets.length} sets, ~${totalProducts} products`);
    return;
  }

  let totalCards = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalPrices = 0;
  let totalTracked = 0;
  let errors: string[] = [];

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    const pct = Math.round(((i + 1) / sets.length) * 100);
    process.stdout.write(`\r[${pct}%] ${i + 1}/${sets.length} ${set.name} (${set.product_count} cards)`);

    try {
      // 2. Fetch products for this set
      const productsData = await fetchJSON(`${TCG_API}/${POKEMON_CAT}/sets/${set.id}`);
      const products: TcgProduct[] = productsData.products || [];

      if (products.length === 0) continue;

      // 3. Fetch pricing if not skipped
      let pricing: TcgPricing | null = null;
      if (!skipPricing) {
        try {
          pricing = await fetchJSON(`${TCG_API}/${POKEMON_CAT}/sets/${set.id}/pricing`);
        } catch {
          // Pricing might not be available for some sets
        }
      }

      // 4. Prepare card records
      const cardRecords = products.map(p => ({
        id: String(p.id),
        name: p.name,
        set_id: String(set.id),
        set_name: p.set_name || set.name,
        rarity: p.rarity || 'Unknown',
        image_url: p.image_url || null,
        pokemon_name: p.clean_name || p.name,
        card_type: 'Pokemon',
        hp: null,
      }));

      // 5. Upsert cards in batches of 100
      for (let j = 0; j < cardRecords.length; j += 100) {
        const batch = cardRecords.slice(j, j + 100);
        const { error } = await supabase.from('cards').upsert(batch, { onConflict: 'id' });
        if (error) {
          errors.push(`Cards upsert ${set.name}: ${error.message}`);
        } else {
          totalInserted += batch.length;
        }
      }

      totalCards += products.length;

      // 6. Insert pricing data
      if (pricing && pricing.prices) {
        const priceRecords: any[] = [];
        const snapshotUpdates: any[] = [];

        for (const product of products) {
          const productId = String(product.id);
          const productPricing = pricing.prices[productId];
          if (!productPricing?.tcg) continue;

          // Get the best price: prefer Normal, then first available subtype
          const subtypes = Object.keys(productPricing.tcg);
          const normalSubtype = subtypes.find(s => s.toLowerCase() === 'normal');
          const subtype = normalSubtype || subtypes[0];
          const priceData = productPricing.tcg[subtype];

          if (!priceData?.market && !priceData?.low) continue;

          const marketUSD = priceData.market || priceData.low;
          const priceGBP = Math.round(marketUSD * USD_TO_GBP * 100) / 100;

          priceRecords.push({
            card_id: productId,
            price_gbp: priceGBP,
            price_usd: marketUSD,
            source: 'tcgplayer',
            condition: 'raw',
          });

          snapshotUpdates.push({
            card_id: productId,
            source: 'tcgplayer',
            condition: 'raw',
            current_price: priceGBP,
          });
        }

        // Insert price history in batches
        for (let j = 0; j < priceRecords.length; j += 50) {
          const batch = priceRecords.slice(j, j + 50);
          await supabase.from('price_history').insert(batch).then(({ error }) => {
            if (error && !error.message.includes('duplicate')) {
              errors.push(`Price history ${set.name}: ${error.message}`);
            }
          });
        }
        totalPrices += priceRecords.length;

        // Upsert price snapshots
        for (const snap of snapshotUpdates) {
          const { error: rpcErr } = await supabase.rpc('upsert_price_snapshot', {
            p_card_id: snap.card_id,
            p_source: snap.source,
            p_condition: snap.condition,
            p_current_price: snap.current_price,
          });
          if (rpcErr) errors.push(`Snapshot ${snap.card_id}: ${rpcErr.message}`);
        }
      }

      // 7. Optionally track all cards
      if (trackAll) {
        const trackRecords = products.map(p => ({
          card_id: String(p.id),
          is_active: true,
          priority: 0,
          notes: `${p.name} - Auto-seeded from ${set.name}`,
        }));

        for (let j = 0; j < trackRecords.length; j += 100) {
          const batch = trackRecords.slice(j, j + 100);
          await supabase.from('tracked_cards').upsert(batch, {
            onConflict: 'card_id',
            ignoreDuplicates: true,
          }).then(({ error }) => {
            if (error) errors.push(`Track ${set.name}: ${error.message}`);
            else totalTracked += batch.length;
          });
        }
      }

    } catch (error: any) {
      errors.push(`Set ${set.name} (${set.id}): ${error.message}`);
      totalSkipped++;
    }

    // Small delay to be polite despite no rate limits
    await delay(50);
  }

  const duration = Math.round((Date.now() - startTime) / 1000);

  console.log('\n\n' + '='.repeat(60));
  console.log('✅ SEED COMPLETE');
  console.log('='.repeat(60));
  console.log(`Sets processed:     ${sets.length - totalSkipped}/${sets.length}`);
  console.log(`Cards upserted:     ${totalInserted}`);
  console.log(`Total products:    ${totalCards}`);
  console.log(`Price records:     ${totalPrices}`);
  console.log(`Cards tracked:     ${totalTracked}`);
  console.log(`Errors:            ${errors.length}`);
  console.log(`Duration:          ${Math.round(duration / 60)}m ${duration % 60}s`);
  console.log('='.repeat(60));

  if (errors.length > 0) {
    console.log('\n⚠️  Errors:');
    errors.slice(0, 20).forEach(e => console.log(`   • ${e}`));
    if (errors.length > 20) console.log(`   ... and ${errors.length - 20} more`);
  }

  console.log('\nNext: Run npm run dev and visit /collection');
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
