const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

async function testGmailConfig() {
  console.log('==================================================');
  console.log('  INDORE INFRA CONSTRUCTION - Email Delivery Test ');
  console.log('==================================================');

  dotenv.config({ override: true });
  const emailUser = (process.env.EMAIL_USER || process.env.SMTP_USER || '').trim();
  const rawPass = process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || '';
  const emailPass = rawPass.replace(/["'\s]/g, '');
  const adminEmail = (process.env.ADMIN_EMAIL || 'indoreinfra09@gmail.com').trim();

  console.log('ADMIN_EMAIL :', adminEmail);
  console.log('EMAIL_USER  :', emailUser);
  console.log('EMAIL_PASS  :', !emailPass || emailPass.includes('YOUR_') ? '[NOT CONFIGURED YET (Still placeholder)]' : `Configured (${emailPass.length} characters)`);

  if (!emailUser || !emailPass || emailPass.includes('YOUR_')) {
    console.log('\n❌ ACTION REQUIRED:');
    console.log('You must replace YOUR_GOOGLE_APP_PASSWORD in backend/.env with your actual 16-character Google App Password.');
    console.log('Example: EMAIL_PASS=abcd efgh ijkl mnop (or abcdefghijklmnop)');
    console.log('Then run this script again: node test_notification.js');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    console.log('\n[1/2] Verifying SMTP credentials with Gmail...');
    await transporter.verify();
    console.log('✅ SMTP Authentication verified successfully!');

    console.log('\n[2/2] Sending test email notification to', adminEmail, '...');
    const info = await transporter.sendMail({
      from: `"INDORE INFRA CONSTRUCTION" <${emailUser}>`,
      to: adminEmail,
      subject: 'Test Notification - INDORE INFRA CONSTRUCTION',
      text: `Hello Admin,

This is a test notification confirming that your Gmail notification setup for INDORE INFRA CONSTRUCTION is working properly!

Whenever a customer submits an enquiry via your website, all details will be delivered here automatically.

Sent at: ${new Date().toLocaleString()}`,
    });

    console.log('✅ Test email delivered successfully! Message ID:', info.messageId);
    console.log('Check your Gmail inbox at:', adminEmail);
  } catch (error) {
    console.error('❌ Failed to verify or send test email:');
    console.error(error.message);
  }
}

testGmailConfig();
