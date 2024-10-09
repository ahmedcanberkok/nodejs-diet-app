// 20241005100001_create_caloric_needs_table.js
exports.up = function(knex) {
    return knex.schema.createTable('caloric_needs', function(table) {
      table.increments('id').primary(); // Otomatik artan id (primary key)
      table.integer('profile_id').unsigned().notNullable().references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('daily_caloric_need').notNullable(); // Günlük kalori ihtiyacı
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('caloric_needs'); // Tabloyu sil
  };
  