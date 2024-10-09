// 20241005150001_update_calories_table.js
exports.up = function(knex) {
    return knex.schema.table('calories', function(table) {
      table.renameColumn('daily_caloric_need', 'daily_caloric_limit'); // Kolon ismini değiştiriyoruz
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('calories', function(table) {
      table.renameColumn('daily_caloric_limit', 'daily_caloric_need'); // Geri alma işlemi (down migration)
    });
  };
  