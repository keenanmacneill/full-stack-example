const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(process.cwd(), 'src/db/migrations'),
    },
    seeds: {
      directory: path.join(process.cwd(), 'src/db/seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(process.cwd(), 'src/db/migrations'),
    },
    seeds: {
      directory: path.join(process.cwd(), 'src/db/seeds'),
    },
  },
};
