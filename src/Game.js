import { useState, useEffect, useRef } from "react";

export default function Game({ word }) {
  const [attempts, setAttempts] = useState(0);
  const [remaining, setRemaining] = useState(7);
  const one = useRef(null);
  const alphabets = [..."abcdefghijklmnopqrstuvwxyz"];

  useEffect(() => {
    document.getElementById("box-0").focus();
  }, []);

  const onKeyPress = (e) => {
    const letter = e.target.getAttribute("letter");
    let found = false;
    document.querySelectorAll(".word").forEach((input, i) => {
      if (letter === input.getAttribute("letter")) {
        input.value = letter;
        found = true;
      }
    });
    if (found) {
    }
    e.target.classList.add("disabled");
    getRemainingCharacters();
    setAttempts(attempts + 1);
  };

  const getRemainingCharacters = () => {
    let rem = 0;
    document.querySelectorAll(".word").forEach((input, i) => {
      if (input.value === "") {
        rem++;
      }
    });
    setRemaining(rem);
  };

  return (
    <div className="game">
      {[...word].map((item, i) => {
        return (
          <input
            type="text"
            className="word"
            key={i}
            num={i}
            id={`box-${i}`}
            letter={item}
            disabled
          />
        );
      })}
      <div className="keyboard">
        {alphabets.map((letter) => {
          return (
            <button
              className="letter"
              key={letter}
              letter={letter}
              onClick={onKeyPress}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <div className="stat">Attempts: {attempts}</div>
      <div className="stat">Remaining Characters: {remaining}</div>
      {remaining === 0 && <div className="success">You have won!</div>}
    </div>
  );
}
