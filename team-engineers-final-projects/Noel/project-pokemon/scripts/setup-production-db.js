// scripts/setup-production-db.js
// Creates all required tables in production Supabase using REST API

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We'll create tables by inserting to the pg_tables system, but that's restricted
// Instead, we'll try a different approach using the REST API with raw SQL

async function executeSql(sql) {
  try {
    // Try using the Supabase REST API to execute raw SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Prefer': 'tx=commit'
      },
      body: JSON.stringify({ query: sql })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Alternative: Use the SQL Editor API
async function setupDatabase() {
  console.log('🚀 Setting up Production Supabase Database\n');
  console.log(`Project: ${supabaseUrl}\n`);
  
  // Since we can't execute raw SQL via REST without the exec_sql function,
  // let's provide the user with the SQL to run manually
  console.log('⚠️  Cannot execute SQL automatically via REST API.');
  console.log('   The exec_sql function does not exist yet.\n');
  console.log('📋 SQL to run in Supabase SQL Editor:\n');
  console.log('=' .repeat(60));
  console.log('Go to: https://app.supabase.com/project/jevltyioavvjxvjwmiwy/sql-editor');
  console.log('=' .repeat(60));
  console.log();
  
  // Print the SQL from CLOUD_MIGRATION.sql
  const fs = require('fs');
  const path = require('path');
  
  const migrationFile = path.join(__dirname, '../supabase/CLOUD_MIGRATION.sql');
  const sql = fs.readFileSync(migrationFile, 'utf-8');
  
  console.log(sql);
  
  console.log('\n' + '='.repeat(60));
  console.log('Instructions:');
  console.log('1. Copy the SQL above');
  console.log('2. Go to: https://app.supabase.com/project/jevltyioavvjxvjwmiwy/sql-editor');
  console.log('3. Click "New Query"');
  console.log('4. Paste the SQL');
  console.log('5. Click "Run"');
  console.log('='.repeat(60));
}

setupDatabase().catch(console.error);
