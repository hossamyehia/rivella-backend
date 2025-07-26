

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
    .details{text-align:right;margin:20px 0;padding:0 15px;}
    .details p{margin:8px 0;font-size:16px;color:#333;}
    .apology{background:#f8d7da;padding:15px;border-radius:6px;margin:15px 0;}
    .footer{font-size:12px;color:#888;margin-top:20px;}
    .company-info{margin-top:15px;text-align:center;}
    .company-info p{margin:3px 0;font-size:14px;}
  </style>
</head>
<body dir='rtl'>
  <div class="box">
    <div class="header"><h1>تم رفض طلب حجزك</h1></div>
    
    <div class="apology">
      <p>نأسف لإبلاغك بأنه تم رفض طلب الحجز الخاص بكم. نتمنى أن نتمكن من خدمتكم في وقت آخر.</p>
    </div>
    
    <div class="details">
      <p><strong>كود الطلب:</strong> ${request.code}</p>
      <p><strong>شاليه:</strong> ${request.chalet.name}</p>
      <p><strong>تاريخ الوصول:</strong> ${new Date(request.checkIn).toLocaleDateString('ar-EG')}</p>
      <p><strong>تاريخ المغادرة:</strong> ${new Date(request.checkOut).toLocaleDateString('ar-EG')}</p>
    </div>
    
    <p>للمزيد من المعلومات، يرجى التواصل مع خدمة العملاء:</p>
    <p><strong>01107973962</strong></p>
    
    <div class="company-info">
      <p><strong>Rivella Explore</strong></p>
      <p>البريد الإلكتروني: rivellaexplore1@gmail.com</p>
      <p>الهاتف: 01107973962</p>
    </div>
    
    <div class="footer">شكراً لاهتمامكم بخدماتنا &copy; Rivella Explore 2025</div>
  </div>
</body>
</html>`;
}
