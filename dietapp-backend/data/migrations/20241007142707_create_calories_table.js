// 20241005100003_create_calories_table.js
exports.up = function(knex) {
    return knex.schema.createTable('calories', function(table) {
      table.increments('id').primary(); // Otomatik artan id (primary key)
      table.integer('profile_id').unsigned().notNullable().references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('daily_caloric_need').notNullable(); // Günlük kalori ihtiyacı
      table.integer('remaining_calories').notNullable(); // Kalan kalori miktarı
      table.date('date').notNullable(); // Kalori takibi için tarih
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('calories'); // Tabloyu sil
  };
  