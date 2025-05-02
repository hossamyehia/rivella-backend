
// تولّد قالب البريد الإلكتروني لطلب حجز شاليه للمدير (بالعربي)، مع تفاصيل الكوبون
export function bookingConfirmationEmailTemplate(request) {
  const viewLink = `${process.env.HOSTFRONT}/bookingRequests/${request._id}`;
  return `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>طلب حجز شاليه جديد</title>
  <style>
    body{margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#333;direction:rtl;}
    .wrapper{width:100%;padding:30px 0;background:#f4f6f8;}
    .container{background:#fff;max-width:600px;margin:auto;border-radius:8px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,0.1);}
    .header{background:#007bff;padding:20px;text-align:center;color:#fff;}
    .header h1{margin:0;font-size:22px;}
    .body{padding:20px;}
    .section{margin-bottom:25px;}
    .section-title{font-size:18px;color:#007bff;border-bottom:2px solid #007bff;padding-bottom:8px;margin-bottom:12px;}
    .details-table{width:100%;border-collapse:collapse;margin-top:10px;}
    .details-table th, .details-table td{padding:10px;border:1px solid #e0e0e0;text-align:right;font-size:14px;}
    .details-table tr:nth-child(even){background:#f9f9f9;}
    .btn-container{text-align:center;margin-top:20px;}
    .btn{background:#28a745;color:#fff;padding:12px 25px;text-decoration:none;border-radius:5px;font-size:16px;}
    .btn:hover{background:#218838;}
    .footer{background:#f9f9f9;text-align:center;padding:15px;font-size:12px;color:#777;}
  </style>
</head>
<body dir='rtl'>
  <div class="wrapper " dir='rtl'>
    <div class="container"  dir='rtl'>
      <div class="header">
        <h1>طلب حجز شاليه جديد</h1>
      </div>
      <div class="body">
        <div class="section">
          <p>مرحباً،</p>
          <p>تم استلام طلب حجز شاليه جديد. التفاصيل الكاملة أدناه:</p>
        </div>
        <div class="section">
          <div class="section-title">تفاصيل الحجز</div>
          <table class="details-table">
            <tr><th>كود الطلب</th><td>${request.code}</td></tr>
            <tr><th>اسم الشاليه</th><td>${request.chalet.name}</td></tr>
            <tr><th>المدينة</th><td>${request.chalet.city.name}</td></tr>
            <tr><th>القرية</th><td>${request.chalet.village.name}</td></tr>
            <tr><th>تاريخ الوصول</th><td>${new Date(request.checkIn).toLocaleDateString('ar-EG')}</td></tr>
            <tr><th>تاريخ المغادرة</th><td>${new Date(request.checkOut).toLocaleDateString('ar-EG')}</td></tr>
            <tr><th>عدد الأيام</th><td>${request.days}</td></tr>
            <tr><th>السعر قبل الخصم</th><td>${request.priceBeforeDiscount || request.totalPrice} ج.م</td></tr>
            ${request.coupon ? `
            <tr><th>كود الكوبون</th><td>${request.coupon.code}</td></tr>
            <tr><th>نوع الخصم</th><td>${request.coupon.discountType}</td></tr>
            <tr><th>قيمة الخصم</th><td>${request.coupon.discountValue}${request.coupon.discountType==='percentage' ? '%' : ' ج.م'}</td></tr>
            <tr><th>المبلغ المخصوم</th><td>${request.discountAmount} ج.م</td></tr>
            <tr><th>السعر بعد الخصم</th><td>${request.priceAfterDiscount} ج.م</td></tr>
            ` : ''}
          </table>
        </div>
        <div class="section">
          <div class="section-title">بيانات المُرسل</div>
          <table class="details-table">
            <tr><th>الاسم</th><td>${request.user ? request.user.name : request.guestName}</td></tr>
            <tr><th>البريد الإلكتروني</th><td>${request.user ? request.user.email : request.guestEmail}</td></tr>
            <tr><th>الهاتف</th><td>${request.user ? request.user.phone : request.guestPhone}</td></tr>
          </table>
        </div>
        <div class="btn-container">
          <a href="${viewLink}" class="btn">عرض الطلب في لوحة التحكم</a>
        </div>
      </div>
      <div class="footer">شكراً لاستخدامكم خدماتنا!</div>
    </div>
  </div>
</body>
</html>`;
}
