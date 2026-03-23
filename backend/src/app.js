const express = require('express');
const app = express();
const petsRoutes = require('./modules/pets/pets.routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Running.' });
});
app.use('/pets', petsRoutes);

module.exports = app;
