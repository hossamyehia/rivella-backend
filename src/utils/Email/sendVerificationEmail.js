import { verifyEmailTemplate } from "./verifyEmailTemplate.js";
import nodemailer from 'nodemailer';

export async function sendVerificationEmail(user) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: '🔒 تأكيد البريد الإلكتروني',
      html: verifyEmailTemplate(user.verificationCode)
    });
  }
  