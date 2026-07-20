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
