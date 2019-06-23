
const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  
  return knex('users').truncate()  // Deletes ALL existing entries and reset primary key
    .then(function () {
      return knex('users').insert(
        createUsers()
      );
    });
};

function createUsers() {
  const users = [];
  let user = {};
  const nbrUsers = 5;

  for(let i=0; i<nbrUsers; i++) {
    user = {
      author: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('pass'),
      dob: faker.date.between("1950-01-01", "2000-01-01"),
      instagramHandle: faker.internet.userName(),
      witterHandle: faker.internet.userName()
    }
    users.push(user);
  }

  return users
}
