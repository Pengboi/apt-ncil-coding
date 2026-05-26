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
