# 🎯 Pokemon Price Tracking & Stock Market Plan

## Overview
A two-stage project to build a Pokemon card price tracking system that evolves into a simulated "Pokemon Stock Market" where users can practice trading with virtual currency.

---

## 📊 Stage 1: Price Tracking System

### 1.1 Database Schema (SQLite/PostgreSQL)

```sql
-- Cards table (cache TCG card data)
CREATE TABLE cards (
  id TEXT PRIMARY KEY,           -- TCG card ID (e.g., "base1-4")
  name TEXT NOT NULL,
  set_id TEXT NOT NULL,
  set_name TEXT,
  rarity TEXT,
  image_url TEXT,
  pokemon_name TEXT,             -- For linking to PokeAPI
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price history table (the core tracking data)
CREATE TABLE price_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id TEXT NOT NULL,
  price_gbp REAL NOT NULL,
  price_usd REAL,
  price_eur REAL,
  source TEXT NOT NULL,          -- 'tcgplayer', 'cardmarket', 'ebay_avg', 'pokemonpricetracker'
  condition TEXT DEFAULT 'raw',  -- 'raw', 'psa9', 'psa10', etc.
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id),
  UNIQUE(card_id, source, condition, fetched_at)  -- Prevent duplicates
);

-- Price snapshots (latest price per card/source for quick lookup)
CREATE TABLE price_snapshots (
  card_id TEXT NOT NULL,
  source TEXT NOT NULL,
  condition TEXT DEFAULT 'raw',
  current_price REAL NOT NULL,
  previous_price REAL,
  change_percent REAL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (card_id, source, condition),
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

-- Index for fast time-series queries
CREATE INDEX idx_price_history_card_time 
  ON price_history(card_id, source, fetched_at DESC);
```

### 1.2 Data Collection Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Price Fetcher  │────▶│  Rate Limiter    │────▶│  External APIs  │
│  (Node.js)      │     │  (p-limit)       │     │  TCGdex, etc.   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│  SQLite/Postgre │
│  Price History  │
└─────────────────┘
```

**Components:**

| Component | Purpose | Frequency |
|-----------|---------|-----------|
| `fetch-daily-prices.ts` | Bulk fetch all tracked cards | Daily at 2 AM |
| `fetch-hot-cards.ts` | Fetch trending/volatile cards | Every 2 hours |
| `fetch-new-cards.ts` | Discover new set releases | Weekly |
| `cleanup-old-data.ts` | Archive old data, keep aggregates | Monthly |

### 1.3 API Endpoints

```typescript
// Price History
GET /api/prices/history?cardId=base1-4&days=30&source=tcgplayer
// Returns: { prices: [{ date, price_gbp, price_usd, source }] }

// Price Trends (calculated)
GET /api/prices/trends?cardId=base1-4
// Returns: { 
//   day: { change: -2.5, high: 45.00, low: 42.00 },
//   week: { change: 15.3, high: 50.00, low: 40.00 },
//   month: { change: 45.0, high: 55.00, low: 35.00 }
// }

// Bulk Prices (for portfolio)
POST /api/prices/bulk
// Body: { cardIds: ["base1-4", "base1-6"] }
// Returns: { "base1-4": { current: 42.50, change_24h: -2.5 }, ... }

// Top Movers
GET /api/prices/movers?timeframe=24h&limit=20
// Returns: { gainers: [...], losers: [...] }

// Compare Sources
GET /api/prices/compare?cardId=base1-4
// Returns: { tcgplayer: 42.50, cardmarket: 38.20, ebay_avg: 45.00 }
```

### 1.4 Frontend Features

```
┌─────────────────────────────────────────────────────────────┐
│  📈 Price History Page (per card)                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Price Chart (7d / 30d / 90d / 1y)           │   │
│  │    📉 Line graph with multiple sources overlay      │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  Current     │ │  24h Change  │ │  30d Change  │       │
│  │  £42.50      │ │  🔺 +5.2%    │ │  🔻 -12.3%   │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Price Comparison Table (across sources)            │   │
│  │  TCGPlayer: £42.50 | CardMarket: £38.20 | eBay: £45 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  📊 Market Overview Page                                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  🔥 Top Gainers  │  │  ❄️ Top Losers   │                │
│  │  Last 24 hours   │  │  Last 24 hours   │                │
│  └──────────────────┘  └──────────────────┘                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Trending Cards (most viewed/searched)              │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Market Movers Heatmap                              │   │
│  │  [Visual grid showing price movements by set]       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 1.5 Tech Stack Additions

| Component | Library/Tool | Purpose |
|-----------|--------------|---------|
| Database | `better-sqlite3` or `prisma` | Data persistence |
| Charts | `recharts` or `chart.js` | Price history visualization |
| Cron Jobs | `node-cron` or Vercel Cron | Scheduled price fetching |
| Date Utils | `date-fns` | Time calculations |

---

## 🏦 Stage 2: Pokemon Stock Market

### 2.1 Virtual Trading System

```sql
-- Users table (for the stock market)
CREATE TABLE traders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  virtual_balance_gbp REAL DEFAULT 10000.00,  -- Start with £10k
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Portfolio holdings
CREATE TABLE portfolio_holdings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trader_id INTEGER NOT NULL,
  card_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 0,
  avg_buy_price REAL,
  FOREIGN KEY (trader_id) REFERENCES traders(id),
  FOREIGN KEY (card_id) REFERENCES cards(id),
  UNIQUE(trader_id, card_id)
);

-- Transaction history
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trader_id INTEGER NOT NULL,
  card_id TEXT NOT NULL,
  type TEXT NOT NULL,           -- 'buy' or 'sell'
  quantity INTEGER NOT NULL,
  price_per_card REAL NOT NULL, -- Price at time of transaction
  total_value REAL NOT NULL,
  transaction_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trader_id) REFERENCES traders(id),
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

-- Watchlist
CREATE TABLE watchlists (
  trader_id INTEGER NOT NULL,
  card_id TEXT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  alert_above REAL,             -- Optional price alert
  alert_below REAL,
  PRIMARY KEY (trader_id, card_id),
  FOREIGN KEY (trader_id) REFERENCES traders(id),
  FOREIGN KEY (card_id) REFERENCES cards(id)
);
```

### 2.2 Trading API

```typescript
// Portfolio
GET /api/portfolio
// Returns current holdings with live P&L

// Buy/Sell
POST /api/trade
// Body: { cardId: "base1-4", type: "buy", quantity: 2 }
// Uses current market price from price_snapshots

// Transaction History
GET /api/transactions?page=1&limit=50

// Leaderboard
GET /api/leaderboard?timeframe=all_time
// Returns top traders by portfolio value
```

### 2.3 Game Mechanics

| Feature | Description |
|---------|-------------|
| **Starting Balance** | £10,000 virtual currency |
| **Price Source** | Real-time from your tracked prices |
| **Trading Hours** | 24/7 (crypto-style, since cards trade globally) |
| **Fees** | 2% transaction fee (simulates real market) |
| **Achievements** | "First Purchase", "Portfolio Diversifier", "Market Timer" |
| **Challenges** | Weekly trading competitions |

### 2.4 Portfolio Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  💼 My Portfolio                                            │
├─────────────────────────────────────────────────────────────┤
│  Balance: £2,450.00  |  Holdings Value: £8,920.00           │
│  Total P&L: +£1,370.00 (+15.7%) 🔺                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Portfolio Distribution (Pie Chart)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Holdings Table                                     │   │
│  │  Card | Qty | Avg Buy | Current | P&L | % of Port   │   │
│  │  Charizard | 3 | £320 | £450 | +£390 | 15%          │   │
│  │  Pikachu   | 10| £15  | £12  | -£30  | 1.3%        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗓️ Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Set up database schema
- [ ] Create price fetcher script
- [ ] Build price history API endpoints
- [ ] Create basic price history chart component

### Phase 2: Tracking UI (Week 2)
- [ ] Card detail page with price history
- [ ] Market overview page (top movers)
- [ ] Watchlist functionality
- [ ] Price alerts (email/browser notifications)

### Phase 3: User System (Week 3)
- [ ] Trader accounts (simple auth)
- [ ] Portfolio tracking
- [ ] Transaction history

### Phase 4: Trading (Week 4)
- [ ] Buy/sell mechanics
- [ ] Virtual balance management
- [ ] Leaderboard
- [ ] Achievement system

---

## 💡 Key Design Decisions

### Why SQLite for Stage 1?
- Zero configuration
- Easy to migrate to PostgreSQL later
- Perfect for development/small scale
- Single file = easy backups

### Price Update Strategy
- **Bulk cards**: Once daily (2 AM)
- **Popular cards**: Every 2 hours
- **On-demand**: When user views card (cache for 1 hour)

### Handling API Rate Limits
- TCGdex: ~100 req/min (generous)
- Use exponential backoff
- Queue system for bulk updates

---

## 🚀 Future Enhancements

1. **ML Price Predictions** - Predict price movements
2. **Card Grading Integration** - PSA/BGS price premiums
3. **Social Features** - Follow other traders, copy trading
4. **Real Money Integration** - Track real portfolio (view-only)
5. **Mobile App** - React Native companion
