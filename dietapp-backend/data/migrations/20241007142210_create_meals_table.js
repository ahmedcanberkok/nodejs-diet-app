// 20241005100002_create_meals_table.js
exports.up = function(knex) {
    return knex.schema.createTable('meals', function(table) {
      table.increments('id').primary(); // Otomatik artan id (primary key)
      table.integer('profile_id').unsigned().notNullable().references('id').inTable('profiles').onDelete('CASCADE');
      table.string('meal_type').notNullable(); // Kahvaltı, Öğle, Akşam, Ara Öğün
      table.text('requested_foods'); // Kullanıcının olmasını istediği besinler
      table.text('excluded_foods'); // Kullanıcının olmamasını istediği besinler
      table.timestamp('meal_time').defaultTo(knex.fn.now()); // Öğünün zamanı
      table.decimal('total_calories', 5, 2); // Öğünün toplam kalori miktarı
      table.boolean('is_completed').defaultTo(false); // Başlangıçta false, tamamlandığında true olacak
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('meals'); // Tabloyu sil
  };
  