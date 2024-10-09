exports.up = function(knex) {
    return knex.schema.createTable('profiles', function(table) {
      table.increments('id').primary(); // Otomatik artan birincil anahtar
      table.string('name').notNullable(); // İsim alanı
      table.string('surname').notNullable(); // Soyisim alanı
      table.integer('age').notNullable(); // Yaş alanı
      table.string('gender').notNullable(); // Cinsiyet alanı
      table.integer('height').notNullable(); // Boy alanı (cm cinsinden)
      table.decimal('weight', 5, 2).notNullable(); // Kilo alanı (kg cinsinden, 5 basamak, 2 ondalık)
      table.string('physical_activity_level').notNullable(); // Fiziksel aktivite seviyesi
      table.string('objective_of_the_diet').notNullable(); // Diyet hedefi
      table.string('diet_preferences').notNullable(); // Diyet tercihleri
      table.string('foods_allergic_to'); // Alerjik olunan yiyecekler
      table.string('profile_picture'); // Profil resmi alanı
      table.timestamps(true, true); // Oluşturulma ve güncellenme tarihleri
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('profiles'); // Geri alma işlemi
  };
  