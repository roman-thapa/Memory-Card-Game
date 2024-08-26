import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleImgClick = (elm) => {
    if (elm.clicked) {
      setGameOver(true);
    } else {
      elm.clicked = true;
      setScore((prev) => prev + 1);
      setData(shuffleArray(data));
    }
    if (score === 10) {
      setGameOver(true);
      setWin(true);
    }
  };

  const handleNewGame = () => {
    setGameOver(false)
    setScore(0)
    setWin(false)
    setLoading(true)
    setError(null)
    fetchData()
  }

  function shuffleArray(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>Memory card Game</h1>
      <div>{score}</div>
      {!gameOver ? (
        <ImageGallery loading={loading} data={data} handleClick={handleImgClick} />
      ) : (
        <>
          {win ? (
            <>
              <h2>Congratulations!</h2>
              <div>You Won! Your Score is perfect {score}</div>
            </>
          ) : (
            <>
              <h2>Game Over</h2>
              <div>Your Score is {score}</div>
            </>
          )}
          <button onClick={handleNewGame}>New Game</button>
        </>
      )}
    </>
  );
}

const ImageGallery = ({ loading, data, handleClick }) => {
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : data ? (
        data.map((elm) => (
          <img
            key={elm.id}
            src={elm.download_url}
            alt={elm.author}
            className="card"
            style={{ width: "15rem", height: "9rem" }}
            onClick={() => handleClick(elm)}
          />
        ))
      ) : (
        <h3>No data Found</h3>
      )}
    </>
  );
};

export default App;
