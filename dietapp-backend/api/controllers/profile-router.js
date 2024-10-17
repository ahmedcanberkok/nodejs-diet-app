const express = require('express');
const router = express.Router();
const db = require('../../config/db-config'); // PostgreSQL bağlantısı için

const profileMiddleware = require('../middlewares/profile-middleware');
const caloriesMiddleware = require('../middlewares/calories-middleware');
const ProfilesModel = require('../models/profiles-model');
const UsersModel = require('../models/users-model');



// Profil oluşturma
router.post(
  '/create',
  profileMiddleware.validateUser,                  // Kullanıcı doğrulama
  profileMiddleware.restrictedForProfileCreation,  // Profil oluşturma kısıtlaması
  caloriesMiddleware.calculateAndSaveCalories,// Kalori hesaplama ve kaydetme
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


      // Profil oluşturma işlemi ve OUT parametre ile profile_id'yi alma
      const profileResult = await db.raw(
        `CALL create_user_profile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

      // users_profiles tablosunda profile_id güncelleniyor
      await UsersProfilesModel.updateUserProfileRelation(user_id, profile_id);

      // Kullanıcının isVerified durumu true yapılıyor (models'de güncellendi)
      await UsersModel.updateVerificationStatus(user_id, true);

      // Kalori ihtiyacını save_caloric_need prosedürü ile kaydet
      await db.raw('CALL save_caloric_need(?, ?,?)', [profile_id, user_id, req.caloricNeeds.tdee]);

      res.status(201).json({
        message: "Profil başarıyla oluşturuldu ve kalori ihtiyacı hesaplandı.",
        profile: {
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
        },
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
  caloriesMiddleware.calculateAndSaveCalories,
  async (req, res, next) => {
    try {
      const profileData = { ...req.body };

      // Mevcut profili güncelleme
      const updatedProfile = await ProfilesModel.updateProfile(req.profile.id, profileData);


      // profile_id ve user_id'yi buradan çekiyoruz
      const profile_id = req.profile.id;      // Profil ID'si burada req.profile.id'den alınır
      const user_id = req.decodeToken.id;     // Kullanıcı ID'si JWT token'dan alınır

      const updatedCaloricNeeds = req.caloricNeeds; // caloriesMiddleware'in sonucundan alınan yeni değer
      // Veritabanındaki caloric_needs tablosunu güncelle
      await db.raw('CALL save_caloric_need(?, ?,?)', [profile_id, user_id, req.caloricNeeds.tdee]);

     
      res.status(200).json({ 
        message: "Profil başarıyla güncellendi ve kalori ihtiyacı yeniden hesaplandı.", 
        profile: updatedProfile,
        caloricNeeds: updatedCaloricNeeds
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
