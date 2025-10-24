import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceResetAllParticipants() {
  try {
    console.log('Fetching all participants...');
    
    // Get all participants
    const { data: participants, error: fetchError } = await supabase
      .from('competition_participants')
      .select('id, email, current_question, total_score');
    
    if (fetchError) {
      console.error('Error fetching participants:', fetchError);
      return;
    }
    
    console.log(`Found ${participants?.length || 0} participants`);
    
    if (!participants || participants.length === 0) {
      console.log('No participants to reset');
      return;
    }
    
    // Show participants who are NOT at question 1
    const notAtStart = participants.filter(p => p.current_question !== 1);
    console.log(`\nParticipants NOT at question 1: ${notAtStart.length}`);
    if (notAtStart.length > 0) {
      console.log('Sample of participants to reset:');
      notAtStart.slice(0, 10).forEach(p => {
        console.log(`  - ${p.email}: Question ${p.current_question}, Score ${p.total_score}`);
      });
    }
    
    console.log('\nForce resetting ALL participants individually...');
    
    let successCount = 0;
    let errorCount = 0;
    
    // Reset each participant individually
    for (const participant of participants) {
      const { error } = await supabase
        .from('competition_participants')
        .update({
          total_score: 0,
          current_question: 1,
          questions_skipped: 0,
          last_activity: new Date().toISOString()
        })
        .eq('id', participant.id);
      
      if (error) {
        console.error(`Error resetting ${participant.email}:`, error);
        errorCount++;
      } else {
        successCount++;
      }
    }
    
    console.log('\n✅ Force reset completed!');
    console.log(`Successfully reset: ${successCount} participants`);
    if (errorCount > 0) {
      console.log(`Failed to reset: ${errorCount} participants`);
    }
    
    // Verify the reset
    console.log('\nVerifying reset...');
    const { data: verifyData } = await supabase
      .from('competition_participants')
      .select('current_question, total_score, questions_skipped')
      .neq('current_question', 1);
    
    if (verifyData && verifyData.length > 0) {
      console.log(`⚠️ Warning: ${verifyData.length} participants still not at question 1`);
    } else {
      console.log('✅ All participants are now at question 1!');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

forceResetAllParticipants();
