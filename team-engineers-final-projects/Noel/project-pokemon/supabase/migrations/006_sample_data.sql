-- Sample Data for Pokemon Price Tracker
-- Run this after all migrations to add popular cards and some sample prices

-- ============================================
-- ADD CARDS TO THE MASTER LIST FIRST
-- ============================================

INSERT INTO cards (id, name, set_id, set_name, rarity, image_url, pokemon_name, card_type) VALUES
  ('base1-4', 'Charizard', 'base1', 'Base Set', 'Rare Holo', 'https://images.pokemontcg.io/base1/4_hires.png', 'Charizard', 'Pokemon'),
  ('base1-2', 'Blastoise', 'base1', 'Base Set', 'Rare Holo', 'https://images.pokemontcg.io/base1/2_hires.png', 'Blastoise', 'Pokemon'),
  ('base1-15', 'Venusaur', 'base1', 'Base Set', 'Rare Holo', 'https://images.pokemontcg.io/base1/15_hires.png', 'Venusaur', 'Pokemon')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ADD POPULAR CARDS TO TRACK
-- ============================================

INSERT INTO tracked_cards (card_id, notes) VALUES
  ('base1-4', 'Charizard - Base Set (Holo) - Most famous card!'),
  ('base1-2', 'Blastoise - Base Set (Holo)'),
  ('base1-15', 'Venusaur - Base Set (Holo)')
ON CONFLICT (card_id) DO NOTHING;

-- ============================================
-- ADD SAMPLE PRICE HISTORY (For Testing Charts)
-- This creates fake price data so you can see charts immediately
-- In production, prices will be added by the cron job every 4 hours
-- ============================================

-- Charizard price history (simulated)
INSERT INTO price_history (card_id, price_gbp, source, condition, fetched_at) VALUES
  ('base1-4', 145.00, 'tcgplayer', 'raw', NOW() - INTERVAL '7 days'),
  ('base1-4', 152.50, 'tcgplayer', 'raw', NOW() - INTERVAL '6 days'),
  ('base1-4', 148.00, 'tcgplayer', 'raw', NOW() - INTERVAL '5 days'),
  ('base1-4', 160.00, 'tcgplayer', 'raw', NOW() - INTERVAL '4 days'),
  ('base1-4', 155.00, 'tcgplayer', 'raw', NOW() - INTERVAL '3 days'),
  ('base1-4', 162.50, 'tcgplayer', 'raw', NOW() - INTERVAL '2 days'),
  ('base1-4', 158.00, 'tcgplayer', 'raw', NOW() - INTERVAL '1 day'),
  ('base1-4', 165.00, 'tcgplayer', 'raw', NOW());

-- Blastoise price history (simulated)
INSERT INTO price_history (card_id, price_gbp, source, condition, fetched_at) VALUES
  ('base1-2', 85.00, 'tcgplayer', 'raw', NOW() - INTERVAL '7 days'),
  ('base1-2', 88.50, 'tcgplayer', 'raw', NOW() - INTERVAL '6 days'),
  ('base1-2', 86.00, 'tcgplayer', 'raw', NOW() - INTERVAL '5 days'),
  ('base1-2', 90.00, 'tcgplayer', 'raw', NOW() - INTERVAL '4 days'),
  ('base1-2', 92.50, 'tcgplayer', 'raw', NOW() - INTERVAL '3 days'),
  ('base1-2', 89.00, 'tcgplayer', 'raw', NOW() - INTERVAL '2 days'),
  ('base1-2', 94.00, 'tcgplayer', 'raw', NOW() - INTERVAL '1 day'),
  ('base1-2', 91.50, 'tcgplayer', 'raw', NOW());

-- Venusaur price history (simulated)
INSERT INTO price_history (card_id, price_gbp, source, condition, fetched_at) VALUES
  ('base1-15', 78.00, 'tcgplayer', 'raw', NOW() - INTERVAL '7 days'),
  ('base1-15', 75.50, 'tcgplayer', 'raw', NOW() - INTERVAL '6 days'),
  ('base1-15', 80.00, 'tcgplayer', 'raw', NOW() - INTERVAL '5 days'),
  ('base1-15', 77.00, 'tcgplayer', 'raw', NOW() - INTERVAL '4 days'),
  ('base1-15', 82.50, 'tcgplayer', 'raw', NOW() - INTERVAL '3 days'),
  ('base1-15', 79.00, 'tcgplayer', 'raw', NOW() - INTERVAL '2 days'),
  ('base1-15', 81.00, 'tcgplayer', 'raw', NOW() - INTERVAL '1 day'),
  ('base1-15', 84.00, 'tcgplayer', 'raw', NOW());

-- ============================================
-- UPDATE PRICE SNAPSHOTS WITH LATEST PRICES
-- ============================================

-- These will be updated automatically by the upsert_price_snapshot function
-- but we initialize them here for immediate visibility

INSERT INTO price_snapshots (card_id, source, condition, current_price, previous_price, change_percent, updated_at)
SELECT 
  card_id,
  'tcgplayer',
  'raw',
  price_gbp,
  LAG(price_gbp) OVER (PARTITION BY card_id ORDER BY fetched_at),
  ROUND(((price_gbp - LAG(price_gbp) OVER (PARTITION BY card_id ORDER BY fetched_at)) / 
         LAG(price_gbp) OVER (PARTITION BY card_id ORDER BY fetched_at) * 100)::numeric, 2),
  fetched_at
FROM price_history
WHERE fetched_at = (SELECT MAX(fetched_at) FROM price_history ph2 WHERE ph2.card_id = price_history.card_id)
ON CONFLICT (card_id, source, condition) 
DO UPDATE SET
  current_price = EXCLUDED.current_price,
  previous_price = EXCLUDED.previous_price,
  change_percent = EXCLUDED.change_percent,
  updated_at = EXCLUDED.updated_at;

-- ============================================
-- MARK CARDS AS FETCHED
-- ============================================

UPDATE tracked_cards 
SET last_fetched = NOW(),
    fetch_count = 8
WHERE card_id IN ('base1-4', 'base1-2', 'base1-15');

-- ============================================
-- LOG THE SAMPLE DATA CREATION
-- ============================================

INSERT INTO price_fetch_log (fetch_type, cards_fetched, cards_success, cards_failed, duration_seconds, triggered_by, details)
VALUES ('manual', 3, 3, 0, 5, 'setup', '{"note": "Sample data added for testing"}'::jsonb);
