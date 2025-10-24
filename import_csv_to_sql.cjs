const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, 'src', 'assets', 'filtered_no_duplicates_registrations.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV content
const lines = csvContent.trim().split('\n');
const header = lines[0]; // birth_date,email
const dataLines = lines.slice(1);

console.log(`Processing ${dataLines.length} participants...`);

// Generate SQL INSERT statements
let sqlContent = `-- Competition Participants Import with Birth Dates
-- Generated from filtered_no_duplicates_registrations.csv
-- Total participants: ${dataLines.length}

-- Disable RLS temporarily for bulk insert
ALTER TABLE public.competition_participants DISABLE ROW LEVEL SECURITY;

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM public.competition_participants;

-- Insert participants with birth dates
`;

let validCount = 0;
let invalidCount = 0;

dataLines.forEach((line, index) => {
    const [birthDate, email] = line.split(',');
    
    // Basic validation
    if (!birthDate || !email || !email.includes('@')) {
        console.log(`Skipping invalid entry at line ${index + 2}: ${line}`);
        invalidCount++;
        return;
    }
    
    // Clean the data
    const cleanBirthDate = birthDate.trim();
    const cleanEmail = email.trim().toLowerCase();
    
    // Generate a display name from email (before @ symbol)
    const originalName = cleanEmail.split('@')[0];
    const displayName = originalName.charAt(0).toUpperCase() + originalName.slice(1);
    
    // Validate birth date format (basic check)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(cleanBirthDate)) {
        console.log(`Invalid date format at line ${index + 2}: ${cleanBirthDate}`);
        invalidCount++;
        return;
    }
    
    // Check for obviously invalid years (like 0007 or 2025)
    const year = parseInt(cleanBirthDate.split('-')[0]);
    if (year < 1990 || year > 2015) {
        console.log(`Suspicious birth year at line ${index + 2}: ${year} for ${cleanEmail}`);
        // Still include it but with a warning
    }
    
    sqlContent += `INSERT INTO public.competition_participants (email, original_name, display_name, birth_date, total_score, questions_skipped, current_question, is_active, has_set_display_name, created_at)
VALUES ('${cleanEmail}', '${originalName}', '${displayName}', '${cleanBirthDate}', 0, 0, 1, true, true, NOW());
`;
    
    validCount++;
});

sqlContent += `
-- Re-enable RLS
ALTER TABLE public.competition_participants ENABLE ROW LEVEL SECURITY;

-- Verify the import
SELECT COUNT(*) as total_participants FROM public.competition_participants;
SELECT birth_date, COUNT(*) as count FROM public.competition_participants GROUP BY birth_date ORDER BY birth_date;
`;

// Write the SQL file
const outputPath = path.join(__dirname, 'competition_import_from_csv.sql');
fs.writeFileSync(outputPath, sqlContent);

console.log(`\n=== Import Summary ===`);
console.log(`Valid participants: ${validCount}`);
console.log(`Invalid entries skipped: ${invalidCount}`);
console.log(`SQL file generated: competition_import_from_csv.sql`);
console.log(`\nTo import the data:`);
console.log(`1. Review the generated SQL file`);
console.log(`2. Run it in your Supabase SQL editor or psql`);
console.log(`3. Verify the import with the SELECT statements at the end`);