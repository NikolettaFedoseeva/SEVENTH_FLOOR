import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendMail = async (options: MailOptions) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn('⚠️ SMTP is not configured. Skipping email sending.');
    console.log('Email content that would have been sent:');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Text:', options.text);
    return { messageId: 'dev-mode-no-send' };
  }

  try {
    const info = await transporter.sendMail({
      from: options.from || `"СЕДЬМОЙ ЭТАЖ" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error: any) { // lint-fix: no-throw-in-async-function
    console.error('❌ Error sending mail:', error.message);
    if (error.code === 'EAUTH') {
      console.error('Hint: It looks like an authentication error. Check your SMTP_USER and SMTP_PASS (App Password for Mail.ru/Gmail).');
    }
    // Return a dummy object instead of throwing to prevent 500 error in the route
    return { 
      messageId: 'failed-to-send',
      error: error.message 
    };
  }
};
