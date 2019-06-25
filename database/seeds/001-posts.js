const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('posts').truncate()
    .then(function () {
      return knex('posts').insert(
        getPosts());
    });
};

function getPosts() {
  const posts = [];
  let post = {};
  const nbrPosts = 35;

  topics = ['food', 'technics', 'nature', 'city', 'business', 'fashion', 
    'sports', 'abstract', 'nightlife','people','transport']

  for(let i=0; i<nbrPosts; i++) {
    post = {
      username_id: Math.floor( (Math.random()*5) + 1 ),    //pick foreign keys among the initial users
      description: faker.company.bs(),
      imgURL: faker.image.imageUrl(640, 480, getTopic() ),
      votes: 0
    }
    posts.push(post);
  }

  return posts;
}

function getTopic() {
  return topics[Math.floor(Math.random() * topics.length)]
}

