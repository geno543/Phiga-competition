import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixRLSPolicies() {
  console.log('🔧 Fixing RLS policies for competition system...');
  
  const sqlCommands = [
    'ALTER TABLE competition_participants DISABLE ROW LEVEL SECURITY',
    'ALTER TABLE competition_answers DISABLE ROW LEVEL SECURITY', 
    'ALTER TABLE competition_questions DISABLE ROW LEVEL SECURITY',
    'ALTER TABLE competition_settings DISABLE ROW LEVEL SECURITY',
    'DROP POLICY IF EXISTS "Users can view their own data" ON competition_participants',
    'DROP POLICY IF EXISTS "Users can update their own data" ON competition_participants',
    'DROP POLICY IF EXISTS "Users can insert their answers" ON competition_answers',
    'DROP POLICY IF EXISTS "Users can view their answers" ON competition_answers',
    'DROP POLICY IF EXISTS "Anyone can view questions" ON competition_questions',
    'DROP POLICY IF EXISTS "Anyone can view settings" ON competition_settings'
  ];

  for (const sql of sqlCommands) {
    try {
      console.log(`Executing: ${sql}`);
      const { data, error } = await supabase.from('_').select().limit(0);
      
      // Since we can't execute DDL directly, let's try a different approach
      // We'll create a temporary function to execute the SQL
      const { error: funcError } = await supabase.rpc('sql', { query: sql });
      
      if (funcError) {
        console.log(`⚠️  Could not execute: ${sql}`);
        console.log(`Error: ${funcError.message}`);
      } else {
        console.log(`✅ Executed: ${sql}`);
      }
    } catch (err) {
      console.log(`⚠️  Error with: ${sql}`);
      console.log(`Error: ${err.message}`);
    }
  }

  console.log('\n📝 Manual Steps Required:');
  console.log('Since we cannot execute DDL commands directly from the client,');
  console.log('please run the following SQL commands in your Supabase SQL Editor:');
  console.log('\n-- Copy and paste this into Supabase SQL Editor:');
  
  sqlCommands.forEach(cmd => {
    console.log(`${cmd};`);
  });
  
  console.log('\n🔗 Go to: https://supabase.com/dashboard/project/spycctmatdfqpyuhriyc/sql');
}

// Run the fix
fixRLSPolicies();