const db = require('../../config/database/dbConfig');

function findAll() {
        return db.select('posts.*', 'users.author')
            .from('posts')
            .leftJoin('users', 'users.id', 'posts.author_id')
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
    console.log('id: ', id);
    console.log('changes: ', changes);
    return db('posts')
    .where(id)
    .update(changes)
}

module.exports = {
    findAll,
    add,
    update,
}