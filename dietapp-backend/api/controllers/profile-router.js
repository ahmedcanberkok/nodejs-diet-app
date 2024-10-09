const express = require('express');
const router = express.Router();
const db = require('../../config/db-config'); // PostgreSQL bağlantısı için
const profileMiddleware = require('../middlewares/profile-middleware');
const { calculateAndSaveCalories } = require('../middlewares/calories-middleware');


router.post(
  '/create',
  profileMiddleware.validateUser,                  // Kullanıcı doğrulama
  profileMiddleware.restrictedForProfileCreation,  // Profil oluşturma kısıtlaması
  calculateAndSaveCalories,                        // Kalori hesaplama ve kaydetme
  async (req, res, next) => {
    try {
      const user_id = req.decodeToken.id;
      const { 
        name, 
        surname, 
        age, 
        gender, 
        height, 
        weight, 
        physical_activity_level, 
        objective_of_the_diet, 
        diet_preferences, 
        foods_allergic_to, 
        profile_picture 
      } = req.body;

      // Profil oluşturma ve OUT parametre ile profile_id'yi alma
      const profileResult = await db.raw(
        `CALL create_user_profile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,  // Burada bir ? azaltıldı
        [
          user_id, 
          name, 
          surname, 
          age, 
          gender, 
          height, 
          weight, 
          physical_activity_level, 
          objective_of_the_diet, 
          diet_preferences, 
          foods_allergic_to, 
          profile_picture || null // Profil resmi yoksa null atanıyor
        ]
      );

      // OUT parametre ile dönen profile_id'yi alıyoruz
      const profile_id = profileResult.rows[0].p_profile_id;

      // Kalori ihtiyacını save_caloric_need prosedürü ile kaydet (user_id ve profile_id dahil)
      await db.raw('CALL save_caloric_need(?, ?, ?)', [profile_id, user_id, req.caloricNeeds.tdee]);

      res.status(201).json({
        message: "Profil başarıyla oluşturuldu ve kalori ihtiyacı hesaplandı.",
        caloricNeeds: req.caloricNeeds, // Kalori hesaplama sonucu
      });
    } catch (error) {
      next(error);
    }
  }
);



// Profil güncelleme
router.put(
  '/update',
  profileMiddleware.validateUser,             // Kullanıcı doğrulaması
  profileMiddleware.checkUserProfileExists,   // Profilin olup olmadığını kontrol et
  calculateAndSaveCalories,                   // Kalori hesaplama middleware'i
  async (req, res, next) => {
    try {
      const user_id = req.decodeToken.id;  // Token'dan user_id alınıyor
      const { 
        name, surname, age, gender, height, weight, physical_activity_level, 
        objective_of_the_diet, diet_preferences, foods_allergic_to, profile_picture 
      } = req.body;

      // Profil güncelleme işlemi
      await db('profiles')
        .where('id', req.profile.id)
        .update({
          name,
          surname,
          age,
          gender,
          height,
          weight,
          physical_activity_level,
          objective_of_the_diet,
          diet_preferences,
          foods_allergic_to,
          profile_picture: profile_picture || null,
        });

      // Günlük kalori ihtiyacını save_caloric_need prosedürü ile güncelle
      // Burada 3 parametre geçiyoruz: profile_id, user_id, caloric_need
      await db.raw('CALL save_caloric_need(?, ?, ?)', [req.profile.id, user_id, req.caloricNeeds.tdee]);

      res.status(200).json({
        message: "Profil başarıyla güncellendi ve kalori ihtiyacı güncellendi.",
        caloricNeeds: req.caloricNeeds, // Kalori hesaplama sonucu
      });
    } catch (error) {
      next(error);
    }
  }
);

// Kullanıcının mevcut profilini alma
router.get(
  '/me',
  profileMiddleware.validateUser,             // Kullanıcı doğrulaması
  profileMiddleware.checkUserProfileExists,   // Profilin olup olmadığını kontrol et
  async (req, res) => {
    res.status(200).json(req.profile);        // Kullanıcının profil bilgilerini döndür
  }
);

module.exports = router;
