import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Необходимые настройки для некоторых хостинг-провайдеров
    rejectUnauthorized: false,
    minVersion: "TLSv1",
  },
});

export interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendMail = async (options: MailOptions) => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;

  if (!smtpHost || !smtpUser) {
    console.warn("⚠️ SMTP is not configured. Skipping email sending.");
    console.log("Email content that would have been sent:");
    console.log("To:", options.to);
    console.log("Subject:", options.subject);
    console.log("Text:", options.text);
    return { messageId: "dev-mode-no-send", success: true };
  }

  try {
    const fromAddress = options.from || smtpUser;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log("✅ Message sent: %s", info.messageId);
    return { ...info, success: true };
  } catch (error: any) {
    console.error("❌ Error sending mail:", error.message);
    console.error("DEBUG INFO:");
    console.error(" - Host:", smtpHost);
    console.error(" - Port:", smtpPort);
    console.error(" - Secure (SSL/TLS):", smtpSecure);
    console.error(" - User:", smtpUser);
    console.error(" - From:", options.from || smtpUser);
    
    if (error.code === "EAUTH") {
      console.error(
        "Hint: Authentication error. Check SMTP_USER and SMTP_PASS (App Password).",
      );
    }
    if (error.message.includes("Verification failed") || error.code === '550') {
      console.error(
        "Hint: Your SMTP server rejected the sender address. Ensure SMTP_USER is a REAL working email and you are authorized to send from it.",
      );
    }
    return {
      success: false,
      messageId: "failed-to-send",
      error: error.message,
      code: error.code,
    };
  }
};
