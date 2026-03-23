import { useEffect, useState } from 'react';
import { getAllPets } from '../api/petRequests';

export default function App() {
  const [pets, setPets] = useState(null);

  useEffect(() => {
    getAllPets().then(setPets);
  }, []);

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
