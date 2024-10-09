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

// Yeni kullanıcı oluşturur
const create = async (user) => {
  const [newUser] = await db('users').insert(user).returning(['id']);
  return getById(newUser.id);
};

// Kullanıcının doğrulama durumunu günceller
const updateVerificationStatus = (id, status) => {
  return db('users').where({ id }).update({ isVerified: status }).returning('*');
};

// Kullanıcı şifresini doğrular (bcrypt kullanarak)
const validatePassword = async (enteredPassword, storedPasswordHash) => {
  return bcrypt.compareSync(enteredPassword, storedPasswordHash);
};

module.exports = {
  getByEmail,
  getByUsername,
  getById,
  create,
  updateVerificationStatus,
  validatePassword, // Yeni eklenen şifre doğrulama fonksiyonu
};
