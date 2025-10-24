import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkQuestions() {
  try {
    // Get question 3
    const { data: q3, error: e3 } = await supabase
      .from('competition_questions')
      .select('*')
      .eq('question_number', 3)
      .single();
    
    if (e3) console.error('Error fetching question 3:', e3);
    
    // Get question 5
    const { data: q5, error: e5 } = await supabase
      .from('competition_questions')
      .select('*')
      .eq('question_number', 5)
      .single();
    
    if (e5) console.error('Error fetching question 5:', e5);
    
    console.log('Question 3:');
    console.log('  question_number:', q3?.question_number);
    console.log('  video_timestamp:', q3?.video_timestamp);
    console.log('  scene_start_time:', q3?.scene_start_time);
    console.log('  scene_end_time:', q3?.scene_end_time);
    console.log('  question_text:', q3?.question_text);
    
    console.log('\nQuestion 5:');
    console.log('  question_number:', q5?.question_number);
    console.log('  video_timestamp:', q5?.video_timestamp);
    console.log('  scene_start_time:', q5?.scene_start_time);
    console.log('  scene_end_time:', q5?.scene_end_time);
    console.log('  question_text:', q5?.question_text);
    
    console.log('\n--- Proposed Change ---');
    console.log('Move question 5 timestamp from', q5?.video_timestamp, 'to', q3?.scene_end_time);
    console.log('This will connect question 3 ending directly to question 5 start');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkQuestions();
