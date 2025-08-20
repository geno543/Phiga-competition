# Database Setup Guide for PHIGA Competition System

## Issue Identified
The registrations are not appearing in the admin page because the database table and Row Level Security (RLS) policies haven't been properly set up in Supabase.

## Step-by-Step Solution

### 1. Access Supabase SQL Editor
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your PHIGA project
3. Navigate to **SQL Editor** in the left sidebar

### 2. Execute the Database Script
1. Open the `create_registrations_table.sql` file in this project
2. Copy the entire contents of the file
3. Paste it into the Supabase SQL Editor
4. Click **Run** to execute the script

### 3. Verify the Setup
After running the script, you should see:
- ✅ Table `registrations` created successfully
- ✅ RLS policies created
- ✅ Indexes created
- ✅ New columns added (competition_code, code_generated_at, registration_status)

### 4. Test the Registration System
1. Go to your website's registration page
2. Fill out and submit a test registration
3. Check the admin page - the registration should now appear

## What the Script Does

### Creates the Table
- Creates `registrations` table with all required fields
- Adds competition-specific columns (code, status, etc.)
- Sets up proper indexes for performance

### Sets Up Security Policies
- **Anonymous Insert**: Allows users to register without authentication
- **Anonymous Select**: Allows admin page to view registrations
- **Anonymous Update**: Allows admin functions to work
- **Authenticated Access**: Full access for authenticated users

### Performance Optimizations
- Indexes on email, created_at, competition_code, and status
- Optimized for fast lookups and filtering

## Troubleshooting

### If you get "policy already exists" error:
The script now includes `DROP POLICY IF EXISTS` statements to handle this automatically.

### If registrations still don't appear:
1. Check the browser console for errors
2. Verify your Supabase URL and API key in `.env.local`
3. Ensure the script ran without errors

### If you can't insert registrations:
1. Make sure RLS policies were created correctly
2. Check that the `anon` role has the right permissions

## Next Steps After Setup
1. Test registration form submission
2. Test admin page functionality
3. Test code generation and email sending
4. Configure email service (EmailJS, SendGrid, or Resend)

---

**Important**: Make sure to run the complete SQL script in Supabase before testing the application!