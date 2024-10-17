const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const UsersModel = require('../models/users-model');
UsersProfilesModel = require('../models/users-profiles-model')
const { restrictedForLogin, checkAuthentication } = require('../middlewares/auth-middleware');
const { sendEmail } = require('../services/mailService'); // Mailjet servisini içe aktar
const fs = require('fs');
const path = require('path');


// Kullanıcı kaydı (Register)
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, phone_no, password } = req.body;

    // Şifreyi hash'le
    const hashedPassword = bcrypt.hashSync(password, 12);

    // Kullanıcıyı veritabanına ekle
    const newUser = await UsersModel.create({
      username,
      email,
      phone_no,
      password: hashedPassword,
    });

    await UsersProfilesModel.createUserProfileRelation(newUser.id);

    if (newUser) {
      const subject = 'Hoşgeldin!';
      const textPart = `Hoşgeldin ${username}, DietAPP ailesine katıldığın için teşekkür ederiz!`;

      // HTML şablonunu dosyadan oku
      const htmlFilePath = path.join(__dirname, '..', 'views', 'welcome_email.html');
      let htmlPart = fs.readFileSync(htmlFilePath, 'utf-8');

      // Kullanıcı adı dinamik olarak şablona ekleniyor
      htmlPart = htmlPart.replace('{{username}}', username);

      // E-posta gönderimini başlat
      await sendEmail(newUser.email, subject, textPart, htmlPart);

      res.status(201).json({
        message: `Kullanıcı başarıyla oluşturuldu: ${username} ve hoşgeldin e-postası gönderildi.`,
        user: newUser,
      });
    } else {
      next({ status: 400, message: 'Kullanıcı oluşturulamadı' });
    }
  } catch (error) {
    next(error);
  }
});
// Kullanıcı girişi (Login)
router.post('/login', restrictedForLogin);

// Token doğrulama
router.get('/auth-check', checkAuthentication, (req, res) => {
  res.status(200).json({ message: 'Kullanıcı doğrulandı', user: req.decodeToken });
});

module.exports = router;
