exports.up = function(knex) {
    return knex.schema.createTable('users_profile', function(table) {
      table.increments('id').primary(); // Otomatik artan id
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.integer('age').notNullable();
      table.string('gender').notNullable(); // Cinsiyet
      table.float('height').notNullable(); // Boy (cm)
      table.float('weight').notNullable(); // Kilo (kg), ondalık destekli
      table.string('physical_activity_level').notNullable(); // Fiziksel Aktivite Seviyesi (option)
      table.string('objective_of_the_diet').notNullable(); // Diyet Hedefi (option)
      table.string('diet_preferences').notNullable(); // Diyet Tercihleri (option)
      table.string('foods_allergic_to'); // Alerjisi olduğu besinler (text)
      table.timestamps(true, true); // created_at, updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users_profile');
  };
  