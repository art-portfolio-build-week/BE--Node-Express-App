const db = require('../../config/database/dbConfig');

function findBy(filter) {
    return db('users').where(filter).first();
}

function findPostsByAuthorId(id) {
    return db('posts')
        .where('username_id', id);
}

module.exports = {
    findBy,
    findPostsByAuthorId
}