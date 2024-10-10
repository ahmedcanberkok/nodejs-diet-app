const mailjet = require('node-mailjet').apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
  );
  

  
  const sendVerificationEmail = async (toEmail, toUsername, subject, textPart, htmlPart) => {
    try {
      const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'canberk.ok@gmail.com', // Kendi e-posta adresiniz
              Name: 'DietAPP',
            },
            To: [
              {
                Email: toEmail,  // Kullanıcının e-posta adresi
                Name: toUsername, // Alıcı kullanıcı adı
              },
            ],
            Subject: subject,
            TextPart: textPart,
            HTMLPart: htmlPart,
          },
        ],
      });
  
      const response = await request;
      console.log(response.body);
      return response.body;
    } catch (error) {
      console.error('E-posta gönderimi başarısız:', error);
      throw error;
    }
  };
  
  module.exports = { sendVerificationEmail };
  