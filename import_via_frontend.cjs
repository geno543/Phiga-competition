const fs = require('fs');
const csv = require('csv-parser');

async function generateImportSQL() {
  console.log('🚀 Generating SQL import script...');
  
  const participants = [];
  
  // Read CSV file
  return new Promise((resolve, reject) => {
    fs.createReadStream('./src/assets/unique_emails_names_with_codes_no_link.csv')
      .pipe(csv())
      .on('data', (row) => {
        participants.push({
          email: row.email.trim(),
          original_name: row.name.trim().replace(/'/g, "''"), // Escape single quotes
          passcode: row.pass_code.trim()
        });
      })
      .on('end', async () => {
        console.log(`📊 Found ${participants.length} participants in CSV`);
        
        // Generate SQL INSERT statements
        let sqlContent = `-- Competition Participants Import
-- Generated from CSV file
-- Run this in your Supabase SQL Editor

-- Temporarily disable RLS for import
ALTER TABLE competition_participants DISABLE ROW LEVEL SECURITY;

-- Insert participants
`;

        participants.forEach((participant, index) => {
          sqlContent += `INSERT INTO competition_participants (email, original_name, passcode, created_at) 
VALUES ('${participant.email}', '${participant.original_name}', '${participant.passcode}', NOW());
`;
          
          // Add batch separator every 100 records
          if ((index + 1) % 100 === 0) {
            sqlContent += `\n-- Batch ${Math.floor(index / 100) + 1} completed\n\n`;
          }
        });

        sqlContent += `
-- Re-enable RLS after import
ALTER TABLE competition_participants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own participant data" ON competition_participants
  FOR SELECT USING (true); -- Allow all reads for now

CREATE POLICY "Users can update their own participant data" ON competition_participants
  FOR UPDATE USING (true); -- Allow all updates for now

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON competition_participants TO anon;
GRANT SELECT, INSERT, UPDATE ON competition_questions TO anon;
GRANT SELECT, INSERT, UPDATE ON competition_answers TO anon;
GRANT SELECT, INSERT, UPDATE ON competition_settings TO anon;

-- Grant sequence permissions
GRANT USAGE, SELECT ON SEQUENCE competition_questions_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE competition_settings_id_seq TO anon;

-- Verify import
SELECT COUNT(*) as total_participants FROM competition_participants;
SELECT email, original_name, passcode FROM competition_participants LIMIT 5;
`;

        // Write SQL file
        fs.writeFileSync('./competition_import.sql', sqlContent);
        
        console.log('✅ SQL import script generated: competition_import.sql');
        console.log('📋 Instructions:');
        console.log('1. Open your Supabase dashboard');
        console.log('2. Go to SQL Editor');
        console.log('3. Copy and paste the contents of competition_import.sql');
        console.log('4. Run the script to import all participants');
        console.log(`📊 This will import ${participants.length} participants`);
        
        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error);
        reject(error);
      });
  });
}

// Run the generator
generateImportSQL()
  .then(() => {
    console.log('✨ SQL generation completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Generation failed:', error);
    process.exit(1);
  });