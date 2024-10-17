const db = require('../../config/db-config'); // Knex yapılandırmasını kullanıyoruz
const bcrypt = require('bcryptjs');

// E-posta ile kullanıcıyı bulur
const getByEmail = (email) => {
  return db('users').where('email', email).first();
};

// Kullanıcı adı ile kullanıcıyı bulur
const getByUsername = (username) => {
  return db('users').where('username', username).first();
};

// ID ile kullanıcıyı bulur
const getById = (id) => {
  return db('users').where('id', id).first();
};


const create = async (user) => {
  const [newUser] = await db('users')
    .insert({
      username: user.username,
      email: user.email,
      phone_no: user.phone_no,
      password: user.password,
      isverified: false, // Varsayılan olarak false
      created_at: new Date(), // Oluşturulma zamanı
      updated_at: new Date(), // Güncellenme zamanı
    })
    .returning(['id', 'username', 'email', 'phone_no', 'isverified', 'created_at', 'updated_at']); // Dönen alanlar
  return newUser;
};

// Kullanıcının doğrulama durumunu günceller
const updateVerificationStatus = (id, status) => {
  return db('users').where({ id }).update({ isverified: status }).returning('*');
};


module.exports = {
  getByEmail,
  getByUsername,
  getById,
  create,
  updateVerificationStatus,
   // Yeni eklenen şifre doğrulama fonksiyonu
};
