const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/users-model'); // Kullanıcı işlemleri için model
const { generateVerificationToken } = require('../middlewares/auth-token-middleware'); // Doğrulama için token oluşturma
const { restrictedForLogin } = require('../middlewares/auth-login-middleware'); // Giriş doğrulama middleware
const { checkAuthentication } = require('../middlewares/auth-token-middleware') ; // 
const UsersProfiles = require('../models/users-profiles-model'); // Kullanıcı-profil ilişkisi için model
const { sendVerificationEmail } = require('../services/mailService'); // E-posta doğrulama için servis

// Kullanıcı kayıt endpoint'i
router.post('/register', async (req, res, next) => {
  try {
    const payload = req.body;
    // Şifreyi bcrypt ile hash'liyoruz
    payload.password = bcrypt.hashSync(payload.password, 10);

    // Yeni kullanıcı oluşturuluyor
    const newUser = await User.create(payload);
    if (newUser) {
      // Kullanıcı-profil ilişkisini oluştur
      await UsersProfiles.createUserProfileRelation(newUser.id);

      // E-posta doğrulama token'ı oluştur
      const verificationToken = generateVerificationToken(newUser);

      // Kullanıcıya profil oluşturma linkini içeren bir e-posta gönder
      const verificationLink = `http://localhost:3000/profile/create?token=${verificationToken}`;

      const subject = 'Hesabınızı Doğrulayın ve Profilinizi Oluşturun';
      const textPart = `Merhaba ${newUser.username}, profilinizi oluşturmak için şu bağlantıyı kullanın: ${verificationLink}`;
      const htmlPart = `<h2>Merhaba ${newUser.username},</h2>
        <p>Profilinizi oluşturmak için aşağıdaki linke tıklayın:</p>
        <a href="${verificationLink}">${verificationLink}</a>`;

      // E-posta gönderiliyor
      await sendVerificationEmail(newUser.email, newUser.username, subject, textPart, htmlPart);

      res.status(201).json({ message: `Profil oluşturmak için e-posta adresinize gönderilen linki kullanın!` });
    } else {
      next({ status: 400, message: 'Kullanıcı oluşturulamadı' });
    }
  } catch (error) {
    next(error);
  }
});

// Kullanıcı giriş endpoint'i (Login işlemi)
router.post('/login', restrictedForLogin, async (req, res, next) => {
  try {
    // restrictedForLogin middleware'den token alınır
    const token = req.token;

    // Kullanıcıya başarılı giriş mesajı ve token gönderilir
    res.status(200).json({ message: `Hoş geldiniz, ${req.body.username}`, token });
  } catch (error) {
    next(error);
  }
});

// JWT doğrulama gerektiren korumalı route
router.get('/me', checkAuthentication, async (req, res, next) => {
  try {
    const user = await User.getById(req.decodeToken.id); // Kullanıcı ID ile bilgilerini alıyoruz
    res.status(200).json(user); // Kullanıcı bilgilerini döndürüyoruz
  } catch (error) {
    next(error);
  }
});

module.exports = router;
