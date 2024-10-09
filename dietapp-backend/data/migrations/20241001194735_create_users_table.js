exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // Otomatik artan id (primary key)
      table.string('username').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone_no').notNullable();
      table.string('password').notNullable();
      table.boolean('isVerified').defaultTo(false);
      table.timestamps(true, true); // created_at, updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
