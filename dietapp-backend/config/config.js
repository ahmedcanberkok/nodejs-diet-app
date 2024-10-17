require('dotenv').config();  // .env dosyasını yüklemek

module.exports = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HASH_ROUND: process.env.HASH_ROUND || 8,
  JWT_SECRET: process.env.JWT_SECRET || '600b41e0b7de02c8bc9e75ecec745d9e248d65aa69ddd744e01eee72644372de', // Eğer .env'de yoksa varsayılan bir değer
};
