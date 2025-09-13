# Ambassador Database Setup Guide

To enable the ambassador program to work across all devices, you need to set up the database tables in Supabase.

## Step 1: Run the SQL Script

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `spycctmatdfqpyuhriyc`
3. Go to the SQL Editor (on the left sidebar)
4. Open the file `create_ambassadors_table.sql` from your project
5. Copy all the SQL content and paste it into the SQL Editor
6. Click "Run" to execute the script

## Step 2: Verify Tables Created

After running the script, verify these tables were created:
- `ambassadors` - stores ambassador information
- `referrals` - tracks referrals made by ambassadors

## Step 3: Test the System

1. Start your development server: `npm run dev`
2. Go to `/ambassador` page
3. Register as a new ambassador
4. Try accessing from another device - you should now see the ambassador you registered

## What Changed

### Before (localStorage only):
- Ambassador data was only stored on the device where they registered
- Accessing from another device showed no ambassadors
- No real referral tracking across devices

### After (Supabase database):
- Ambassador data is stored in the cloud database
- Accessible from any device
- Real referral tracking with persistent data
- Proper leaderboard that works across all devices

## Database Schema

### ambassadors table:
- `id` (UUID, primary key)
- `created_at` (timestamp)
- `name` (string)
- `email` (string, unique)
- `password` (string) - Note: In production, use proper password hashing
- `school` (string, optional)
- `ambassador_code` (string, unique)
- `referral_count` (integer)
- `total_registrations` (integer)
- `ranking` (integer)
- `is_active` (boolean)

### referrals table:
- `id` (UUID, primary key)
- `created_at` (timestamp)
- `ambassador_code` (string, foreign key)
- `referee_email` (string)
- `referee_name` (string)
- `registration_date` (timestamp)

## Security

The database uses Row Level Security (RLS) with public access policies for:
- Reading ambassador data (for leaderboards)
- Inserting new ambassadors and referrals
- Updating ambassador data

## Next Steps

After setting up the database:
1. Test ambassador registration on one device
2. Test login from another device
3. Test referral tracking with actual registrations
4. Monitor the leaderboard updates in real-time
