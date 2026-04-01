const express = require('express');
const router = express.Router();
const petsController = require('./pets.controller');

router.get('/', petsController.getAllPets);
router.get('/sort', petsController.getSortedPets);
router.get('/type/:type', petsController.getPetsByType);
router.get('/limit/:limit', petsController.getLimitedPets);
router.get('/:id', petsController.getPetById);
router.post('/', petsController.createPet);
router.patch('/:id', petsController.updatePetName);
router.delete('/:id', petsController.deletePet);

module.exports = router;
