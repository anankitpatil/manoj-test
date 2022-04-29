import { useState, useEffect } from "react";
import Game from "./Game";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState("");

  const getWords = () => {
    fetch("https://random-word-api.herokuapp.com/word?number=3")
      .then((res) => res.json())
      .then(
        (result) => {
          let found = false;
          result.forEach((item) => {
            if (item.length === 7) {
              setWord(item);
              console.log(item);
              setLoading(false);
              found = true;
            }
          });
          !found && getWords();
        },
        (error) => console.log(error)
      );
  };

  useEffect(() => {
    getWords();
  }, []);

  return (
    <div className="random">
      {loading ? "Loading..." : <Game word={word} />}
    </div>
  );
}

export default App;
