
// قالب رسالة رفض الحجز للعميل
export function rejectionEmailTemplate(request) {
    return `<!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>تم رفض طلب الحجز</title>
    <style>
      body{font-family:Arial,sans-serif;background:#f7f7f7;padding:20px;direction:rtl;}
      .box{background:#fff;padding:20px;border-radius:8px;max-width:500px;margin:auto;text-align:center;}
      .header{background:#dc3545;color:#fff;padding:15px;border-radius:6px 6px 0 0;}
      .header h1{margin:0;}
      .details{text-align:left;margin:20px 0;}
      .details p{margin:8px 0;font-size:16px;color:#333;}
      .footer{font-size:12px;color:#888;margin-top:20px;}
    </style>
  </head>
  <body dir='rtl'>
    <div class="box">
      <div class="header"><h1>تم رفض طلب حجزك</h1></div>
      <div class="details">
        <p><strong>كود الطلب:</strong> ${request.code}</p>
        <p><strong>شاليه:</strong> ${request.chalet.name}</p>
        <p><strong>تاريخ الوصول:</strong> ${new Date(request.checkIn).toLocaleDateString('ar-EG')}</p>
        <p><strong>تاريخ المغادرة:</strong> ${new Date(request.checkOut).toLocaleDateString('ar-EG')}</p>
      </div>
      <p>عذراً، لقد تم رفض طلبك. للمزيد من المعلومات، يرجى التواصل مع خدمة العملاء:</p>
      <p><strong>${process.env.COMPANY_PHONE}</strong></p>
      <div class="footer">نأسف لهذا الإزعاج</div>
    </div>
  </body>
  </html>`;
  }
  