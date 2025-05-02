import nodemailer from 'nodemailer';
import { rejectionEmailTemplate } from './rejectionEmailTemplate.js';



export async function sendRejectionEmail(request) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: request.user ? request.user.email : request.guestEmail,
      subject: '❌ تم رفض طلب الحجز',
      html: rejectionEmailTemplate(request)
    });
  }