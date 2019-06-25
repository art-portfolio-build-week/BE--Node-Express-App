const db = require('../../config/database/dbConfig');

function findAll() {
        return db.select('posts.*', 'users.username')
            .from('posts')
            .leftJoin('users', 'users.id', 'posts.username_id')
}

function findBy(filter) {
    return db('posts').where(filter).first();
}

function add(post) {
    return db('posts').insert(post, 'id')
        .then( ids => {
            return db('posts')
            .where({id: ids[0]})
            .first()
        }
    );
}

function update(id, changes) {
    return db('posts')
    .where(id)
    .update(changes)
}

module.exports = {
    findAll,
    findBy,
    add,
    update,
}