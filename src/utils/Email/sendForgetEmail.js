import nodemailer from 'nodemailer';
import { passwordResetEmailTemplate } from './forgetEmailTemplate.js';

export async function sendForgetEmail(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: 'تغيير كلمة السر',
    html: passwordResetEmailTemplate(data)
  });
}
