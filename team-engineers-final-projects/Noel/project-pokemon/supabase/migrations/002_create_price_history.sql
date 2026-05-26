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
