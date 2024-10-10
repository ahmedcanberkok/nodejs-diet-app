const db = require('../../config/db-config');

// Kullanıcı ve profil ilişkilendirmesi ekle
const createUserProfileRelation = async (user_id) => {
  await db('users_profiles').insert({ user_id, profile_id: null });
};

// Kullanıcı ve profil ilişkisini getir
const getUserProfileRelation = async (user_id) => {
  return db('users_profiles').where({ user_id }).first();
};

// Kullanıcı ve profil ilişkisini güncelle
const updateUserProfileRelation = async (user_id, profile_id) => {
  return db('users_profiles').where({ user_id }).update({ profile_id });
};

module.exports = {
  createUserProfileRelation,
  getUserProfileRelation,
  updateUserProfileRelation,
};
