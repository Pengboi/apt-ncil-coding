import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log('URL:', supabaseUrl);
  
  try {
    // Test auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Auth check:', authError ? 'Not authenticated' : 'Authenticated');
    
    // Test database by checking if tables exist
    const { data: cards, error: cardsError } = await supabase
      .from('cards')
      .select('*')
      .limit(1);
    
    if (cardsError) {
      console.error('Cards table error:', cardsError.message);
      console.log('You may need to run the migration SQL in Supabase Dashboard');
    } else {
      console.log('Cards table exists!');
      console.log('Sample data:', cards);
    }
    
    // Test price_history
    const { data: prices, error: pricesError } = await supabase
      .from('price_history')
      .select('*')
      .limit(1);
    
    if (pricesError) {
      console.error('Price history table error:', pricesError.message);
    } else {
      console.log('Price history table exists!');
    }
    
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection();
