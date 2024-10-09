exports.up = function(knex) {
    return knex.schema.table('users_profile', function(table) {
      table.text('profile_picture'); // Base64 formatındaki profil fotoğrafını saklamak için
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users_profile', function(table) {
      table.dropColumn('profile_picture');
    });
  };
  