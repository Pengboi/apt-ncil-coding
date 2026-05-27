// scripts/apply-migrations.ts
// Applies all SQL migrations to your remote Supabase database
// Run this with: npx ts-node scripts/apply-migrations.ts

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Get credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Make sure you have:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY (preferred) or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration(filePath: string): Promise<boolean> {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Applying: ${fileName}`);
  
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    
    // Execute the SQL using Supabase's rpc or raw query
    // Note: We need to use the pg-meta endpoint or execute sql directly
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      // If exec_sql doesn't exist, try a different approach
      console.log(`   Trying alternative method...`);
      
      // Try running SQL through the REST API (requires service role)
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ query: sql }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
    }
    
    console.log(`   ✅ Success!`);
    return true;
    
  } catch (error) {
    console.error(`   ❌ Failed:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Applying Supabase Migrations\n');
  console.log(`URL: ${supabaseUrl}`);
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
  files.forEach(f => console.log(`  - ${f}`));
  console.log('');
  
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const result = await applyMigration(filePath);
    
    if (result) {
      success++;
    } else {
      failed++;
      console.log('\n⚠️  Stopping due to error. Fix the issue and re-run.');
      process.exit(1);
    }
  }
  
  console.log(`\n✅ All migrations applied successfully!`);
  console.log(`   Applied: ${success}`);
  console.log(`   Failed:  ${failed}`);
}

main().catch(console.error);
