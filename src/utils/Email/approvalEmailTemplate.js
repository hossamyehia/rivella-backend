
// قالب رسالة موافقة على الحجز للعميل
export function approvalEmailTemplate(request) {
  const hasCoupon = request.coupon && request.discountAmount > 0;

  return `<!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>تمت الموافقة على طلب الحجز</title>
    <style>
      body{font-family:Arial,sans-serif;background:#f7f7f7;padding:20px;direction:rtl;}
      .box{background:#fff;padding:20px;border-radius:8px;max-width:500px;margin:auto;text-align:center;}
      .header{background:#1e88e5;color:#fff;padding:15px;border-radius:6px 6px 0 0;}
      .header h1{margin:0;}
      .details{text-align:right;margin:20px 0;padding:0 15px;}
      .details p{margin:8px 0;font-size:16px;color:#333;}
      .thank-you{background:#e8f4fd;padding:15px;border-radius:6px;margin:15px 0;}
      .footer{font-size:12px;color:#888;margin-top:20px;}
      .company-info{margin-top:15px;text-align:center;}
      .company-info p{margin:3px 0;font-size:14px;}
    </style>
  </head>
  <body dir='rtl'>
    <div class="box">
      <div class="header"><h1>تمت الموافقة على طلب حجزك</h1></div>
      
      <div class="thank-you">
        <p>شكراً لاختيارك Rivella Explore. نتطلع لاستقبالك قريباً!</p>
      </div>
      
      <div class="details">
        <p><strong>كود الطلب:</strong> ${request.code}</p>
        <p><strong>الشاليه:</strong> ${request.chalet.name}</p>
        <p><strong>تاريخ الوصول:</strong> ${new Date(request.checkIn).toLocaleDateString('ar-EG')}</p>
        <p><strong>تاريخ المغادرة:</strong> ${new Date(request.checkOut).toLocaleDateString('ar-EG')}</p>
        <p><strong>عدد الأيام:</strong> ${request.days}</p>
        ${
          hasCoupon
            ? `
            <p><strong>السعر قبل الخصم:</strong> ${request.totalPrice} ج.م</p>
            <p><strong>الكوبون:</strong> ${request.coupon.code}</p>
            <p><strong>نوع الخصم:</strong> ${request.coupon.discountType === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}</p>
            <p><strong>قيمة الخصم:</strong> ${request.coupon.discountType === 'percentage' ? `${request.coupon.discountValue}%` : `${request.coupon.discountValue} ج.م`}</p>
            <p><strong>مقدار الخصم المطبق:</strong> ${request.discountAmount} ج.م</p>
            <p><strong>السعر النهائي:</strong> ${request.priceAfterDiscount} ج.م</p>
            `
            : `
            <p><strong>السعر النهائي:</strong> ${request.totalPrice} ج.م</p>
            `
        }
      </div>
      
      <p>للاستفسار أو الدفع، يرجى التواصل معنا على:</p>
      <p><strong>01107973962</strong></p>
      
      <div class="company-info">
        <p><strong>Rivella Explore</strong></p>
        <p>البريد الإلكتروني: rivellaexplore1@gmail.com</p>
        <p>الهاتف: 01107973962</p>
      </div>
      
      <div class="footer">شكراً لاختيارك خدمتنا! &copy; Rivella Explore 2025</div>
    </div>
  </body>
  </html>`;
}
