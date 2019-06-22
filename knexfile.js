require("dotenv").config();
const pg = require('pg');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/art.db3'
    },
    useNullAsDefault:true,

    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);  //Enforce foreign keys
      },
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);  //Enforce foreign keys
      },
    }
  },

  production: {
    client: 'pg',

    connection: process.env.DATABASE_URL,

    migrations: {
      directory: './database/migrations',
    },

    seeds: {
      directory: './database/seeds',
    },
  }

};
