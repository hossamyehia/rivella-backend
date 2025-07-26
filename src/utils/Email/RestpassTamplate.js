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
    .header{background:#1e88e5;padding:20px;text-align:center;color:#fff;}
    .header h1{margin:0;font-size:22px;}
    .header img{max-width:120px;margin-bottom:10px;}
    .body{padding:20px;}
    .section{margin-bottom:25px;}
    .section-title{font-size:18px;color:#1e88e5;border-bottom:2px solid #1e88e5;padding-bottom:8px;margin-bottom:12px;}
    .details-table{width:100%;border-collapse:collapse;margin-top:10px;}
    .details-table th, .details-table td{padding:10px;border:1px solid #e0e0e0;text-align:right;font-size:14px;}
    .details-table tr:nth-child(even){background:#f9f9f9;}
    .deposit-info{background:#e8f4fd;padding:15px;border-radius:6px;margin:15px 0;border-right:4px solid #1e88e5;}
    .deposit-info p{margin:5px 0;}
    .contact{margin-top:20px;font-size:16px;}
    .contact p{margin:5px 0;}
    .footer{background:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#777;}
    .company-info{margin-top:15px;text-align:center;}
    .company-info p{margin:3px 0;font-size:14px;}
  </style>
</head>
<body dir='rtl'>
  <div class="wrapper" dir='rtl'>
    <div class="container" dir='rtl'>
      <div class="header">
        <h1>إيصال طلب الحجز - Rivella Explore</h1>
      </div>
      <div class="body">
        <div class="section">
          <p><strong>شكراً لاختياركم Rivella Explore.</strong> تم إرسال طلب الحجز إلى الشركة ولم يتم الموافقة عليه حتى الآن.</p>
        </div>
        
        <div class="section">
          <div class="section-title">تفاصيل طلبكم</div>
          <table class="details-table">
            <tr><th>كود الطلب</th><td>${request.code}</td></tr>
            <tr><th>اسم الشاليه</th><td>${request.chalet.name}</td></tr>
            <tr><th>تاريخ الوصول</th><td>${new Date(request.checkIn).toLocaleDateString('ar-EG')}</td></tr>
            <tr><th>تاريخ المغادرة</th><td>${new Date(request.checkOut).toLocaleDateString('ar-EG')}</td></tr>
            <tr><th>عدد الأيام</th><td>${request.days}</td></tr>
            ${request.coupon ? `
            <tr><th>السعر قبل الخصم</th><td>${request.priceBeforeDiscount || request.totalPrice} ج.م</td></tr>
            <tr><th>كود الكوبون</th><td>${request.coupon.code}</td></tr>
            <tr><th>المبلغ المخصوم</th><td>${request.discountAmount} ج.م</td></tr>
            <tr><th>السعر النهائي</th><td>${request.priceAfterDiscount} ج.م</td></tr>
            ` : `
            <tr><th>السعر النهائي</th><td>${request.totalPrice} ج.م</td></tr>
            `}
          </table>
        </div>
        
        <div class="deposit-info">
          <p><strong>لتأكيد الحجز، يرجى دفع العربون بقيمة ثلث السعر النهائي</strong></p>
          <p>قيمة العربون: <strong>${request.coupon ? Math.round(request.priceAfterDiscount/3) : Math.round(request.totalPrice/3)} ج.م</strong></p>
          <p>رقم الحساب: <strong>${process.env.COMPANY_PHONE}</strong></p>
          <p>يرجى إرسال صورة من التحويل إلى رقم الشركة لتأكيد الحجز</p>
        </div>
        
        <div class="contact">
          <p>للتواصل أو الاستفسار، يرجى الاتصال على:</p>
          <p><strong>01107973962</strong></p>
        </div>
        
        <div class="company-info">
          <p><strong>Rivella Explore</strong></p>
          <p>البريد الإلكتروني: rivellaexplore1@gmail.com</p>
          <p>الهاتف: 01107973962</p>
        </div>
      </div>
      <div class="footer">نتطلع لخدمتكم دائماً! &copy; Rivella Explore 2025</div>
    </div>
  </div>
</body>
</html>`;
}
