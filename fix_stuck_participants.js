import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixStuckParticipants() {
  try {
    console.log('Finding participants not at question 1...');
    
    const { data: stuck, error } = await supabase
      .from('competition_participants')
      .select('*')
      .neq('current_question', 1);
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`Found ${stuck?.length || 0} stuck participants`);
    
    if (stuck && stuck.length > 0) {
      console.log('\nStuck participants:');
      stuck.forEach(p => {
        console.log(`  - ${p.email}: Question ${p.current_question}, Score ${p.total_score}`);
      });
      
      console.log('\nForce resetting stuck participants...');
      
      for (const participant of stuck) {
        // Delete and re-insert to force refresh
        const { error: updateError } = await supabase
          .from('competition_participants')
          .update({
            total_score: 0,
            current_question: 1,
            questions_skipped: 0,
            last_activity: new Date().toISOString()
          })
          .eq('email', participant.email);
        
        if (updateError) {
          console.error(`Error updating ${participant.email}:`, updateError);
        } else {
          console.log(`✅ Reset ${participant.email}`);
        }
      }
      
      // Final verification
      const { data: finalCheck } = await supabase
        .from('competition_participants')
        .select('email, current_question, total_score')
        .neq('current_question', 1);
      
      console.log('\n--- Final Verification ---');
      if (finalCheck && finalCheck.length > 0) {
        console.log(`⚠️ Still stuck: ${finalCheck.length}`);
        finalCheck.forEach(p => {
          console.log(`  ${p.email}: Q${p.current_question}`);
        });
      } else {
        console.log('✅ ALL participants now at question 1!');
      }
    } else {
      console.log('✅ All participants already at question 1!');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

fixStuckParticipants();
