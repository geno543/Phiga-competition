import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetAllParticipants() {
  try {
    console.log('Fetching all participants...');
    
    // Get all participants
    const { data: participants, error: fetchError } = await supabase
      .from('competition_participants')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching participants:', fetchError);
      return;
    }
    
    console.log(`Found ${participants?.length || 0} participants`);
    
    if (!participants || participants.length === 0) {
      console.log('No participants to reset');
      return;
    }
    
    console.log('\nResetting all participants...');
    
    // Reset all participants to initial state
    const { data, error } = await supabase
      .from('competition_participants')
      .update({
        total_score: 0,
        current_question: 1,
        questions_skipped: 0,
        last_activity: new Date().toISOString()
      })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all (dummy condition)
    
    if (error) {
      console.error('Error resetting participants:', error);
      return;
    }
    
    console.log('\n✅ Successfully reset all participants!');
    console.log(`Total participants reset: ${participants.length}`);
    console.log('\nAll participants now have:');
    console.log('  - total_score: 0');
    console.log('  - current_question: 1');
    console.log('  - questions_skipped: 0');
    console.log('  - last_activity: updated to now');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

resetAllParticipants();
