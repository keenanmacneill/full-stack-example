import { useEffect, useState } from 'react';

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetch('http://localhost:8000/movies');
      const movies = await data.json();

      setMovies(movies);
    };

    getMovies();
  }, [setMovies]);

  if (!movies.length) return <h1>Loading...</h1>;
  console.log(movies);

  return (
    <div>
      {movies.map(m => (
        <div>
          <p>{m.title}</p>
          <p>{m.main_character}</p>
          <p>{m.year_released}</p>
        </div>
      ))}
    </div>
  );
}
