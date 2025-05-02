// دوال الإرسال
import nodemailer from 'nodemailer'; 
import { approvalEmailTemplate } from './approvalEmailTemplate.js';


export async function sendApprovalEmail(request) {
    const transporter = nodemailer.createTransport({
      service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: request.user ? request.user.email : request.guestEmail,
      subject: '✅ تمت الموافقة على طلب الحجز',
      html: approvalEmailTemplate(request)
    });
  }