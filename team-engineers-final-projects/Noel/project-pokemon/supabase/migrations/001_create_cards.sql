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
