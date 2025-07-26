// تولّد قالب البريد الإلكتروني لطلب إعادة تعيين كلمة المرور للمدير (بالعربي)
export function passwordResetEmailTemplate(data) {
    const resetLink = `${process.env.HOSTFRONT}/reset-password?token=${data.token}`;
    return `<!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>إعادة تعيين كلمة المرور</title>
    <style>
      body{margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#333;direction:rtl;}
      .wrapper{width:100%;padding:30px 0;background:#f4f6f8;}
      .container{background:#fff;max-width:600px;margin:auto;border-radius:8px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,0.1);}
      .header{background:#dc3545;padding:20px;text-align:center;color:#fff;}
      .header h1{margin:0;font-size:22px;}
      .body{padding:20px;}
      .section{margin-bottom:25px;}
      .section-title{font-size:18px;color:#dc3545;border-bottom:2px solid #dc3545;padding-bottom:8px;margin-bottom:12px;}
      .btn-container{text-align:center;margin-top:20px;}
      .btn{background:#dc3545;color:#fff;padding:12px 25px;text-decoration:none;border-radius:5px;font-size:16px;}
      .btn:hover{background:#c82333;}
      .footer{background:#f9f9f9;text-align:center;padding:15px;font-size:12px;color:#777;}
    </style>
  </head>
  <body dir="rtl">
    <div class="wrapper" dir="rtl">
      <div class="container" dir="rtl">
        <div class="header">
          <h1>طلب إعادة تعيين كلمة المرور</h1>
        </div>
        <div class="body">
          <div class="section">
            <p>مرحباً ${data.name },</p>
            <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور لحسابك.</p>
          </div>
          <div class="section">
            <div class="section-title">كيفية إعادة التعيين</div>
            <p>لإعادة تعيين كلمة المرور، اضغط على الزر أدناه:</p>
            <div class="btn-container">
              <a href="${resetLink}" class="btn">إعادة تعيين كلمة المرور</a>
            </div>
            <p style="margin-top:12px; font-size:13px; color:#555;">
              إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد.
            </p>
          </div>
        </div>
        <div class="footer">
          شكراً لاستخدامكم خدماتنا!
        </div>
      </div>
    </div>
  </body>
  </html>`;
  }
  
