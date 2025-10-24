import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetCompetition() {
  console.log('🔄 Starting competition reset...\n');

  try {
    // 1. Reset all participant scores and progress
    console.log('📊 Resetting participant data...');
    const { data: participants, error: fetchError } = await supabase
      .from('competition_participants')
      .select('id, email, display_name');

    if (fetchError) {
      console.error('Error fetching participants:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${participants?.length || 0} participants to reset`);

    if (participants && participants.length > 0) {
      const { error: resetError } = await supabase
        .from('competition_participants')
        .update({
          total_score: 0,
          current_question: 1,
          questions_skipped: 0,
          last_activity: new Date().toISOString()
        })
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all

      if (resetError) {
        console.error('Error resetting participants:', resetError);
        throw resetError;
      }

      console.log('✅ All participant scores reset to 0');
      console.log('✅ All participants reset to question 1');
      console.log('✅ All skip counts reset to 0\n');
    }

    // 2. Delete all previous answers
    console.log('🗑️  Deleting all previous answers...');
    const { error: deleteError } = await supabase
      .from('competition_answers')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Error deleting answers:', deleteError);
      throw deleteError;
    }

    console.log('✅ All previous answers deleted\n');

    // 3. Display competition schedule
    const now = new Date();
    const cairoTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
    
    // Set competition start time to 6 PM Cairo time TODAY
    const competitionStart = new Date(cairoTime);
    competitionStart.setHours(18, 0, 0, 0); // 6 PM TODAY
    
    // Competition ends 4 hours after start (10 PM)
    const competitionEnd = new Date(competitionStart);
    competitionEnd.setHours(22, 0, 0, 0); // 10 PM TODAY
    
    console.log('📅 Competition Schedule:');
    console.log(`   Current Cairo Time: ${cairoTime.toLocaleString('en-US', {timeZone: 'Africa/Cairo'})}`);
    console.log(`   Competition Start:  ${competitionStart.toLocaleString('en-US', {timeZone: 'Africa/Cairo'})} (6:00 PM Cairo Time)`);
    console.log(`   Competition End:    ${competitionEnd.toLocaleString('en-US', {timeZone: 'Africa/Cairo'})} (10:00 PM Cairo Time)`);
    console.log(`   Duration: 4 hours\n`);

    console.log('✅ Competition reset completed successfully!');
    console.log('\n📝 Summary:');
    console.log(`   - ${participants?.length || 0} participants reset`);
    console.log(`   - All scores set to 0`);
    console.log(`   - All progress reset to question 1`);
    console.log(`   - All previous answers deleted`);
    console.log(`   - Competition scheduled for TODAY at 6 PM Cairo time`);
    console.log(`   - Competition will run for 4 hours (6 PM - 10 PM)\n`);

  } catch (error) {
    console.error('❌ Error resetting competition:', error);
    process.exit(1);
  }
}

// Run the reset
resetCompetition();
