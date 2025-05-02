
export function verifyEmailTemplate(code) {
    return `<!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>تأكيد البريد الإلكتروني</title>
    <style>
      body{font-family:Arial,sans-serif;background:#f7f7f7;padding:20px;direction:rtl;}
      .box{background:#fff;padding:20px;border-radius:8px;max-width:400px;margin:auto;text-align:center;}
      h1{color:#007bff;font-size:20px;margin-bottom:10px;}
      p{font-size:16px;color:#333;}
      .code{display:inline-block;font-size:24px;font-weight:bold;padding:10px 20px;background:#f0f0f0;border-radius:4px;margin:15px 0;}
      .footer{font-size:12px;color:#888;margin-top:20px;}
    </style>
  </head>
  <body>
    <div class="box">
      <h1>تأكيد البريد الإلكتروني</h1>
      <p>شكرًا لتسجيلك! استخدم رمز التحقق التالي لتأكيد بريدك الإلكتروني:</p>
      <div class="code">${code}</div>
      <p>إذا لم تطلب هذا، يمكنك تجاهل هذه الرسالة.</p>
      <div class="footer">فريق شركتنا</div>
    </div>
  </body>
  </html>`;
}