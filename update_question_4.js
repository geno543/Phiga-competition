import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteQuestion4() {
  try {
    console.log('Fetching current question 4 data...');
    
    // First, get the current question 4
    const { data: currentData, error: fetchError } = await supabase
      .from('competition_questions')
      .select('*')
      .eq('question_number', 4)
      .single();
    
    if (fetchError) {
      console.error('Error fetching question 4:', fetchError);
      return;
    }
    
    console.log('Current Question 4:', currentData);
    console.log('\nDeleting Question 4...');
    
    // Delete question 4
    const { error: deleteError } = await supabase
      .from('competition_questions')
      .delete()
      .eq('question_number', 4);
    
    if (deleteError) {
      console.error('Error deleting question 4:', deleteError);
      return;
    }
    
    console.log('\n✅ Successfully deleted Question 4!');
    
    // Get total questions count
    const { data: questions, error: countError } = await supabase
      .from('competition_questions')
      .select('question_number')
      .order('question_number');
    
    if (!countError && questions) {
      console.log(`\nTotal questions remaining: ${questions.length}`);
      console.log('Question numbers:', questions.map(q => q.question_number).join(', '));
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

deleteQuestion4();
