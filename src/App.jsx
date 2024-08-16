import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=2&limit=10"
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>Memory card Game</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : data ? (
        data.map((elm) => (
          <img
            key={elm.id}
            src={elm.download_url}
            alt={elm.author}
            className="card"
            style={{ width: "15rem", height: "auto" }}
          />
        ))
      ) : (
        <h3>No data Found</h3>
      )}
    </>
  );
}

export default App;
