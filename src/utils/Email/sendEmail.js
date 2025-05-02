import { bookingConfirmationEmailTemplate } from "./EmailTamplate.js";
import nodemailer from 'nodemailer';

export async function sendBookingConfirmationEmail(request) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.COMPANY_EMAIL,
    subject: '✅ تم استلام طلب الحجز',
    html: bookingConfirmationEmailTemplate(request)
  });
}
