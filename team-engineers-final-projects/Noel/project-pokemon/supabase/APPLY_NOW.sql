-- Migration 001: Create cards table
-- This stores master Pokemon card information (like a Pokedex)

CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,              -- TCG card ID (e.g., "base1-4")
  name TEXT NOT NULL,               -- Card name like "Charizard"
  set_id TEXT NOT NULL,             -- Set code like "base1"
  set_name TEXT,                    -- Full set name like "Base Set"
  rarity TEXT,                      -- Card rarity like "Rare Holo"
  image_url TEXT,                   -- URL to card image
  pokemon_name TEXT,                -- For linking to PokeAPI
  card_type TEXT DEFAULT 'Pokemon', -- Pokemon, Trainer, or Energy
  hp INTEGER,                       -- Hit points (if Pokemon)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - required for Supabase
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read cards (public access)
CREATE POLICY "Allow public read access" ON cards
  FOR SELECT USING (true);

-- Only allow service role to insert/update
CREATE POLICY "Allow service role insert" ON cards
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role update" ON cards
  FOR UPDATE USING (true);

-- Indexes for fast searching
CREATE INDEX idx_cards_name ON cards(name);
CREATE INDEX idx_cards_set ON cards(set_id);
CREATE INDEX idx_cards_pokemon_name ON cards(pokemon_name);
-- Migration 002: Create price_history table
-- This is THE MOST IMPORTANT table - it stores every price check ever made
-- Every 4 hours, we add new rows here to track price changes over time

CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  price_gbp DECIMAL(10, 2) NOT NULL,     -- Price in British Pounds (£)
  price_usd DECIMAL(10, 2),              -- Price in US Dollars ($) - optional
  price_eur DECIMAL(10, 2),              -- Price in Euros (€) - optional
  source TEXT NOT NULL,                   -- Where price came from: 'tcgplayer', 'cardmarket', 'pokemonpricetracker'
  condition TEXT DEFAULT 'raw',           -- Card condition: 'raw', 'psa9', 'psa10', etc.
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate prices for same card/source/time combination
  UNIQUE(card_id, source, condition, fetched_at)
);

-- Enable Row Level Security
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- Allow public to read price history
CREATE POLICY "Allow public read access" ON price_history
  FOR SELECT USING (true);

-- Allow service role to insert prices
CREATE POLICY "Allow service role insert" ON price_history
  FOR INSERT WITH CHECK (true);

-- SUPER IMPORTANT: Index for fast time-series queries
-- This makes it fast to get price history for charts
CREATE INDEX idx_price_history_card_time 
  ON price_history(card_id, source, fetched_at DESC);

-- Index for getting all recent prices
CREATE INDEX idx_price_history_fetched_at 
  ON price_history(fetched_at DESC);

-- Index for looking up by card
CREATE INDEX idx_price_history_card_id 
  ON price_history(card_id);

-- Index for filtering by source
CREATE INDEX idx_price_history_source 
  ON price_history(source);
-- Migration 003: Create price_snapshots table
-- This table always has exactly 1 row per card with the LATEST price
-- It's used for quick lookups (don't need to search through all history)

CREATE TABLE IF NOT EXISTS price_snapshots (
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  source TEXT NOT NULL,                   -- Price source
  condition TEXT DEFAULT 'raw',           -- Card condition
  current_price DECIMAL(10, 2) NOT NULL,  -- Most recent price
  previous_price DECIMAL(10, 2),          -- Price before this one (for calculating change)
  change_percent DECIMAL(5, 2),           -- Percentage change between current and previous
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Each card can only have one snapshot per source/condition combo
  PRIMARY KEY (card_id, source, condition)
);

-- Enable Row Level Security
ALTER TABLE price_snapshots ENABLE ROW LEVEL SECURITY;

-- Allow public to read snapshots
CREATE POLICY "Allow public read access" ON price_snapshots
  FOR SELECT USING (true);

-- Allow service role to modify snapshots
CREATE POLICY "Allow service role upsert" ON price_snapshots
  FOR ALL USING (true);

-- Index for finding biggest price movers (gainers/losers)
CREATE INDEX idx_snapshots_change ON price_snapshots(change_percent DESC);

-- Index for recently updated
CREATE INDEX idx_snapshots_updated ON price_snapshots(updated_at DESC);

-- Index for getting all snapshots for a card
CREATE INDEX idx_snapshots_card ON price_snapshots(card_id);
-- Migration 004: Create tracked_cards table
-- This is your "watch list" - cards you want to automatically track every 4 hours

CREATE TABLE IF NOT EXISTS tracked_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,         -- If false, we skip this card
  priority INTEGER DEFAULT 0,               -- 0=normal, 1=high priority (check more often)
  notes TEXT,                             -- Optional notes about why tracking
  last_fetched TIMESTAMP WITH TIME ZONE,    -- When we last checked this card's price
  fetch_count INTEGER DEFAULT 0,          -- How many times we've fetched it
  
  -- Each card can only be tracked once (prevents duplicates)
  UNIQUE(card_id)
);

-- Enable Row Level Security
ALTER TABLE tracked_cards ENABLE ROW LEVEL SECURITY;

-- Allow public to read tracked cards
CREATE POLICY "Allow public read access" ON tracked_cards
  FOR SELECT USING (true);

-- Allow anyone to add cards to track
CREATE POLICY "Allow public insert" ON tracked_cards
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update their tracked cards
CREATE POLICY "Allow public update" ON tracked_cards
  FOR UPDATE USING (true);

-- Allow anyone to remove tracked cards
CREATE POLICY "Allow public delete" ON tracked_cards
  FOR DELETE USING (true);

-- Index for getting active cards quickly (used by the fetcher)
CREATE INDEX idx_tracked_active ON tracked_cards(is_active) WHERE is_active = true;

-- Index for priority sorting
CREATE INDEX idx_tracked_priority ON tracked_cards(priority DESC, date_added);

-- Index for cards that haven't been fetched recently
CREATE INDEX idx_tracked_last_fetched ON tracked_cards(last_fetched);
-- Migration 005: Create price_fetch_log table and helper functions
-- This tracks when we run price fetches (for debugging and monitoring)

-- Table to log each fetch operation
CREATE TABLE IF NOT EXISTS price_fetch_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fetch_type TEXT NOT NULL,               -- 'scheduled', 'manual', 'bulk', 'single'
  cards_fetched INTEGER DEFAULT 0,        -- Total cards we tried to fetch
  cards_success INTEGER DEFAULT 0,        -- How many succeeded
  cards_failed INTEGER DEFAULT 0,         -- How many failed
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,  -- When it finished
  duration_seconds INTEGER,               -- How long it took
  error_message TEXT,                     -- If there was an error
  triggered_by TEXT DEFAULT 'system',     -- 'cron', 'user', 'webhook', 'manual'
  details JSONB                           -- Extra info (which cards, etc.)
);

-- Enable Row Level Security
ALTER TABLE price_fetch_log ENABLE ROW LEVEL SECURITY;

-- Allow public to read logs
CREATE POLICY "Allow public read access" ON price_fetch_log
  FOR SELECT USING (true);

-- Allow service role to create logs
CREATE POLICY "Allow service role insert" ON price_fetch_log
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role update" ON price_fetch_log
  FOR UPDATE USING (true);

-- Index for recent logs
CREATE INDEX idx_fetch_log_started ON price_fetch_log(started_at DESC);

-- Index by type
CREATE INDEX idx_fetch_log_type ON price_fetch_log(fetch_type);


-- ============================================
-- STORED FUNCTION: Upsert Price Snapshot
-- ============================================
-- This function either inserts a new snapshot or updates an existing one
-- It automatically calculates the change percentage

CREATE OR REPLACE FUNCTION upsert_price_snapshot(
  p_card_id TEXT,
  p_source TEXT,
  p_condition TEXT,
  p_current_price DECIMAL
) RETURNS void AS $$
DECLARE
  v_previous_price DECIMAL;
  v_change_percent DECIMAL;
BEGIN
  -- Get the current price if a snapshot already exists
  SELECT current_price INTO v_previous_price
  FROM price_snapshots
  WHERE card_id = p_card_id 
    AND source = p_source 
    AND condition = p_condition;
  
  -- Calculate the percentage change
  IF v_previous_price IS NOT NULL AND v_previous_price > 0 THEN
    v_change_percent := ROUND(((p_current_price - v_previous_price) / v_previous_price * 100)::numeric, 2);
  ELSE
    v_previous_price := NULL;
    v_change_percent := 0;
  END IF;
  
  -- Insert new snapshot or update existing
  INSERT INTO price_snapshots (
    card_id, source, condition, current_price, 
    previous_price, change_percent, updated_at
  )
  VALUES (
    p_card_id, p_source, p_condition, p_current_price,
    v_previous_price,
    v_change_percent,
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


-- ============================================
-- STORED FUNCTION: Get Price History for Chart
-- ============================================
-- Returns price history aggregated by day for cleaner charts

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


-- ============================================
-- STORED FUNCTION: Get Top Movers
-- ============================================
-- Returns cards with biggest price changes

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


-- ============================================
-- STORED FUNCTION: Increment Fetch Count
-- ============================================
-- Increments the fetch_count for a tracked card
-- Used when we successfully fetch a price

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
