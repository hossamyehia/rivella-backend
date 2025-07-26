
export function contactRequestEmailTemplate(data) {
    return `<!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>رسالة تواصل من العميل</title>
    <style>
      body{margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#333;direction:rtl;}
      .wrapper{width:100%;padding:30px 0;background:#f4f6f8;}
      .container{background:#fff;max-width:600px;margin:auto;border-radius:8px;box-shadow:0 2px 5px rgba(0,0,0,0.1);overflow:hidden;}
      .header{background:#1e88e5;padding:20px;text-align:center;color:#fff;}
      .header h1{margin:0;font-size:22px;}
      .body{padding:20px;}
      .section{margin-bottom:20px;}
      .details-table{width:100%;border-collapse:collapse;margin-top:10px;}
      .details-table th, .details-table td{padding:10px;border:1px solid #e0e0e0;text-align:right;font-size:14px;}
      .details-table tr:nth-child(even){background:#fafafa;}
      .footer{background:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#777;}
    </style>
  </head>
  <body dir="rtl">
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>رسالة جديدة من صفحة تواصل معنا</h1>
        </div>
        <div class="body">
          <div class="section">
            <p><strong>تفاصيل المرسل:</strong></p>
            <table class="details-table">
              <tr><th>الاسم:</th><td>${data.name}</td></tr>
              <tr><th>البريد الإلكتروني:</th><td>${data.email}</td></tr>
              <tr><th>رقم الهاتف:</th><td>${data.phone}</td></tr>
            </table>
          </div>
          <div class="section">
            <p><strong>الرسالة:</strong></p>
            <p>${data.message}</p>
          </div>
        </div>
        <div class="footer">
          © Rivella Explore ${new Date().getFullYear()} • جميع الحقوق محفوظة
        </div>
      </div>
    </div>
  </body>
  </html>`;
}
  
