import { DefaultButton } from "../components/atoms/DefaultButton";
import { shuffleArrary } from "../utils/shuffleArray";
import { useEffect, useState } from "react";
import { GameStatusBar } from "../components/molecules/GameStatusBar";
import { GameAnswerOptions } from "../components/molecules/GameAnswerOptions";
import "./Game.css";
import { GameResultMessage } from "../components/molecules/GameResultMessage";
import { Spinner } from "../components/atoms/Spinner";
import { FinalScoreMessage } from "../components/molecules/FinalScoreMessage";

export const Game = () => {
  const [game, setGame] = useState({
    state: true,
    score: 0,
    pokemons: [],
    options: [],
    correctOptionInfo: 0,
    lives: 0,
  });

  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  async function startGame() {
    let newPokemonList = await getPokemons();
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
      successfulChoices: [],
      correctOptionInfo: correctOptionInfo,
      lives: 5,
      selectedOption: null,
    });
  }

  async function getPokemons() {
    try {
      let res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
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

  async function nextPokemon() {
    setLoadingImage(true);
    let newPokemonList = game.pokemons;
    if (game.selectedOption.name == game.correctOptionInfo.name) {
      let optionsAux = [...game.options];
      optionsAux.shift();
      newPokemonList = [...newPokemonList, ...optionsAux];
    } else {
      newPokemonList = [...newPokemonList, ...game.options];
    }

    let newOptions = newPokemonList.splice(0, 4).map((p, i) => ({
      ...p,
      answer: i === 0,
    }));

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
    if (game.selectedOption != null) {
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
    }

    setGame((prev) => ({
      ...prev,
      state: newState,
      selectedOption: option,
      score: newScore,
      lives: newLives,
    }));
  }

  return (
    <div className="gameContainer">
      <h1 className="titleGame">Who's That Pokémon?</h1>

      {game.state && (
        <>
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
                <Spinner
                  borderWidth="4px"
                  color="var(--primary-color)"
                ></Spinner>
              </div>
            )}
          </div>
          <div>
            {game.selectedOption && (
              <button onClick={nextPokemon}>next Pokemon</button>
            )}
          </div>
          <GameAnswerOptions
            options={game.options}
            onClick={selectOption}
            correctOptionInfo={game.correctOptionInfo}
            selectedOption={game.selectedOption}
          />
        </>
      )}

      {!game.state && (
        <FinalScoreMessage restart={startGame} score={game.score} />
      )}
    </div>
  );
};
