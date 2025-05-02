// services/bookingMailer.js


// نموذج إيصال الحجز الذي يُرسل إلى العميل (بالعربي) مع تفاصيل الكوبون
export function bookingRequestEmailTemplate(request) {
  return `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تأكيد استلام طلب الحجز</title>
  <style>
    body{margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#333;direction:rtl;}
    .wrapper{width:100%;padding:30px 0;background:#f4f6f8;}
    .container{background:#fff;max-width:600px;margin:auto;border-radius:8px;box-shadow:0 2px 5px rgba(0,0,0,0.1);overflow:hidden;}
    .header{background:#28a745;padding:20px;text-align:center;color:#fff;}
    .header h1{margin:0;font-size:22px;}
    .body{padding:20px;}
    .section{margin-bottom:25px;}
    .section-title{font-size:18px;color:#28a745;border-bottom:2px solid #28a745;padding-bottom:8px;margin-bottom:12px;}
    .details-table{width:100%;border-collapse:collapse;margin-top:10px;}
    .details-table th, .details-table td{padding:10px;border:1px solid #e0e0e0;text-align:right;font-size:14px;}
    .details-table tr:nth-child(even){background:#f9f9f9;}
    .contact{margin-top:20px;font-size:16px;}
    .contact p{margin:5px 0;}
    .footer{background:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#777;}
  </style>
</head>
<body  dir='rtl'>
  <div class="wrapper"  dir='rtl'>
    <div class="container"  dir='rtl'>
      <div class="header"><h1>نسعد بحجزكم معنا!</h1></div>
      <div class="body">
        <div class="section"><p>شكراً لاختياركم شاليهاتنا. طلبكم قيد المعالجة وسنوافيكم بالتأكيد النهائي قريباً.</p></div>
        <div class="section">
          <div class="section-title">تفاصيل طلبكم</div>
          <table class="details-table">
            <tr><th>كود الطلب</th><td>${request.code}</td></tr>
            <tr><th>اسم الشاليه</th><td>${request.chalet.name}</td></tr>
            <tr><th>تاريخ الوصول</th><td>${new Date(request.checkIn).toLocaleDateString('ar-EG')}</td></tr>
            <tr><th>تاريخ المغادرة</th><td>${new Date(request.checkOut).toLocaleDateString('ar-EG')}</td></tr>
            <tr><th>عدد الأيام</th><td>${request.days}</td></tr>
            <tr><th>السعر قبل الخصم</th><td>${request.priceBeforeDiscount || request.totalPrice} ج.م</td></tr>
            ${request.coupon ? `
            <tr><th>كود الكوبون</th><td>${request.coupon.code}</td></tr>
            <tr><th>المبلغ المخصوم</th><td>${request.discountAmount} ج.م</td></tr>
            <tr><th>السعر بعد الخصم</th><td>${request.priceAfterDiscount} ج.م</td></tr>
            ` : ''}
          </table>
        </div>
        <div class="contact">
          <p>لإتمام الدفع والتواصل، يرجى الاتصال على الرقم التالي:</p>
          <p><strong>${process.env.COMPANY_PHONE}</strong></p>
        </div>
      </div>
      <div class="footer">نتطلع لخدمتكم دائماً!</div>
    </div>
  </div>
</body>
</html>`;
}