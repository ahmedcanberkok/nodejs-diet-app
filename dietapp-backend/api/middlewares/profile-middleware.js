//Profile-middleware
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/config');
const UsersProfilesModel = require('../models/users-profiles-model');
const ProfilesModel = require('../models/profiles-model');

// Kullanıcının doğrulama işlemi (token doğrulaması)
const validateUser = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Token gereklidir" });
  }

  const token = tokenHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decodeToken) => {
    if (err) {
      return res.status(401).json({ message: "Token geçersizdir" });
    }

    req.decodeToken = decodeToken;
    next();
  });
};

// Kullanıcının profilinin olup olmadığını kontrol eden middleware
const checkUserProfileExists = async (req, res, next) => {
  try {
    const user_id = req.decodeToken.id;
    console.log('User ID from token:', user_id);

    const userProfileRelation = await UsersProfilesModel.getUserProfileRelation(user_id);
    console.log('User Profile Relation:', userProfileRelation);

    if (userProfileRelation && userProfileRelation.profile_id) {

      const profile = await ProfilesModel.getProfileById(userProfileRelation.profile_id);
      console.log('Profile from DB:', profile);

      if (profile) {
        req.profile = profile; 
        console.log('Profile successfully found, proceeding to next middleware.');

        return next();
      } else {
        console.log('Profile found in relation but not in profiles table.');
      }
    } 

    return res.status(404).json({ message: "Bu kullanıcıya ait profil bulunamadı. Lütfen profil oluşturun!" });
  } catch (err) {
    next(err);
  }
};

// Profil oluşturulmadan önce kontrol edilen middleware
const restrictedForProfileCreation = async (req, res, next) => {
  try {
    const user_id = req.decodeToken.id;

    const existingProfile = await UsersProfilesModel.getUserProfileRelation(user_id);
    if (existingProfile && existingProfile.profile_id) {
      return res.status(400).json({ message: "Bu kullanıcının zaten bir profili var." });
    }

    next(); 
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateUser,
  restrictedForProfileCreation,
  checkUserProfileExists,
};
