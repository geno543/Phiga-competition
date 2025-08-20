// Email service for sending competition codes
// This is a placeholder implementation - you'll need to integrate with an actual email service
// Popular options: EmailJS, SendGrid, Resend, or a custom backend API

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export const createCompetitionCodeEmail = (
  participantName: string,
  email: string,
  competitionCode: string
): EmailTemplate => {
  const subject = 'Your PHIGA Competition Access Code';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PHIGA Competition Code</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .code-container {
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
          backdrop-filter: blur(10px);
        }
        .code {
          font-size: 2.5em;
          font-weight: bold;
          letter-spacing: 8px;
          font-family: 'Courier New', monospace;
          color: #ffd700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .instructions {
          background: white;
          color: #333;
          border-radius: 8px;
          padding: 25px;
          margin: 30px 0;
          text-align: left;
        }
        .footer {
          margin-top: 30px;
          font-size: 0.9em;
          opacity: 0.8;
        }
        .warning {
          background: rgba(255,193,7,0.2);
          border: 1px solid rgba(255,193,7,0.5);
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">PHIGA</div>
        <h1>🎉 Congratulations, ${participantName}!</h1>
        <p>Your registration has been approved and you're ready to participate in the Physics International Global Assessment.</p>
        
        <div class="code-container">
          <h2>Your Competition Access Code</h2>
          <div class="code">${competitionCode}</div>
        </div>
        
        <div class="instructions">
          <h3>📋 Next Steps:</h3>
          <ol>
            <li><strong>Save this code</strong> - You'll need it to access the competition</li>
            <li><strong>Competition Day</strong> - Visit the PHIGA website and enter your code</li>
            <li><strong>Be Ready</strong> - Make sure you have a stable internet connection</li>
            <li><strong>Good Luck!</strong> - Show the world your physics knowledge</li>
          </ol>
          
          <div class="warning">
            <strong>⚠️ Important:</strong> Keep this code confidential. Do not share it with anyone else.
          </div>
        </div>
        
        <div class="footer">
          <p>If you have any questions, please contact us at support@phiga.org</p>
          <p>© 2024 Physics International Global Assessment</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
PHIGA - Physics International Global Assessment

Congratulations, ${participantName}!

Your registration has been approved and you're ready to participate in the Physics International Global Assessment.

Your Competition Access Code: ${competitionCode}

Next Steps:
1. Save this code - You'll need it to access the competition
2. Competition Day - Visit the PHIGA website and enter your code
3. Be Ready - Make sure you have a stable internet connection
4. Good Luck! - Show the world your physics knowledge

IMPORTANT: Keep this code confidential. Do not share it with anyone else.

If you have any questions, please contact us at support@phiga.org

© 2024 Physics International Global Assessment
  `;
  
  return {
    to: email,
    subject,
    html,
    text
  };
};

// Function for sending emails
export const sendEmail = async (emailData: EmailTemplate): Promise<boolean> => {
  try {
    // Check if EmailJS is configured
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
      console.warn('⚠️ EmailJS not configured. Email will be logged to console only.');
      console.log('📧 Email would be sent:', {
        to: emailData.to,
        subject: emailData.subject,
        preview: emailData.text.substring(0, 100) + '...'
      });
      console.log('📋 To set up email service, see EMAIL_SETUP_GUIDE.md');
      
      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }
    
    // Import EmailJS dynamically
    const emailjs = await import('@emailjs/browser');
    
    // Extract participant name from email content
    const nameMatch = emailData.text.match(/Congratulations, (.+?)!/);
    const participantName = nameMatch ? nameMatch[1] : 'Participant';
    
    // Extract competition code from email content
    const codeMatch = emailData.text.match(/Your Competition Access Code: (.+)/);
    const competitionCode = codeMatch ? codeMatch[1] : 'CODE_NOT_FOUND';
    
    const result = await emailjs.default.send(
      serviceId,
      templateId,
      {
        to_email: emailData.to,
        participant_name: participantName,
        competition_code: competitionCode,
        subject: emailData.subject
      },
      publicKey
    );
    
    if (result.status === 200) {
      console.log('✅ Email sent successfully to:', emailData.to);
      return true;
    } else {
      console.error('❌ Email sending failed with status:', result.status);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    
    // If EmailJS is not installed, provide helpful message
    if (error instanceof Error && error.message.includes('Cannot resolve module')) {
      console.log('💡 To install EmailJS, run: npm install @emailjs/browser');
      console.log('📋 Then follow the setup guide in EMAIL_SETUP_GUIDE.md');
    }
    
    return false;
  }
};

// Function to send competition code email
export const sendCompetitionCodeEmail = async (
  participantName: string,
  email: string,
  competitionCode: string
): Promise<boolean> => {
  const emailTemplate = createCompetitionCodeEmail(participantName, email, competitionCode);
  return await sendEmail(emailTemplate);
};

// Email service configuration instructions
export const EMAIL_SERVICE_SETUP = {
  emailjs: {
    name: 'EmailJS',
    description: 'Client-side email service, easy to set up',
    setup: [
      '1. Sign up at https://www.emailjs.com/',
      '2. Create a service (Gmail, Outlook, etc.)',
      '3. Create an email template',
      '4. Get your Service ID, Template ID, and Public Key',
      '5. Install: npm install @emailjs/browser',
      '6. Replace the placeholder code in sendEmail function'
    ]
  },
  sendgrid: {
    name: 'SendGrid',
    description: 'Professional email service with high deliverability',
    setup: [
      '1. Sign up at https://sendgrid.com/',
      '2. Get your API key',
      '3. Set up a backend API endpoint',
      '4. Install SendGrid SDK on your backend',
      '5. Create API route to send emails',
      '6. Call your backend API from the frontend'
    ]
  },
  resend: {
    name: 'Resend',
    description: 'Modern email API with great developer experience',
    setup: [
      '1. Sign up at https://resend.com/',
      '2. Get your API key',
      '3. Set up a backend API endpoint',
      '4. Install Resend SDK on your backend',
      '5. Create API route to send emails',
      '6. Call your backend API from the frontend'
    ]
  }
};