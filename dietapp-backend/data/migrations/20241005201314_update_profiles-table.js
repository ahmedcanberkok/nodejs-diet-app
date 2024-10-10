exports.up = function(knex) {
    return knex.schema.alterTable('profiles', function(table) {
      table.string('profile_picture').nullable().alter(); // Profil resmi nullable olarak ayarlanıyor
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('profiles', function(table) {
      table.string('profile_picture').notNullable().alter(); // Profil resmi nullable değil, zorunlu yapılıyor
    });
  };
  