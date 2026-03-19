const express = require('express');
const knex = require('knex')(require('./knexfile')['development']);

const app = express();
const port = 8081;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get('/pets', (req, res) => {
  knex('pet')
    .join('pet_type', 'pet.pet_type_id', 'pet_type.id')
    .select('pet.id', 'pet.name', 'pet_type.name as type')
    .then(pets => {
      res.json(pets);
    });
});

app.get('/pets/sort', (req, res) => {
  knex('pet')
    .join('pet_type', 'pet.pet_type_id', 'pet_type.id')
    .select('pet.id', 'pet.name', 'pet_type.name as type')
    .orderBy('pet.name')
    .then(pets => {
      res.json(pets);
    });
});

app.get('/pets/:id', (req, res) => {
  knex('pet')
    .join('pet_type', 'pet.pet_type_id', 'pet_type.id')
    .where('pet.id', req.params.id)
    .select('pet.id', 'pet.name', 'pet_type.name as type')
    .first()
    .then(pet => {
      res.json(pet);
    });
});

app.get('/pets/type/:type', (req, res) => {
  knex('pet')
    .join('pet_type', 'pet.pet_type_id', 'pet_type.id')
    .select('pet.id', 'pet.name', 'pet_type.name as type')
    .where('pet_type.name', req.params.type)
    .then(pets => {
      res.json(pets);
    });
});

app.get('/pets/limit/:limit', (req, res) => {
  knex('pet')
    .join('pet_type', 'pet.pet_type_id', 'pet_type.id')
    .select('pet.id', 'pet.name', 'pet_type.name as type')
    .limit(req.params.limit)
    .then(pets => {
      res.json(pets);
    });
});

app.post('/pets', async (req, res) => {
  try {
    if (!req.body.name || !req.body.type) {
      return res.status(400).json({ error: 'Name and type are required.' });
    }

    const type = await knex('pet_type').where('name', req.body.type).first();

    if (!type) {
      return res.status(400).json('Invalid pet type.');
    }

    const newPet = await knex('pet')
      .insert({
        name: req.body.name,
        pet_type_id: type.id,
      })
      .returning('*');

    res.status(201).json(newPet[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.patch('/pets/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const updatedPet = await knex('pet')
      .where('pet.id', req.params.id)
      .update({ name: req.body.name })
      .returning('*');

    res.status(200).json(updatedPet[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/pets/:id', async (req, res) => {
  try {
    const deletedPet = await knex('pet')
      .where('id', req.params.id)
      .del()
      .returning('*');

    if (!deletedPet.length) {
      return res.status(404).json({ error: 'Pet not found.' });
    }

    res.status(200).json(deletedPet[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});
