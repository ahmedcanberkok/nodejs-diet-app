// BMR ve TDEE hesaplama fonksiyonları
const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'male') {
      return 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else if (gender === 'female') {
      return 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
  };
  
  const calculateTDEE = (bmr, activityLevel) => {
    let activityFactor;
    switch (activityLevel) {
      case 'low': activityFactor = 1.2; break;
      case 'moderate': activityFactor = 1.55; break;
      case 'high': activityFactor = 1.725; break;
      default: activityFactor = 1.2;
    }
    return bmr * activityFactor;
  };
  
  // Kalori hesaplama middleware'i
  const calculateAndSaveCalories = (req, res, next) => {
    const { height, weight, age, gender, physical_activity_level } = req.body;
  
    // BMR ve TDEE hesaplanıyor
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, physical_activity_level);
  
    // Hesaplanan değerler request içine eklenir
    req.caloricNeeds = { bmr, tdee };
    
    next(); // Sonraki işleme geç
  };
  
  module.exports = {
    calculateAndSaveCalories,
  };
  