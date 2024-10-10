module.exports = {
  development: {
    client: 'pg', // PostgreSQL kullanacağımızı belirtir
    connection: {
      host: '127.0.0.1', // Eğer local'de çalışıyorsanız
      user: process.env.PG_USER || 'postgres', // PostgreSQL kullanıcı adı
      password: process.env.PG_PASSWORD || 'admin', // PostgreSQL şifre
      database: process.env.PG_DATABASE || 'diet_app', // PostgreSQL veritabanı adı
      port: process.env.PG_PORT || 5432, // PostgreSQL portu
    },
    migrations: {
      directory: '../data/migrations', // Migration dosyalarının saklanacağı yer
    },
    seeds: {
      directory: '../data/seeds', // Seed dosyalarının saklanacağı yer
    },
  },
};

  