const express = require('express');
const cors = require('cors');
const db = require('./knex');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await db('movies').select('*');

    res.status(200).json(movies);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});
app.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await db('movies').where('id', id).select('*').first();

    !movie
      ? res.status(404).json({ message: 'Movie does not exist.' })
      : res.status(200).json(movie);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});
app.post('/movies/', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(401).json({ message: 'Movie must have a title.' });
    }

    const [newMovie] = await db('movies').insert({ title }).returning('*');
    res
      .status(200)
      .json({ message: `'${newMovie.title}' was successfully created.` });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});
app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedMovie] = await db('movies')
      .where('id', id)
      .del()
      .returning('*');

    !deletedMovie
      ? res.status(404).json({ message: 'Movie does not exist.' })
      : res
          .status(200)
          .json({ message: `'${deletedMovie}' was successfully deleted.` });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});
app.patch('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const match = await db('movies').where('id', id).select('*');

    if (!match) {
      return res.status(404).json({ message: 'Movie does not exist.' });
    }

    const [movie] = await db('movies')
      .where('id', id)
      .update({ title })
      .returning('*');

    res.status(201).json(movie);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error.' });
  }
});

module.exports = app;
