const db = require('../../db/knex');

function basePetQuery() {
  return db('pet')
    .join('pet_type', 'pet.pet_type_id', 'pet_type.id')
    .select('pet.id', 'pet.name', 'pet_type.name as type');
}

function getAllPets() {
  return basePetQuery();
}

function getSortedPets() {
  return basePetQuery().orderBy('pet.name');
}

function getPetById(id) {
  return basePetQuery().where('pet.id', id).first();
}

function getPetsByType(type) {
  return basePetQuery().where('pet_type.name', type);
}

function getLimitedPets(limit) {
  return basePetQuery().limit(limit);
}

function getPetTypeByName(typeName) {
  return db('pet_type').where('name', typeName).first();
}

async function createPet(petData) {
  const inserted = await db('pet').insert(petData).returning('*');

  return inserted[0];
}

async function updatePetName(id, name) {
  const updated = await db('pet')
    .where('id', id)
    .update({ name })
    .returning('*');

  return updated[0];
}

async function deletePet(id) {
  const deleted = await db('pet').where('id', id).del().returning('*');

  return deleted[0];
}

module.exports = {
  getAllPets,
  getSortedPets,
  getPetById,
  getPetsByType,
  getLimitedPets,
  getPetTypeByName,
  createPet,
  updatePetName,
  deletePet,
};
