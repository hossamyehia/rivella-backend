
import nodemailer from 'nodemailer';
import { contactRequestEmailTemplate } from './contactRequestEmailTemplate.js';

export async function sendContactRequestEmail(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.COMPANY_EMAIL,
    subject: '📩 رسالة من صفحة تواصل معنا',
    html: contactRequestEmailTemplate(data),
  });
}
