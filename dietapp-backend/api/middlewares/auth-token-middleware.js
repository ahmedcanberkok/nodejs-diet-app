const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');

// Login Token oluşturma
const generateLoginToken = (user) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET tanımlı değil.");
  }

  const payload = {
    id: user.id,
    username: user.username,
    profile_id: user.profile_id,
  };
  const options = {
    expiresIn: "3h",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

// E-posta doğrulama Token oluşturma
const generateVerificationToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

// JWT doğrulama
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
  generateVerificationToken,
  checkAuthentication,
};
