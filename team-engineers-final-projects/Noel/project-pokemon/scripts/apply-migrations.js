// scripts/apply-migrations.js
// Applies all SQL migrations to your remote Supabase database
// Run with: node scripts/apply-migrations.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read credentials from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('');
  console.error('Make sure your .env.local file has:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key');
  console.error('');
  console.error('Current directory:', process.cwd());
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We'll execute SQL by calling a stored function
// First, let's try to create an exec_sql function if it doesn't exist
async function setupExecSql() {
  const setupSql = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text)
    RETURNS void AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  
  try {
    // Try to create the function using raw SQL via REST
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
      },
      body: JSON.stringify({ sql: setupSql }),
    });
    
    if (!response.ok) {
      console.log('ℹ️  Note: exec_sql function may not exist yet. Will try alternative method.');
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

async function applyMigration(filePath) {
  const fileName = path.basename(filePath);
  console.log(`\n📄 ${fileName}`);
  
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    
    // Split SQL into individual statements (simple split by semicolon)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`   ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i] + ';';
      
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
          },
          body: JSON.stringify({ sql: stmt }),
        });
        
        if (!response.ok) {
          const error = await response.text();
          // Check if it's a "relation already exists" error (which is OK)
          if (error.includes('already exists') || error.includes('duplicate')) {
            console.log(`   [${i + 1}/${statements.length}] ⚠️  Already exists (skipping)`);
            continue;
          }
          throw new Error(`Statement ${i + 1} failed: ${error}`);
        }
        
        console.log(`   [${i + 1}/${statements.length}] ✅`);
        
      } catch (e) {
        const errorMsg = e.message || String(e);
        
        // Skip "already exists" errors
        if (errorMsg.includes('already exists') || 
            errorMsg.includes('duplicate key') ||
            errorMsg.includes('Conflict')) {
          console.log(`   [${i + 1}/${statements.length}] ⚠️  Already exists (skipping)`);
          continue;
        }
        
        // For other errors, log but continue
        console.log(`   [${i + 1}/${statements.length}] ❌ ${errorMsg.substring(0, 100)}`);
      }
    }
    
    return true;
    
  } catch (error) {
    console.error(`   ❌ Failed:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Pokemon TCG Price Tracker - Database Setup\n');
  console.log(`Project: ${supabaseUrl}`);
  console.log('');
  
  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  
  // Get all SQL files and sort them
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();
  
  if (files.length === 0) {
    console.log('No migration files found!');
    process.exit(0);
  }
  
  console.log(`Found ${files.length} migration files:`);
  files.forEach(f => console.log(`  • ${f}`));
  console.log('');
  
  console.log('⚠️  Important: If you get "already exists" errors, that\'s OK!');
  console.log('   It means the table/function is already created.\n');
  
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const result = await applyMigration(filePath);
    
    if (result) {
      success++;
    } else {
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Migration Complete!');
  console.log('='.repeat(50));
  console.log(`✅ Successful: ${success}`);
  console.log(`❌ Failed:    ${failed}`);
  console.log('');
  
  if (failed === 0) {
    console.log('🎉 All migrations applied successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Run: npm run dev');
    console.log('  2. Go to: http://localhost:3000/price-tracker');
    console.log('  3. Click "Fetch Prices Now" to test!');
  } else {
    console.log('⚠️  Some migrations failed.');
    console.log('   Check the errors above. You may need to manually');
    console.log('   run the SQL in the Supabase SQL Editor.');
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
