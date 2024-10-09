exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.boolean('isVerified').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('isVerified');
    });
  };
  