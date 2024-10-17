// //mailservice.js

// const mailjet = require('node-mailjet').apiConnect(
//     process.env.MAILJET_API_KEY,
//     process.env.MAILJET_SECRET_KEY
//   );
  

  
//   const sendVerificationEmail = async (toEmail, toUsername, subject, textPart, htmlPart) => {
//     try {
//       const request = mailjet.post('send', { version: 'v3.1' }).request({
//         Messages: [
//           {
//             From: {
//               Email: 'canberk.ok@gmail.com', // Kendi e-posta adresiniz
//               Name: 'DietAPP',
//             },
//             To: [
//               {
//                 Email: toEmail,  // Kullanıcının e-posta adresi
//                 Name: toUsername, // Alıcı kullanıcı adı
//               },
//             ],
//             Subject: subject,
//             TextPart: textPart,
//             HTMLPart: htmlPart,
//           },
//         ],
//       });
  
//       const response = await request;
//       console.log(response.body);
//       return response.body;
//     } catch (error) {
//       console.error('E-posta gönderimi başarısız:', error);
//       throw error;
//     }
//   };
  
//   module.exports = { sendVerificationEmail };
  

const nodemailer = require('nodemailer');

// Mailjet SMTP ayarları ile transporter'ı oluşturuyoruz
const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,  // 465 SSL için kullanılabilir, 587 TLS için
  auth: {
    user: process.env.MAILJET_API_KEY, // Mailjet API key
    pass: process.env.MAILJET_SECRET_KEY, // Mailjet Secret key
  },
});

// E-posta gönderim fonksiyonu
const sendEmail = async (toEmail, subject, textPart, htmlPart) => {
  try {
    const info = await transporter.sendMail({
      from: '"DietAPP" <canberk.ok@gmail.com>', // Gönderici adı ve e-posta
      to: toEmail,  // Alıcı e-posta adresi
      subject: subject,  // E-posta konusu
      text: textPart,  // Düz metin içeriği
      html: htmlPart,  // HTML içeriği
    });

    console.log('E-posta başarıyla gönderildi: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('E-posta gönderimi başarısız:', error);
    throw error;
  }
};

module.exports = { sendEmail };
