import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const TCG_API = 'https://tcgtracking.com/tcgapi/v1';
const POKEMON_CAT = 3;
const USD_TO_GBP = 0.79;

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function reprice() {
  console.log('🔄 Re-fetching prices to generate change_percent...\n');

  const { data: sets } = await supabase
    .from('cards')
    .select('set_id, set_name')
    .not('set_id', 'is', null);

  if (!sets || sets.length === 0) {
    console.log('No sets found');
    return;
  }

  const setMap = new Map<string, string>();
  (sets || []).forEach(s => setMap.set(s.set_id, s.set_name));
  const uniqueSets = [...setMap.entries()];

  let totalUpdated = 0;
  let totalErrors = 0;

  for (let i = 0; i < uniqueSets.length; i++) {
    const [setId, setName] = uniqueSets[i];
    const pct = Math.round(((i + 1) / uniqueSets.length) * 100);
    process.stdout.write(`\r[${pct}%] ${i + 1}/${uniqueSets.length} ${setName}  (updated: ${totalUpdated})`);

    try {
      const pricingData = await fetchJSON(`${TCG_API}/${POKEMON_CAT}/sets/${setId}/pricing`);
      const prices = pricingData?.prices || {};
      const productIds = Object.keys(prices);

      for (const productId of productIds) {
        const productPricing = prices[productId];
        if (!productPricing?.tcg) continue;

        const subtypes = Object.keys(productPricing.tcg);
        const normalSubtype = subtypes.find(s => s.toLowerCase() === 'normal');
        const subtype = normalSubtype || subtypes[0];
        const priceData = productPricing.tcg[subtype];

        if (!priceData?.market && !priceData?.low) continue;

        const marketUSD = priceData.market || priceData.low;
        const priceGBP = Math.round(marketUSD * USD_TO_GBP * 100) / 100;

        const { error: rpcErr } = await supabase.rpc('upsert_price_snapshot', {
          p_card_id: productId,
          p_source: 'tcgplayer',
          p_condition: 'raw',
          p_current_price: priceGBP,
        });

        if (rpcErr) {
          totalErrors++;
        } else {
          totalUpdated++;
        }
      }
    } catch {
      totalErrors++;
    }

    await delay(50);
  }

  console.log(`\n\n✅ Done! Updated ${totalUpdated} snapshots, ${totalErrors} errors`);
}

reprice().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
