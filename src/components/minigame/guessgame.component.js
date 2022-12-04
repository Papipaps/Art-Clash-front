import { useEffect, useState, useRef, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import words from "../../data/minigame/guess-words-data";
import Canvas from "../Canvas";
import Popup from "../Popup";
import mockProfils from "../../mock/mock-profils";

const ROUND_TIME = 10;
const NUMBER_OF_ROUND = 9;
const NUMBER_OF_WORD = 10;

export default function GuessGame() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [timer, setTimer] = useState(ROUND_TIME);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setGameOver] = useState(true);
  const [round, setRound] = useState(1);
  const [currentWord, setCurrentWord] = useState("");
  const [wordPool, setWordPool] = useState([]);
  const [state, setState] = useState({
    players: [mockProfils[0], mockProfils[1], mockProfils[2], mockProfils[3]],
    score: 0,
  });

  const intervalRef = useRef(null);
  const guessRef = useRef(null);
  const navigate = useNavigate();
  // TIMER /////////////////
  function startTimer() {
    if (!isRunning) {
      console.log("starting timer");
      intervalRef.current = setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
    }
  }

  function stopTimer() {
    console.log("stopping timer");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimer(ROUND_TIME);
  }
  // ROUND ////////////////////
  function onRoundNext() {
    console.log("next round");
    setRound((prev) => prev + 1);
    setTimer(ROUND_TIME);
    setCurrentWordIndex((prev) => prev + 1);
    console.log("new word");
    setCurrentWord(wordPool[currentWordIndex]);
  }

  // GAME EVENT////////////

  function onGameStart() {
    console.log("START game");
    setGameOver(false);
    setCurrentWord(wordPool[0]);
    startTimer();
  }

  function onGameEnd() {
    console.log("END game");
    setPopupOpen();
    setGameOver(true);
    setRound(1);
    setWordPool([]);
    setCurrentWord("");
    stopTimer();
    setIsRunning(false);
  }

  function handleGuess(e) {
    e.preventDefault();
    if (guessRef.current.value === currentWord) {
      console.log("GG !");
      onRoundNext();
    }
    guessRef.current.value = "";
  }
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  useEffect(() => {
    console.log("loading words");
    for (let i = 0; i < 10; i++) {
      const rdm = randomIntFromInterval(0, words.length - 1);
      setWordPool((prev) => [...prev, words[rdm]]);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (round > NUMBER_OF_ROUND) {
      onGameEnd();
    }
  }, [round]);

  useMemo(() => {
    console.log(timer);
    if (timer < 0) {
      console.log(wordPool[currentWordIndex]);
      onRoundNext();
    }
  }, [timer]);

  return (
    <section className="bg-slate-400 h-screen w-screen justify-center flex items-center">
      {isGameOver ? (
        <Popup setPopupOpen={setPopupOpen} isExitable={false}>
          <div className="p-4">
            <ul className="player-list">
              {state.players.map((player) => {
                return (
                  <li key={player.id} className="player-item">
                    {player.username}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={onGameStart}
              className="p-4 border border-black rounded-lg bg-white"
            >
              START
            </button>
          </div>
        </Popup>
      ) : (
        <main className="border border-black w-4/5 h-fit p-10 min-w-fit ">
          <div className="absolute w-fit text-center text-5xl p-4 border border-black rounded-lg top-10 left-1/2">
            {timer}
          </div>
          <h1>
            Manche : {round}/{NUMBER_OF_ROUND}
          </h1>

          {/* <Canvas /> */}
          <form onSubmit={handleGuess}>
            <label htmlFor="guessInput">Devinez ! </label>
            <input
              className="border border-black m-10"
              name="guessInput"
              type="text"
              ref={guessRef}
            ></input>
          </form>
        </main>
      )}
    </section>
  );
}
