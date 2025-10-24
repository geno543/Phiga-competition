const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_ANON_KEY; // Use anon key since service role key is not available

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration. Please check your .env.local file.');
  console.log('Required variables:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importParticipants() {
  console.log('🚀 Starting participant import...');
  
  const participants = [];
  
  // Read CSV file
  return new Promise((resolve, reject) => {
    fs.createReadStream('./src/assets/unique_emails_names_with_codes_no_link.csv')
      .pipe(csv())
      .on('data', (row) => {
        participants.push({
          email: row.email.trim(),
          original_name: row.name.trim(), // Use original_name instead of name
          passcode: row.pass_code.trim(),
          created_at: new Date().toISOString()
        });
      })
      .on('end', async () => {
        console.log(`📊 Found ${participants.length} participants in CSV`);
        
        try {
          // Clear existing participants (optional - remove if you want to keep existing data)
          console.log('🧹 Clearing existing participants...');
          const { error: deleteError } = await supabase
            .from('competition_participants')
            .delete()
            .neq('id', 0); // Delete all records
          
          if (deleteError) {
            console.warn('⚠️  Warning clearing existing data:', deleteError.message);
          }
          
          // Insert participants in batches of 100
          const batchSize = 100;
          let imported = 0;
          let errors = 0;
          
          for (let i = 0; i < participants.length; i += batchSize) {
            const batch = participants.slice(i, i + batchSize);
            
            console.log(`📥 Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(participants.length/batchSize)} (${batch.length} participants)...`);
            
            const { data, error } = await supabase
              .from('competition_participants')
              .insert(batch)
              .select('id');
            
            if (error) {
              console.error(`❌ Error importing batch ${Math.floor(i/batchSize) + 1}:`, error.message);
              errors += batch.length;
            } else {
              imported += batch.length;
              console.log(`✅ Successfully imported ${batch.length} participants`);
            }
          }
          
          console.log('\n📈 Import Summary:');
          console.log(`✅ Successfully imported: ${imported} participants`);
          console.log(`❌ Failed to import: ${errors} participants`);
          console.log(`📊 Total processed: ${participants.length} participants`);
          
          if (imported > 0) {
            console.log('\n🎉 Participant import completed successfully!');
            console.log('🔗 Participants can now log in at: http://localhost:5174/competition');
          }
          
          resolve();
        } catch (error) {
          console.error('❌ Fatal error during import:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error);
        reject(error);
      });
  });
}

// Run the import
importParticipants()
  .then(() => {
    console.log('✨ Import process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Import failed:', error);
    process.exit(1);
  });