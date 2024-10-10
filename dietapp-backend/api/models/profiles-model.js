const db = require('../../config/db-config');

const ProfilesModel = {
  // Yeni profil oluşturma
  async createProfile(profileData) {
    const [newProfile] = await db('profiles').insert(profileData).returning('*');
    return newProfile;
  },

  // Profil güncelleme
  async updateProfile(profileId, profileData) {
    const [updatedProfile] = await db('profiles')
      .where('id', profileId)
      .update(profileData)
      .returning('*');
    return updatedProfile;
  },

  // Profil bilgilerini ID ile alma
  async getProfileById(profileId) {
    return await db('profiles').where('id', profileId).first();
  },

  // Kullanıcı ID'sine göre profil getirme (users_profiles tablosuna JOIN ile)
  async getProfileByUserId(userId) {
    return await db('profiles as p')
      .join('users_profiles as up', 'p.id', 'up.profile_id')
      .where('up.user_id', userId)
      .first();
  },

  // Kullanıcı adıyla profil bilgilerini getirme
  async getProfileByUsername(username) {
    return await db('profiles as p')
      .join('users as u', 'u.id', 'p.user_id')
      .where('u.username', username)
      .select(
        'p.id',
        'p.name',
        'p.surname',
        'p.age',
        'p.gender',
        'p.height',
        'p.weight',
        'p.physical_activity_level',
        'p.objective_of_the_diet',
        'p.diet_preferences',
        'p.foods_allergic_to',
        'p.profile_picture'
      )
      .first();
  },

  // Profil silme
  async deleteProfile(profileId) {
    return await db('profiles').where('id', profileId).del();
  }
};

module.exports = ProfilesModel;
