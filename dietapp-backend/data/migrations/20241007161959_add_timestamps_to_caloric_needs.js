exports.up = function(knex) {
    return knex.schema.table('caloric_needs', function(table) {
      table.timestamp('created_at').defaultTo(knex.fn.now());  // Oluşturulma zamanı
      table.timestamp('updated_at').defaultTo(knex.fn.now());  // Güncellenme zamanı
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('caloric_needs', function(table) {
      table.dropColumn('created_at'); // Geri alma işlemi için created_at kolonunu sil
      table.dropColumn('updated_at'); // Geri alma işlemi için updated_at kolonunu sil
    });
  };
  