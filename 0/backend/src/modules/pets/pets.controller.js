const petsService = require('./pets.service');

async function getAllPets(req, res) {
  try {
    const pets = await petsService.getAllPets();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets.' });
  }
}

async function getSortedPets(req, res) {
  try {
    const pets = await petsService.getSortedPets();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets.' });
  }
}

async function getPetById(req, res) {
  try {
    const pet = await petsService.getPetById(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found.' });
    }

    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pet.' });
  }
}

async function getPetsByType(req, res) {
  try {
    const pets = await petsService.getPetsByType(req.params.type);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets.' });
  }
}

async function getLimitedPets(req, res) {
  try {
    const pets = await petsService.getLimitedPets(req.params.limit);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets.' });
  }
}

async function createPet(req, res) {
  try {
    const newPet = await petsService.createPet(req.body);

    if (newPet.error) {
      return res.status(newPet.status).json({ error: newPet.error });
    }

    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create pet.' });
  }
}

async function updatePetName(req, res) {
  try {
    const updatedPet = await petsService.updatePetName(req.params.id, req.body);

    if (updatedPet.error) {
      return res.status(updatedPet.status).json({ error: updatedPet.error });
    }

    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update pet.' });
  }
}

async function deletePet(req, res) {
  try {
    const deletedPet = await petsService.deletePet(req.params.id);

    if (deletedPet.error) {
      return res.status(deletedPet.status).json({ error: deletedPet.error });
    }

    res.json(deletedPet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete pet.' });
  }
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
