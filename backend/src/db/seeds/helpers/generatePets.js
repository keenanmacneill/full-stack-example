const { faker } = require('@faker-js/faker');
const { generateInt } = require('./generateInt');

exports.generatePets = num => [
  {
    name: faker.animal.petName(),
    pet_type_id: generateInt(1, 10),
  },

  ...Array.from({ length: num - 1 }, () => ({
    name: faker.animal.petName(),
    pet_type_id: generateInt(1, 10),
  })),
];
