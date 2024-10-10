const db = require('../../config/db-config');

// CaloricNeeds tablosuna yeni kalori ihtiyacı ekleme
const createCaloricNeed = async (profile_id, daily_caloric_need) => {
  return await db('caloric_needs').insert({
    profile_id,
    daily_caloric_need,
    created_at: db.fn.now(),
    updated_at: db.fn.now()
  });
};

// CaloricNeeds tablosunda var olan kalori ihtiyacını güncelleme
const updateCaloricNeed = async (profile_id, daily_caloric_need) => {
  return await db('caloric_needs')
    .where({ profile_id })
    .update({
      daily_caloric_need,
      updated_at: db.fn.now()
    });
};

module.exports = {
  createCaloricNeed,
  updateCaloricNeed
};
