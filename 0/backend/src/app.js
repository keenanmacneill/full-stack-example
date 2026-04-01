const express = require('express');
const cors = require('cors');

const app = express();

const petsRoutes = require('./modules/pets/pets.routes');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Running.' });
});
app.use('/pets', petsRoutes);

module.exports = app;
