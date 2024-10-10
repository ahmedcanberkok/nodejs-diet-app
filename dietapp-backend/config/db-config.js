const knex = require('knex');
const knexfile = require('./knexfile'); // Knex yapılandırma dosyası

const environment = process.env.NODE_ENV || 'development'; // Ortam değişkeni
const configOptions = knexfile[environment]; // Ortama göre yapılandırma seçimi

const db = knex(configOptions); // Veritabanı bağlantısını oluştur

module.exports = db;
