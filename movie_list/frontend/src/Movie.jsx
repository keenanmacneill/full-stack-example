export default function Movie({ m, setSelectedMovie }) {
  const { title } = m;

  const handleDeleteMovie = async () => {
    const res = await fetch(`http://localhost:8080/movies/${m.id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  };

  if (!m) return <h1>Loading...</h1>;

  return (
    <>
      {
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h2 onClick={() => setSelectedMovie(m)} style={{ cursor: 'pointer' }}>
            {title}
          </h2>
          <div onClick={handleDeleteMovie} style={{ cursor: 'pointer' }}>
            X
          </div>
        </div>
      }
    </>
  );
}
