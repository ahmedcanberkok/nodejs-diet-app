// 20241005100004_create_meal_history_table.js
exports.up = function(knex) {
    return knex.schema.createTable('meal_history', function(table) {
      table.increments('id').primary(); // Otomatik artan id (primary key)
      table.integer('profile_id').unsigned().notNullable().references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('meal_id').unsigned().notNullable().references('id').inTable('meals').onDelete('CASCADE');
      table.timestamp('meal_time').notNullable(); // Öğünün tarihi ve saati
      table.text('requested_foods'); // O gün istenilen besinler
      table.text('excluded_foods'); // O gün istenmeyen besinler
      table.decimal('total_calories', 5, 2); // O öğünün toplam kalori miktarı
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('meal_history'); // Tabloyu sil
  };
  