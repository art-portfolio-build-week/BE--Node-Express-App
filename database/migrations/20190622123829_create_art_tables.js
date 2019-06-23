
exports.up = function(knex, Promise) {
  return knex.schema

    .createTable('users', (tbl) => {
        tbl.increments();
        tbl.string('author', 128).notNullable().unique();
        tbl.string('email', 128).notNullable().unique();
        tbl.string('password', 128).notNullable();
        tbl.string('dob', 128);
        tbl.string('instagramHandle', 128);
        tbl.string('witterHandle', 128);
    })

    .createTable('posts', (tbl) => {
        tbl.increments();
        tbl.integer('author_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.string('description', 1024).notNullable();
        tbl.string('imgURL').notNullable();
        tbl.integer('votes').unsigned().defaultTo(0);
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('posts');
};
