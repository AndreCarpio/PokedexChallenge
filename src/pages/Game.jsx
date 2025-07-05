import { useEffect, useState } from "react";
import "./Game.css";
import { DefaultButton } from "../components/atoms/DefaultButton";
import { shuffleArrary } from "../utils/shuffleArray";

export const Game = () => {
  const [game, setGame] = useState({
    state: false,
    gameOver: false,
    score: 0,
    options: [],
    successfulChoices: [],
    correctOption: 0,
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
    <div>
      <div>
        <p>Who's That Pokémon?</p>
        {game.state && (
          <>
            <p>Score</p>
            <div>
              <img src="" alt="" />
            </div>
          </>
        )}
        {!game.state && (
          <>
            <DefaultButton onCLick={getPokemons}>Start</DefaultButton>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
};
