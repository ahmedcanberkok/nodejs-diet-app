exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.renameColumn('isVerified', 'isverified'); // Sütun adını küçük harf yapıyoruz
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.renameColumn('isverified', 'isVerified'); // Eğer geri alınırsa sütunu eski haline getiriyoruz
    });
  };
  