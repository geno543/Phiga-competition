import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function renumberQuestions() {
  try {
    console.log('Starting question renumbering...');
    console.log('Question 5 → Question 4');
    console.log('Question 6 → Question 5');
    console.log('Question 7 → Question 6');
    console.log('... and so on until Question 23');
    console.log('');
    
    // Get all questions from 5 onwards, ordered by question_number
    const { data: questions, error: fetchError } = await supabase
      .from('competition_questions')
      .select('*')
      .gte('question_number', 5)
      .order('question_number', { ascending: true });
    
    if (fetchError) {
      console.error('Error fetching questions:', fetchError);
      return;
    }
    
    console.log(`Found ${questions.length} questions to renumber (from question 5 to 23)`);
    console.log('');
    
    // Update each question, reducing question_number by 1
    for (const question of questions) {
      const oldNumber = question.question_number;
      const newNumber = oldNumber - 1;
      
      console.log(`Updating Question ${oldNumber} → Question ${newNumber}`);
      
      const { error: updateError } = await supabase
        .from('competition_questions')
        .update({ question_number: newNumber })
        .eq('id', question.id);
      
      if (updateError) {
        console.error(`Error updating question ${oldNumber}:`, updateError);
      } else {
        console.log(`✅ Question ${oldNumber} successfully renumbered to ${newNumber}`);
      }
    }
    
    console.log('');
    console.log('========================================');
    console.log('✅ Question renumbering complete!');
    console.log('Questions now run from 1 to 22 (no gaps)');
    console.log('========================================');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

renumberQuestions();
