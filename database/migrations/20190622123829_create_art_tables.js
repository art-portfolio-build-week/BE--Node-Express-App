
exports.up = function(knex, Promise) {
  return knex.schema

    .createTable('users', (tbl) => {
        tbl.increments();
        tbl.string('username', 128).notNullable().unique();
        tbl.string('email', 128).notNullable().unique();
        tbl.string('password', 128).notNullable();
        tbl.string('dob', 128);
        tbl.string('uvp', 512);
        tbl.bigint('phone').unsigned();
    })

    .createTable('posts', (tbl) => {
        tbl.increments();
        tbl.integer('username_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.string('description', 1024).notNullable();
        tbl.string('title', 256).notNullable();
        tbl.string('category', 128).notNullable();
        tbl.string('timestamp', 128).notNullable();        
        tbl.string('imgURL').notNullable();
        tbl.integer('votes').unsigned().defaultTo(0);
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('posts')
        .dropTableIfExists('users');
};
