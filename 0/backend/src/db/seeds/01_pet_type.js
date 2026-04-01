const { generatePetTypes } = require('./helpers/generatePetTypes');

exports.seed = async function (knex) {
  const petTypes = generatePetTypes(10);

  await knex.raw('TRUNCATE TABLE pet_type RESTART IDENTITY CASCADE');
  await knex('pet_type').insert(petTypes);
};
