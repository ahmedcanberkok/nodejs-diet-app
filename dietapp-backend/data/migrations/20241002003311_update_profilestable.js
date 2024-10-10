// 20241001123500_rename_users_profile_to_profiles.js
exports.up = function(knex) {
    return knex.schema.renameTable('users_profile', 'profiles') // Tablo adını değiştir
      .then(() => {
        return knex.schema.alterTable('profiles', function(table) {
          table.dropColumn('user_id'); // user_id kolonunu kaldır
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.renameTable('profiles', 'users_profile')
      .then(() => {
        return knex.schema.table('users_profile', function(table) {
          table.integer('user_id').unsigned().notNullable();
        });
      });
  };
  