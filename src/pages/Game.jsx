import { DefaultButton } from "../components/atoms/DefaultButton";
import { shuffleArrary } from "../utils/shuffleArray";
import { useState } from "react";
import { GameStatusBar } from "../components/molecules/GameStatusBar";
import "./Game.css";

export const Game = () => {
  const [game, setGame] = useState({
    start: true,
    score: 0,
    options: [],
    successfulChoices: [],
    correctOption: 0,
    lives: 0,
  });

  async function startGame() {
    let newOptions = await getPokemons();
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

  return (
    <div className="gameContainer">
      <h1 className="titleGame">Who's That Pokémon?</h1>
      {game.start && (
        <>
          <GameStatusBar lives={game.lives} score={game.score} />
        </>
      )}
      {!game.start && (
        <>
          <div>
            <p>Final Score</p>
            <p>{game.score}</p>
          </div>
          <DefaultButton onCLick={getPokemons}>Restart</DefaultButton>
        </>
      )}
    </div>
  );
};
