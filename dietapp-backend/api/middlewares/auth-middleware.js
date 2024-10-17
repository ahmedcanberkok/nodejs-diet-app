const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = require('../../config/config');
const UsersModel = require('../models/users-model'); // User modeli
const UsersProfilesModel = require('../models/users-profiles-model'); // User-Profile modeli

// Şifre doğrulama işlevi (bcrypt ile)
const verifyPassword = (hashedPassword, plainPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword); // Hashlenmiş şifre ile girilen şifreyi karşılaştır
};
// Login token oluşturma middleware'i
const generateLoginToken = (user) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET tanımlı değil.");
  }

  const payload = {
    id: user.id,
    username: user.username,
    profile_id: user.profile_id,
    isVerified: user.isVerified, // Kullanıcının profil oluşturup oluşturmadığını kontrol ediyoruz
  };
  const options = {
    expiresIn: "3h",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

// Giriş kontrolü için middleware (Login doğrulama)
const restrictedForLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Kullanıcının login bilgilerini kontrol et
    const user = await UsersModel.getByUsername(username);
    if (!user || !verifyPassword(user.password, password)) { // Artık direkt verifyPassword kullanılıyor
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // Kullanıcının profilinin olup olmadığını kontrol et
    const token = generateLoginToken({
      id: user.id,
      username: user.username,
      profile_id: user.profile_id,
      isverified: user.isverified,
    });

    res.status(200).json({ message: `Hoş geldiniz, ${username}`, token });
  } catch (error) {
    next(error);
  }
};

// JWT doğrulama middleware'i (Token kontrolü)
const checkAuthentication = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).json({ message: "Token gereklidir" });
  }

  const token = tokenHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Token geçersizdir" });
    }

    req.decodeToken = decodedToken;
    next();
  });
};



module.exports = {
  generateLoginToken,
  restrictedForLogin,
  checkAuthentication,
  verifyPassword
};
