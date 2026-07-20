-- ============================================
-- CLOUD SUPABASE MIGRATION
-- Project: jevltyioavvjxvjwmiwy
-- Run this in Supabase SQL Editor:
-- https://app.supabase.com/project/jevltyioavvjxvjwmiwy/sql-editor
-- ============================================

-- ============================================
-- MIGRATION 001: CARDS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  set_id TEXT NOT NULL,
  set_name TEXT,
  rarity TEXT,
  image_url TEXT,
  pokemon_name TEXT,
  card_type TEXT DEFAULT 'Pokemon',
  hp INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON cards
  FOR SELECT USING (true);

CREATE POLICY "Allow service role insert" ON cards
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role update" ON cards
  FOR UPDATE USING (true);

CREATE INDEX idx_cards_name ON cards(name);
CREATE INDEX idx_cards_set ON cards(set_id);
CREATE INDEX idx_cards_pokemon_name ON cards(pokemon_name);

-- ============================================
-- MIGRATION 002: PRICE HISTORY TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  price_gbp DECIMAL(10, 2) NOT NULL,
  price_usd DECIMAL(10, 2),
  price_eur DECIMAL(10, 2),
  source TEXT NOT NULL,
  condition TEXT DEFAULT 'raw',
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(card_id, source, condition, fetched_at)
);

ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON price_history
  FOR SELECT USING (true);

CREATE POLICY "Allow service role insert" ON price_history
  FOR INSERT WITH CHECK (true);

CREATE INDEX idx_price_history_card_time 
  ON price_history(card_id, source, fetched_at DESC);

CREATE INDEX idx_price_history_fetched_at 
  ON price_history(fetched_at DESC);

CREATE INDEX idx_price_history_card_id 
  ON price_history(card_id);

-- ============================================
-- MIGRATION 003: PRICE SNAPSHOTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS price_snapshots (
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  condition TEXT DEFAULT 'raw',
  current_price DECIMAL(10, 2) NOT NULL,
  previous_price DECIMAL(10, 2),
  change_percent DECIMAL(5, 2),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (card_id, source, condition)
);

ALTER TABLE price_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON price_snapshots
  FOR SELECT USING (true);

CREATE POLICY "Allow service role upsert" ON price_snapshots
  FOR ALL USING (true);

CREATE INDEX idx_snapshots_change ON price_snapshots(change_percent DESC);
CREATE INDEX idx_snapshots_updated ON price_snapshots(updated_at DESC);
CREATE INDEX idx_snapshots_card ON price_snapshots(card_id);

-- ============================================
-- MIGRATION 004: TRACKED CARDS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS tracked_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  notes TEXT,
  last_fetched TIMESTAMP WITH TIME ZONE,
  fetch_count INTEGER DEFAULT 0,
  UNIQUE(card_id)
);

ALTER TABLE tracked_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON tracked_cards
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON tracked_cards
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON tracked_cards
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON tracked_cards
  FOR DELETE USING (true);

CREATE INDEX idx_tracked_active ON tracked_cards(is_active) WHERE is_active = true;
CREATE INDEX idx_tracked_priority ON tracked_cards(priority DESC, date_added);
CREATE INDEX idx_tracked_last_fetched ON tracked_cards(last_fetched);

-- ============================================
-- MIGRATION 005: FUNCTIONS AND LOG TABLE
-- ============================================

-- Price fetch log table
CREATE TABLE IF NOT EXISTS price_fetch_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetch_type TEXT NOT NULL,
  cards_fetched INTEGER DEFAULT 0,
  cards_success INTEGER DEFAULT 0,
  cards_failed INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  triggered_by TEXT DEFAULT 'system',
  details JSONB
);

ALTER TABLE price_fetch_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON price_fetch_log
  FOR SELECT USING (true);

CREATE POLICY "Allow service role insert" ON price_fetch_log
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role update" ON price_fetch_log
  FOR UPDATE USING (true);

CREATE INDEX idx_fetch_log_started ON price_fetch_log(started_at DESC);
CREATE INDEX idx_fetch_log_type ON price_fetch_log(fetch_type);

-- Upsert price snapshot function
CREATE OR REPLACE FUNCTION upsert_price_snapshot(
  p_card_id TEXT,
  p_source TEXT,
  p_condition TEXT,
  p_current_price DECIMAL
) RETURNS void AS $$
DECLARE
  v_previous_price DECIMAL;
BEGIN
  SELECT current_price INTO v_previous_price
  FROM price_snapshots
  WHERE card_id = p_card_id 
    AND source = p_source 
    AND condition = p_condition;
  
  INSERT INTO price_snapshots (
    card_id, source, condition, current_price, 
    previous_price, change_percent, updated_at
  )
  VALUES (
    p_card_id, p_source, p_condition, p_current_price,
    v_previous_price,
    CASE 
      WHEN v_previous_price IS NOT NULL AND v_previous_price > 0 THEN
        ROUND(((p_current_price - v_previous_price) / v_previous_price * 100)::numeric, 2)
      ELSE 0
    END,
    NOW()
  )
  ON CONFLICT (card_id, source, condition) 
  DO UPDATE SET
    current_price = EXCLUDED.current_price,
    previous_price = EXCLUDED.previous_price,
    change_percent = EXCLUDED.change_percent,
    updated_at = EXCLUDED.updated_at;
END;
$$ LANGUAGE plpgsql;

-- Get price history chart function
CREATE OR REPLACE FUNCTION get_price_history_chart(
  p_card_id TEXT,
  p_days INTEGER DEFAULT 30,
  p_source TEXT DEFAULT 'tcgplayer'
) RETURNS TABLE (
  date TIMESTAMP WITH TIME ZONE,
  avg_price DECIMAL,
  min_price DECIMAL,
  max_price DECIMAL,
  count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE_TRUNC('day', fetched_at) as date,
    AVG(price_gbp)::DECIMAL(10,2) as avg_price,
    MIN(price_gbp)::DECIMAL(10,2) as min_price,
    MAX(price_gbp)::DECIMAL(10,2) as max_price,
    COUNT(*)::INTEGER as count
  FROM price_history
  WHERE card_id = p_card_id
    AND source = p_source
    AND fetched_at >= NOW() - (p_days || ' days')::INTERVAL
  GROUP BY DATE_TRUNC('day', fetched_at)
  ORDER BY date ASC;
END;
$$ LANGUAGE plpgsql;

-- Get top movers function
CREATE OR REPLACE FUNCTION get_top_movers(
  p_limit INTEGER DEFAULT 10,
  p_min_change DECIMAL DEFAULT 1.0
) RETURNS TABLE (
  card_id TEXT,
  card_name TEXT,
  current_price DECIMAL,
  change_percent DECIMAL,
  source TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ps.card_id,
    c.name as card_name,
    ps.current_price,
    ps.change_percent,
    ps.source,
    ps.updated_at
  FROM price_snapshots ps
  JOIN cards c ON c.id = ps.card_id
  WHERE ABS(ps.change_percent) >= p_min_change
    AND ps.updated_at >= NOW() - INTERVAL '24 hours'
  ORDER BY ABS(ps.change_percent) DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Increment fetch count function
CREATE OR REPLACE FUNCTION increment_fetch_count(
  p_card_id TEXT
) RETURNS void AS $$
BEGIN
  UPDATE tracked_cards
  SET fetch_count = fetch_count + 1,
      last_fetched = NOW()
  WHERE card_id = p_card_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- MIGRATION 006: SAMPLE DATA (Optional)
-- ============================================

-- Add sample cards
INSERT INTO cards (id, name, set_id, set_name, rarity, image_url, pokemon_name, card_type) VALUES
  ('base1-4', 'Charizard', 'base1', 'Base Set', 'Rare Holo', 'https://images.pokemontcg.io/base1/4_hires.png', 'Charizard', 'Pokemon'),
  ('base1-2', 'Blastoise', 'base1', 'Base Set', 'Rare Holo', 'https://images.pokemontcg.io/base1/2_hires.png', 'Blastoise', 'Pokemon'),
  ('base1-15', 'Venusaur', 'base1', 'Base Set', 'Rare Holo', 'https://images.pokemontcg.io/base1/15_hires.png', 'Venusaur', 'Pokemon')
ON CONFLICT (id) DO NOTHING;

-- Add to tracking
INSERT INTO tracked_cards (card_id, notes) VALUES
  ('base1-4', 'Charizard - Base Set (Holo) - Most famous card!'),
  ('base1-2', 'Blastoise - Base Set (Holo)'),
  ('base1-15', 'Venusaur - Base Set (Holo)')
ON CONFLICT (card_id) DO NOTHING;
