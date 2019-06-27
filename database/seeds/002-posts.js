//When reseeding check if username_id exists in users table if not will break foreign keys constraints

const faker = require('faker');
const moment = require('moment');

exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert(
        getPosts());
    });
};



function getPosts() {
  const posts = [];
  let post = {};
  const nbrPosts = 35;

  const genres = ['food', 'technics', 'nature', 'city', 'business', 'fashion', 
    'sports', 'abstract', 'nightlife','people','transport']
  const categories = ['photography', 'design', 'illustration' ];
  let urlImgIndex=0;

  for(let i=0; i<nbrPosts; i++) {

    genre = genres[Math.floor(Math.random() * genres.length)]
    urlImgIndex = Math.floor((Math.random() * 10) + 1);
    category = categories[Math.floor(Math.random() * categories.length)]

    post = {
      username_id: Math.floor( (Math.random()*5) + 1 ),    //pick foreign keys among the existing users: check users table
      title: faker.company.catchPhraseDescriptor(),
      description: faker.lorem.paragraph(),
      category: category,
      imgURL: faker.image.imageUrl(640, 480, genre ) + '/' + urlImgIndex,
      votes: 0, 
      timestamp: moment(faker.date.between("2017-01-01", "2019-05-01")).format()
    }

    posts.push(post);
  }

  return posts;
}


