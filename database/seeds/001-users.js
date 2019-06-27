
const faker = require('faker');
const moment = require('moment');
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  
  return knex('users').del()  // Deletes ALL existing entries and reset primary key
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
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('pass'),
      dob: moment(faker.date.between("1950-01-01", "2000-01-01")).format('L'),
      uvp: faker.company.bs(),
      phone: Math.floor((Math.random()+1)*10000000000)
    }
    users.push(user);
  }
  return users
}
