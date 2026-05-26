-- Run this in Supabase SQL Editor to grant anon access to stored functions
-- This fixes PGRST301 JWT errors when calling supabase.rpc() from the anon key

GRANT EXECUTE ON FUNCTION get_top_movers TO anon;
GRANT EXECUTE ON FUNCTION upsert_price_snapshot TO anon;
GRANT EXECUTE ON FUNCTION get_price_history_chart TO anon;
GRANT EXECUTE ON FUNCTION increment_fetch_count TO anon;
