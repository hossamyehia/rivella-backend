import { bookingRequestEmailTemplate } from "./RestpassTamplate.js";
import nodemailer from 'nodemailer';

export async function sendBookingRequestEmail(request) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    
    to: request.user ? request.user.email : request.guestEmail,
    subject: '📩 طلب حجز شاليه جديد',
    html: bookingRequestEmailTemplate(request)
  });
}
