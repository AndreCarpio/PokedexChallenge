import { DefaultButton } from "../components/atoms/DefaultButton";
import { shuffleArrary } from "../utils/shuffleArray";
import { useEffect, useRef, useState } from "react";
import { GameStatusBar } from "../components/molecules/GameStatusBar";
import { GameAnswerOptions } from "../components/molecules/GameAnswerOptions";
import { GameResultMessage } from "../components/molecules/GameResultMessage";
import { Spinner } from "../components/atoms/Spinner";
import { FinalScoreMessage } from "../components/molecules/FinalScoreMessage";
import { NextIcon } from "../components/atoms/icons/nextIcon";
import "./Game.css";

export const Game = () => {
  const [fethPokemons, setFetchPokemons] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [showNextPokemonBtn, setShowNextPokemonBtn] = useState(false);
  const [counter, setCounter] = useState(5);
  const intervalId = useRef(null);
  const [game, setGame] = useState({
    state: true,
    score: 0,
    pokemons: [],
    options: [],
    correctOptionInfo: null,
    lives: 0,
  });

  useEffect(() => {
    startGame();
    return () => {
      stopCounter();
    };
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      stopCounter();
      nextPokemon();
    }
  }, [counter]);

  function startCounter() {
    if (intervalId.current == null) {
      intervalId.current = setInterval(() => {
        console.log("interval");
        setCounter((prev) => prev - 1);
      }, 1000);
    }
  }

  function stopCounter() {
    if (intervalId.current != null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setCounter(5);
    }
  }

  async function startGame() {
    setShowNextPokemonBtn(false);
    setLoadingImage(false);
    let newPokemonList = [];
    if (fethPokemons.length == 0) {
      newPokemonList = await getPokemons();
      setFetchPokemons(newPokemonList);
    } else {
      newPokemonList = shuffleArrary(fethPokemons);
    }

    let options = newPokemonList.splice(0, 4).map((p, i) => ({
      ...p,
      answer: i === 0,
    }));

    let correctOptionInfo = await getPokemonInfo(options[0].url);
    options = shuffleArrary(options);

    setGame({
      state: true,
      score: 0,
      pokemons: newPokemonList,
      options: options,
      correctOptionInfo: correctOptionInfo,
      lives: 5,
      selectedOption: null,
    });
  }

  async function nextPokemon() {
    if (game.lives <= 0 || !game.state) {
      return;
    }
    setShowNextPokemonBtn(false);
    setLoadingImage(true);
    let newPokemonList = game.pokemons;
    if (game.selectedOption.name == game.correctOptionInfo.name) {
      newPokemonList = [
        ...newPokemonList,
        ...game.options.filter((option) => {
          return option.name != game.correctOptionInfo.name;
        }),
      ];
    } else {
      newPokemonList = [...newPokemonList, ...game.options];
    }

    let newOptions = newPokemonList.splice(0, 4).map((p, i) => ({
      ...p,
      answer: i === 0,
    }));

    if (newOptions.length == 0) {
      setGame((prev) => ({ ...prev, state: false }));
      return;
    }

    let correctOptionInfo = await getPokemonInfo(newOptions[0].url);
    newOptions = shuffleArrary(newOptions);

    setGame((prev) => ({
      ...prev,
      pokemons: newPokemonList,
      options: newOptions,
      correctOptionInfo: correctOptionInfo,
      selectedOption: null,
    }));
    setLoadingImage(false);
  }

  function selectOption(option) {
    if (game.selectedOption != null || !game.state) {
      return;
    }
    let newScore = game.score;
    let newLives = game.lives;

    if (option.name === game.correctOptionInfo.name) {
      newScore = newScore + 20;
    } else {
      newLives--;
    }

    let newState = game.state;
    if (newLives <= 0) {
      newState = false;
    } else {
      startCounter();
      setShowNextPokemonBtn(true);
    }

    setGame((prev) => ({
      ...prev,
      state: newState,
      selectedOption: option,
      score: newScore,
      lives: newLives,
    }));
  }

  async function getPokemons() {
    try {
      let res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
      );
      if (res.ok) {
        res = await res.json();
        res = shuffleArrary(res.results);
        return res;
      } else {
        throw new Error("Error to get data");
      }
    } catch (error) {
      console.log("Error to get data: " + error);
    }
  }

  async function getPokemonInfo(url) {
    try {
      let res = await fetch(url);
      if (res.ok) {
        res = await res.json();
        return res;
      } else {
        throw new Error("Error to get data");
      }
    } catch (error) {
      console.log("Error to get data: " + error);
    }
  }

  return (
    <div className="gameContainer">
      <h1 className="titleGame">Who's That Pokémon?</h1>

      <GameStatusBar lives={game.lives} score={game.score} />
      <GameResultMessage
        correctOptionInfo={game.correctOptionInfo}
        selectedOption={game.selectedOption}
      />
      <div className="gamePokemonImage">
        {!loadingImage && game.correctOptionInfo && (
          <img
            src={
              game.correctOptionInfo?.sprites?.other?.["official-artwork"]
                ?.front_default
            }
            alt="pokemon image"
            className={game.selectedOption && "visible"}
          />
        )}
        {loadingImage && (
          <div style={{ height: "3rem" }}>
            <Spinner borderWidth="4px" color="var(--primary-color)"></Spinner>
          </div>
        )}
        {!game.state && (
          <FinalScoreMessage restart={startGame} score={game.score} />
        )}
      </div>
      <div
        style={{
          height: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showNextPokemonBtn && (
          <button
            className="nextPokemonBtn"
            onClick={() => {
              stopCounter();
              nextPokemon();
            }}
          >
            <p className="counter">{counter}</p>
            <p>Next Pokemon</p>
            <NextIcon size="1.2rem"></NextIcon>
          </button>
        )}
      </div>
      <GameAnswerOptions
        options={game.options}
        onClick={selectOption}
        correctOptionInfo={game.correctOptionInfo}
        selectedOption={game.selectedOption}
      />
    </div>
  );
};
