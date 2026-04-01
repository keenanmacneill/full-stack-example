const petsModel = require('./pets.model');

async function getAllPets() {
  return petsModel.getAllPets();
}

async function getSortedPets() {
  return petsModel.getSortedPets();
}

async function getPetById(id) {
  return petsModel.getPetById(id);
}

async function getPetsByType(type) {
  return petsModel.getPetsByType(type);
}

async function getLimitedPets(limit) {
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
    return [];
  }

  return petsModel.getLimitedPets(parsedLimit);
}

async function createPet(body) {
  if (!body.name || !body.type) {
    return { status: 400, error: 'Name and type are required.' };
  }

  const petType = await petsModel.getPetTypeByName(body.type);

  if (!petType) {
    return { status: 400, error: 'Invalid pet type.' };
  }

  return petsModel.createPet({
    name: body.name,
    pet_type_id: petType.id,
  });
}

async function updatePetName(id, body) {
  if (!body.name) {
    return { status: 400, error: 'Name is required.' };
  }

  const updatedPet = await petsModel.updatePetName(id, body.name);

  if (!updatedPet) {
    return { status: 404, error: 'Pet not found.' };
  }

  return updatedPet;
}

async function deletePet(id) {
  const deletedPet = await petsModel.deletePet(id);

  if (!deletedPet) {
    return { status: 404, error: 'Pet not found.' };
  }

  return deletedPet;
}

module.exports = {
  getAllPets,
  getSortedPets,
  getPetById,
  getPetsByType,
  getLimitedPets,
  createPet,
  updatePetName,
  deletePet,
};
