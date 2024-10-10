// 20241001123510_create_users_profiles_table.js
exports.up = function(knex) {
    return knex.schema.createTable('users_profiles', function(table) {
      table.increments('id').primary(); // Otomatik artan id
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('profile_id').unsigned().references('id').inTable('profiles').onDelete('SET NULL');
      table.unique(['user_id']); // Her user_id için bir profil olabilir
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users_profiles');
  };
  