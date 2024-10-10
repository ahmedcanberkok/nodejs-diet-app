const db = require('../../config/db-config'); // PostgreSQL bağlantısı
const { generateLoginToken } = require('./auth-token-middleware');

// Giriş kontrolü için middleware (Login doğrulama)
const restrictedForLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // PostgreSQL'deki login procedure'ü çağır
    const result = await db.raw(`SELECT * FROM verify_user_login(?, ?)`, [username, password]);

    //result rows boş dönerse hata fırlat  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre." });
}

    const { p_user_id: user_id, p_profile_id: profile_id, p_is_verified: is_verified } = result.rows[0];

    if (is_verified) {
      // Token oluşturuluyor
      const token = generateLoginToken({
        id: user_id,
        profile_id: profile_id,
      });

      req.token = token; // Tokenı response'a ekliyoruz
      next(); // Giriş işlemi başarılı, bir sonraki işleme geçiyoruz
    } else {
      return res.status(403).json({ message: "Lütfen önce profilinizi oluşturun." });
    }
  } catch (error) {
    if (error.message.includes('Geçersiz kullanıcı adı veya şifre')) {
      return res.status(401).json({ message: error.message });
    } else if (error.message.includes('Kullanıcı doğrulanmadı')) {
      return res.status(403).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  restrictedForLogin,
};
