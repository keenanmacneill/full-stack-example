const { generatePets } = require('./helpers/generatePets.js');

exports.seed = async function (knex) {
  const pets = generatePets(50);

  await knex.raw('TRUNCATE TABLE pet RESTART IDENTITY CASCADE');
  await knex('pet').insert(pets);
};
