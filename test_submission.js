import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials from client.ts
const supabaseUrl = 'https://spycctmatdfqpyuhriyc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweWNjdG1hdGRmcXB5dWhyaXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTU3NDAsImV4cCI6MjA3MDA3MTc0MH0.ZtkPJtPIv8uYvhG0hEaUoToCEzrwBcNBXk_B_yvtkrM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSubmission() {
  try {
    console.log('Testing database connection and submission functionality...\n');
    
    // Test 1: Check if competition_answers table is accessible
    console.log('Test 1: Checking competition_answers table access...');
    const { data: answersTest, error: answersError } = await supabase
      .from('competition_answers')
      .select('id')
      .limit(1);
    
    if (answersError) {
      console.error('❌ Cannot access competition_answers table:', answersError.message);
      return;
    }
    console.log('✅ competition_answers table is accessible\n');
    
    // Test 2: Check if competition_participants table is accessible
    console.log('Test 2: Checking competition_participants table access...');
    const { data: participantsTest, error: participantsError } = await supabase
      .from('competition_participants')
      .select('id, email, total_score, current_question')
      .limit(1);
    
    if (participantsError) {
      console.error('❌ Cannot access competition_participants table:', participantsError.message);
      return;
    }
    console.log('✅ competition_participants table is accessible\n');
    
    // Test 3: Check if competition_questions table is accessible
    console.log('Test 3: Checking competition_questions table access...');
    const { data: questionsTest, error: questionsError } = await supabase
      .from('competition_questions')
      .select('id, question_number, correct_answer')
      .limit(1);
    
    if (questionsError) {
      console.error('❌ Cannot access competition_questions table:', questionsError.message);
      return;
    }
    console.log('✅ competition_questions table is accessible\n');
    
    // Test 4: Get a sample participant
    console.log('Test 4: Getting sample participant...');
    const { data: sampleParticipant, error: sampleError } = await supabase
      .from('competition_participants')
      .select('*')
      .limit(1)
      .single();
    
    if (sampleError || !sampleParticipant) {
      console.error('❌ Cannot get sample participant:', sampleError?.message);
      return;
    }
    console.log('✅ Sample participant found:', sampleParticipant.email);
    console.log('   - Current question:', sampleParticipant.current_question);
    console.log('   - Total score:', sampleParticipant.total_score);
    console.log('   - Questions skipped:', sampleParticipant.questions_skipped);
    console.log();
    
    // Test 5: Check permissions for INSERT on competition_answers
    console.log('Test 5: Testing INSERT permission on competition_answers...');
    console.log('   (This will do a test insert and then delete it)');
    
    const testAnswer = {
      participant_id: sampleParticipant.id,
      question_id: questionsTest[0].id,
      attempt_number: 99, // Test marker
      points_earned: 0,
      is_correct: false,
      is_skipped: false
    };
    
    const { data: insertedAnswer, error: insertError } = await supabase
      .from('competition_answers')
      .insert(testAnswer)
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Cannot INSERT into competition_answers:', insertError.message);
      console.error('   Error code:', insertError.code);
      console.error('   This is likely the cause of "Failed to submit answer"');
      return;
    }
    
    console.log('✅ INSERT permission works on competition_answers\n');
    
    // Clean up test insert
    if (insertedAnswer) {
      await supabase
        .from('competition_answers')
        .delete()
        .eq('id', insertedAnswer.id);
      console.log('✅ Test data cleaned up\n');
    }
    
    // Test 6: Check permissions for UPDATE on competition_participants
    console.log('Test 6: Testing UPDATE permission on competition_participants...');
    const { error: updateError } = await supabase
      .from('competition_participants')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', sampleParticipant.id);
    
    if (updateError) {
      console.error('❌ Cannot UPDATE competition_participants:', updateError.message);
      console.error('   Error code:', updateError.code);
      return;
    }
    console.log('✅ UPDATE permission works on competition_participants\n');
    
    console.log('========================================');
    console.log('✅ ALL TESTS PASSED!');
    console.log('========================================');
    console.log('Submission functionality should work correctly.');
    console.log('If users still see errors, check browser console for specific error messages.');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testSubmission();
