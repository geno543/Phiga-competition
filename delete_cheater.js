import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteParticipant() {
  try {
    const displayNames = ['Kitianniaj', 'Mahabusubhani008'];
    
    for (const displayName of displayNames) {
      console.log(`\nSearching for participant with display name: ${displayName}...`);
      
      // Find the participant
      const { data: participant, error: findError } = await supabase
        .from('competition_participants')
        .select('*')
        .eq('display_name', displayName)
        .maybeSingle();
      
      if (findError || !participant) {
        console.log(`❌ Participant not found: ${displayName}`);
        continue;
      }
      
      console.log('Found participant:');
      console.log('  Display Name:', participant.display_name);
      console.log('  Email:', participant.email);
      console.log('  Score:', participant.total_score);
      console.log('  Current Question:', participant.current_question);
      
      // Delete their answers first (foreign key constraint)
      const { error: answersError } = await supabase
        .from('competition_answers')
        .delete()
        .eq('participant_id', participant.id);
      
      if (answersError) {
        console.error('Error deleting answers:', answersError);
        continue;
      }
      
      console.log('✅ Deleted participant answers');
      
      // Delete the participant
      const { error: deleteError } = await supabase
        .from('competition_participants')
        .delete()
        .eq('id', participant.id);
      
      if (deleteError) {
        console.error('Error deleting participant:', deleteError);
        continue;
      }
      
      console.log(`✅ Successfully deleted participant: ${displayName}`);
    }
    
    console.log('\n========================================');
    console.log('Deletion complete. Reason: Cheating (غش)');
    console.log('========================================');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

deleteParticipant();
