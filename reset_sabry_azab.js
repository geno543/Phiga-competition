// Script to reset Sabry Azab's competition progress
// Run with: node reset_sabry_azab.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetSabryAzabProgress() {
  try {
    console.log('🔍 Searching for Sabry Azab...');
    
    // Find Sabry Azab's participant record
    const { data: participants, error: searchError } = await supabase
      .from('competition_participants')
      .select('*')
      .or('original_name.ilike.%sabry%azab%,original_name.ilike.%azab%sabry%,display_name.ilike.%sabry%azab%,display_name.ilike.%azab%sabry%');

    if (searchError) {
      console.error('❌ Error searching for participant:', searchError);
      return;
    }

    if (!participants || participants.length === 0) {
      console.log('❌ No participant found with name containing "Sabry Azab"');
      return;
    }

    if (participants.length > 1) {
      console.log('⚠️ Multiple participants found:');
      participants.forEach((p, index) => {
        console.log(`${index + 1}. ${p.participant_name} (ID: ${p.id})`);
      });
      console.log('Please specify which participant to reset manually.');
      return;
    }

    const participant = participants[0];
    console.log(`✅ Found participant: ${participant.display_name || participant.original_name} (ID: ${participant.id})`);
    console.log(`Current progress: Score: ${participant.total_score}, Question: ${participant.current_question}, Skipped: ${participant.questions_skipped}`);

    // Reset participant progress
    console.log('🔄 Resetting participant progress...');
    const { error: updateError } = await supabase
      .from('competition_participants')
      .update({
        total_score: 0,
        questions_skipped: 0,
        current_question: 1,
        last_activity: new Date().toISOString()
      })
      .eq('id', participant.id);

    if (updateError) {
      console.error('❌ Error updating participant:', updateError);
      return;
    }

    // Delete all previous answers
    console.log('🗑️ Deleting previous answers...');
    const { error: deleteError } = await supabase
      .from('competition_answers')
      .delete()
      .eq('participant_id', participant.id);

    if (deleteError) {
      console.error('❌ Error deleting answers:', deleteError);
      return;
    }

    // Verify the reset
    console.log('✅ Verifying reset...');
    const { data: updatedParticipant, error: verifyError } = await supabase
      .from('competition_participants')
      .select('*')
      .eq('id', participant.id)
      .single();

    if (verifyError) {
      console.error('❌ Error verifying reset:', verifyError);
      return;
    }

    console.log('🎉 Successfully reset Sabry Azab\'s progress!');
    console.log(`New progress: Score: ${updatedParticipant.total_score}, Question: ${updatedParticipant.current_question}, Skipped: ${updatedParticipant.questions_skipped}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the reset function
resetSabryAzabProgress();