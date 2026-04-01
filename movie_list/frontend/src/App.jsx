import { useEffect, useState } from 'react';
import Movie from './Movie';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetch('http://localhost:8080/movies');
      const movies = await data.json();

      setMovies(movies);
    };
    getMovies();
  }, [movies]);

  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleCreateMovie = async () => {
    try {
      const res = await fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newMovieTitle }),
      });

      const data = await res.json();

      setSubmitMessage(data.message);
    } catch (err) {
      setSubmitMessage(err.message);
    }
  };

  if (!movies.length) return <h1>Loading...</h1>;

  return (
    <>
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search..."
        ></input>

        <input
          type="text"
          value={newMovieTitle}
          onChange={e => {
            setNewMovieTitle(e.target.value);
          }}
          placeholder="Add new movie title..."
        ></input>

        <button onClick={handleCreateMovie}>Submit</button>
        {submitMessage ? <div>{submitMessage}</div> : ''}
      </div>

      {filteredMovies.map(m => (
        <Movie key={m.id} m={m} />
      ))}
    </>
  );
}
