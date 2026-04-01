import { useEffect, useState } from 'react';
import { getAllPets } from '../api/petRequests';

export default function App() {
  const [pets, setPets] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    getAllPets()
      .then(data => {
        setPets(data);
      })
      .catch(setError);
  }, []);

  if (error) return <h1>Error: {error.message}</h1>;
  if (!pets) return <h1>Loading...</h1>;
  return (
    <div>
      {pets.map(p => (
        <div key={p.id}>
          {p.name} - {p.type}
        </div>
      ))}
    </div>
  );
}
