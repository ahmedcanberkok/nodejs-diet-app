const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PORT } = require('../config/config'); // Port bilgisi config'den geliyor

// Route'lar (auth ve profile router'ları)
const authRouter = require('./controllers/auth-router');
const profileRouter = require('./controllers/profile-router');

// Express instance oluşturma
const app = express();

// Global middleware'ler
app.use(helmet()); // Güvenlik için Helmet
app.use(cors()); // CORS yönetimi
app.use(morgan('dev')); // İstekleri loglamak için Morgan
app.use(express.json()); // JSON verilerini parse etme

// Ana route
app.get('/', (req, res) => {
  res.json({ message: 'Server is up and running!' });
});

// Route'ları ekle
app.use('/api/auth', authRouter); // Auth işlemleri için route
app.use('/api/profile', profileRouter); // Profil işlemleri için route

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack); // Hata loglama
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Sunucuyu başlatma
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

module.exports = app; // Sunucuyu dışa aktar
