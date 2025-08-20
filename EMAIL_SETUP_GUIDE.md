# Email Service Setup Guide for PHIGA Competition System

## Current Issue
The email service is currently in **development mode** and only logs emails to the browser console instead of actually sending them. You need to configure a real email service to send competition codes.

## Quick Solution: EmailJS Setup (Recommended)

EmailJS is the easiest option since it works directly from the frontend without needing a backend server.

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. **Note down your Service ID**

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```html
Subject: Your PHIGA Competition Access Code

To: {{to_email}}

Hi {{participant_name}},

Congratulations! Your registration has been approved.

Your Competition Access Code: {{competition_code}}

Next Steps:
1. Save this code - You'll need it to access the competition
2. Competition Day - Visit the PHIGA website and enter your code
3. Be Ready - Make sure you have a stable internet connection
4. Good Luck! - Show the world your physics knowledge

IMPORTANT: Keep this code confidential. Do not share it with anyone else.

If you have any questions, please contact us at support@phiga.org

© 2025 Physics International Global Assessment
```

4. **Note down your Template ID**

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Note it down**

### Step 5: Install EmailJS
Run this command in your project:
```bash
npm install @emailjs/browser
```

### Step 6: Update Environment Variables
Add these to your `.env.local` file:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 7: Update Email Service Code
I'll provide the updated code that uses EmailJS.

## Alternative Options

### Option 2: SendGrid (More Professional)
- Better for high-volume emails
- Requires backend API
- More complex setup
- Better deliverability

### Option 3: Resend (Modern)
- Great developer experience
- Requires backend API
- Good documentation
- Modern features

## Testing the Email Service

### After Setup:
1. **Test Registration**: Submit a test registration
2. **Approve in Admin**: Go to admin page and approve the registration
3. **Generate Code**: Click "Generate Code" for the user
4. **Check Email**: The user should receive an email with the competition code

### Troubleshooting:
- **No email received**: Check spam folder
- **EmailJS errors**: Verify Service ID, Template ID, and Public Key
- **Console errors**: Check browser developer tools
- **Template issues**: Make sure variable names match exactly

## Security Notes
- Never commit API keys to version control
- Use environment variables for all sensitive data
- EmailJS public key is safe to expose (it's meant to be public)
- Consider rate limiting for production use

---

**Next Step**: Choose EmailJS for quick setup, then follow the step-by-step guide above!