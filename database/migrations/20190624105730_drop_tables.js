
exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
};

exports.down = function(knex, Promise) {
  
};
