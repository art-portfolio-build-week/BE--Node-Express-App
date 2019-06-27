const db = require('../../config/database/dbConfig');

function findAll() {
        return db.select('posts.*', 'users.username')
            .from('posts')
            .leftJoin('users', 'users.id', 'posts.username_id')
            .orderBy('id')

}

function findBy(filter) {
    return db('posts').where(filter).first();
}

// function findAuthorOfPost(id) {
//     console.log("in Model:");
//     console.log(id)
//     return db.select('posts.id', 'username_id', 'users.username')
//         .from('users')
//         .leftJoin('posts', 'users.id', 'posts.username_id')
//         // .where('posts.id', id)
//         // .first()
// }

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
    .then(count => {
        if (count > 0) 
            return findBy(id);
        else 
            return null;
    });
}

module.exports = {
    findAll,
    findBy,
    add,
    update,
}