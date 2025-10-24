import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixRLSPolicies() {
  console.log('🔧 Fixing RLS policies for competition system...');
  
  try {
    // Execute SQL to disable RLS and drop policies
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Disable RLS for competition tables
        ALTER TABLE competition_participants DISABLE ROW LEVEL SECURITY;
        ALTER TABLE competition_answers DISABLE ROW LEVEL SECURITY;
        ALTER TABLE competition_questions DISABLE ROW LEVEL SECURITY;
        ALTER TABLE competition_settings DISABLE ROW LEVEL SECURITY;

        -- Drop existing policies
        DROP POLICY IF EXISTS "Users can view their own data" ON competition_participants;
        DROP POLICY IF EXISTS "Users can update their own data" ON competition_participants;
        DROP POLICY IF EXISTS "Users can insert their answers" ON competition_answers;
        DROP POLICY IF EXISTS "Users can view their answers" ON competition_answers;
        DROP POLICY IF EXISTS "Anyone can view questions" ON competition_questions;
        DROP POLICY IF EXISTS "Anyone can view settings" ON competition_settings;
      `
    });

    if (error) {
      console.error('❌ Error executing SQL:', error);
      return;
    }

    console.log('✅ RLS policies fixed successfully!');
    console.log('📝 Changes made:');
    console.log('  - Disabled RLS on all competition tables');
    console.log('  - Removed auth-based policies');
    console.log('  - Competition now uses custom authentication');
    
  } catch (err) {
    console.error('💥 Failed to fix RLS policies:', err);
  }
}

// Run the fix
fixRLSPolicies();