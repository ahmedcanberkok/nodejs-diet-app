exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'canberkok', email: 'canberkok@example.com', phone_no: '5556891312', password: '123' },
        { username: 'john_doe', email: 'john@example.com', phone_no: '1234567890', password: '123' },
      ]);
    });
};
