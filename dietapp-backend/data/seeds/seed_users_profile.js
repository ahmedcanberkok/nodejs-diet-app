exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_profile').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_profile').insert([
        { 
          user_id: 9, 
          name: 'Canberk', 
          surname: 'Ok', 
          age: 26,
          gender: 'erkek', 
          height: 184, 
          weight: 95.5, 
          physical_activity_level: 'medium', 
          objective_of_the_diet: 'Weight Loss', 
          diet_preferences: 'Vegan', 
          foods_allergic_to: 'Peanuts',
          profile_picture: '',
        }
      ]);
    });
};
