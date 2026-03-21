-- ============================================
-- Pokemon Price Tracking & Trading Schema
-- ============================================

-- Cards table (cache TCG card data)
CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  set_id TEXT NOT NULL,
  set_name TEXT,
  rarity TEXT,
  image_url TEXT,
  pokemon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Price history table
CREATE TABLE price_history (
  id SERIAL PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  price_gbp REAL NOT NULL,
  price_usd REAL,
  price_eur REAL,
  source TEXT NOT NULL,
  condition TEXT DEFAULT 'raw',
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Latest price snapshot (for fast lookups)
CREATE TABLE price_snapshots (
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  condition TEXT DEFAULT 'raw',
  current_price REAL NOT NULL,
  previous_price REAL,
  change_percent REAL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (card_id, source, condition)
);

-- Traders table (for stock market)
CREATE TABLE traders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  virtual_balance_gbp REAL DEFAULT 10000.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Portfolio holdings
CREATE TABLE portfolio_holdings (
  id SERIAL PRIMARY KEY,
  trader_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  avg_buy_price REAL,
  UNIQUE(trader_id, card_id)
);

-- Transaction history
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  trader_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
  quantity INTEGER NOT NULL,
  price_per_card REAL NOT NULL,
  total_value REAL NOT NULL,
  transaction_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Watchlist
CREATE TABLE watchlists (
  trader_id UUID NOT NULL REFERENCES traders(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  alert_above REAL,
  alert_below REAL,
  PRIMARY KEY (trader_id, card_id)
);

-- Indexes for performance
CREATE INDEX idx_price_history_card_time ON price_history(card_id, source, fetched_at DESC);
CREATE INDEX idx_price_history_fetched ON price_history(fetched_at DESC);
CREATE INDEX idx_transactions_trader ON transactions(trader_id, transaction_at DESC);
CREATE INDEX idx_portfolio_trader ON portfolio_holdings(trader_id);

-- Row Level Security (RLS) policies
ALTER TABLE traders ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

-- Traders can only see their own data
CREATE POLICY "Users can view own trader profile"
  ON traders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own trader profile"
  ON traders FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trader profile"
  ON traders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Portfolio policies
CREATE POLICY "Users can view own portfolio"
  ON portfolio_holdings FOR SELECT 
  USING (trader_id IN (SELECT id FROM traders WHERE user_id = auth.uid()));

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT 
  USING (trader_id IN (SELECT id FROM traders WHERE user_id = auth.uid()));

-- Watchlist policies
CREATE POLICY "Users can manage own watchlist"
  ON watchlists FOR ALL 
  USING (trader_id IN (SELECT id FROM traders WHERE user_id = auth.uid()));

-- Function to update price snapshot
CREATE OR REPLACE FUNCTION upsert_price_snapshot(
  p_card_id TEXT,
  p_source TEXT,
  p_condition TEXT,
  p_current_price REAL
)
RETURNS VOID AS $$
DECLARE
  v_previous_price REAL;
BEGIN
  -- Get previous price for change calculation
  SELECT current_price INTO v_previous_price
  FROM price_snapshots
  WHERE card_id = p_card_id AND source = p_source AND condition = p_condition;

  -- Insert or update snapshot
  INSERT INTO price_snapshots (
    card_id, source, condition, current_price, previous_price, change_percent, updated_at
  )
  VALUES (
    p_card_id, p_source, p_condition, p_current_price, v_previous_price,
    CASE 
      WHEN v_previous_price IS NULL OR v_previous_price = 0 THEN 0
      ELSE ROUND(((p_current_price - v_previous_price) / v_previous_price * 100)::numeric, 2)
    END,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT (card_id, source, condition)
  DO UPDATE SET
    current_price = EXCLUDED.current_price,
    previous_price = EXCLUDED.previous_price,
    change_percent = EXCLUDED.change_percent,
    updated_at = EXCLUDED.updated_at;
END;
$$ LANGUAGE plpgsql;
