import { useState } from 'react';

export default function Movie({ m }) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const { title } = m;

  const handleDeleteMovie = async () => {
    const res = await fetch(`http://localhost:8080/movies/${m.id}`, {
      method: 'DELETE',
    });

    const data = res.json();
    setDeleteMessage(data.message);
  };

  if (!m) return <h1>Loading...</h1>;

  return (
    <>
      {deleteMessage ? (
        deleteMessage
      ) : (
        <div>
          <h1>{title}</h1>
          <h1 onClick={handleDeleteMovie}>X</h1>
        </div>
      )}
    </>
  );
}
