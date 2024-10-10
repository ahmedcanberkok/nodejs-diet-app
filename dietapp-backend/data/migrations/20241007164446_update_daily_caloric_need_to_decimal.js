exports.up = function(knex) {
    return knex.schema.alterTable('caloric_needs', function(table) {
      table.decimal('daily_caloric_need', 10, 2).alter(); // Ondalık veri tipi
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('caloric_needs', function(table) {
      table.integer('daily_caloric_need').alter(); // Geri almak için eski duruma çevir
    });
  };
  