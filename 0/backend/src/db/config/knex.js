const knex = require('knex');
const config = require('../../../knexfile');

const env = process.env.NODE_ENV || 'development';

if (!config[env]) {
  throw new Error(`Missing knex configuration for environment: ${env}`);
}

console.log(`Using DB environment: ${env}`);

const db = knex(config[env]);

module.exports = db;
