// 20241001123456_reset_users_and_profiles_tables.js
exports.up = function(knex) {
    return knex.schema
      .raw('TRUNCATE TABLE users_profile CASCADE') // users_profile tablosunu sıfırla
      .raw('TRUNCATE TABLE users CASCADE');       // users tablosunu sıfırla
  };
  
  exports.down = function(knex) {
    // Geriye alma işlemi için bir şey yapmanıza gerek yok
  };
  