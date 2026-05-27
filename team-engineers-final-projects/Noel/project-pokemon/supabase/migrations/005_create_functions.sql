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
