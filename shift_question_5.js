import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function shiftQuestion5() {
  try {
    console.log('Shifting question 5 to connect with question 3...\n');
    
    // Get current question 5 data
    const { data: q5Before, error: fetchError } = await supabase
      .from('competition_questions')
      .select('*')
      .eq('question_number', 5)
      .single();
    
    if (fetchError) {
      console.error('Error fetching question 5:', fetchError);
      return;
    }
    
    console.log('Question 5 BEFORE:');
    console.log('  video_timestamp:', q5Before.video_timestamp);
    console.log('  scene_start_time:', q5Before.scene_start_time);
    console.log('  scene_end_time:', q5Before.scene_end_time);
    
    // Calculate the shift amount
    const oldStart = q5Before.video_timestamp;
    const newStart = 1663; // Where question 3 ends
    const shift = newStart - oldStart;
    
    // Calculate new end time (maintaining the same duration)
    const duration = q5Before.scene_end_time - q5Before.scene_start_time;
    const newEnd = newStart + duration;
    
    console.log('\nShift amount:', shift, 'seconds');
    console.log('Scene duration:', duration, 'seconds');
    
    // Update question 5 with new timestamps
    const { data, error } = await supabase
      .from('competition_questions')
      .update({
        video_timestamp: newStart,
        scene_start_time: newStart,
        scene_end_time: newEnd
      })
      .eq('question_number', 5)
      .select();
    
    if (error) {
      console.error('Error updating question 5:', error);
      return;
    }
    
    console.log('\n✅ Successfully shifted question 5!');
    console.log('\nQuestion 5 AFTER:');
    console.log('  video_timestamp:', newStart);
    console.log('  scene_start_time:', newStart);
    console.log('  scene_end_time:', newEnd);
    console.log('\nQuestion 3 now connects directly to Question 5!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

shiftQuestion5();
