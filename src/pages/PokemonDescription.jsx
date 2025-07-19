import { useParams } from "react-router";
import { DefaultButton } from "../components/atoms/DefaultButton";
import { ArrowbackIcon } from "../components/atoms/icons/ArrowbackIcon";
import { PokemonTags } from "../components/atoms/PokemonTags";
import { TypeIcon } from "../components/atoms/TypeIcon";
import { usePokemon } from "../hooks/usePokemon";
import { formatToHashNumber } from "../utils/formatToHashNumber";
import { Spinner } from "../components/atoms/Spinner";
import "./PokemonDescription.css";

export const PokemonDescription = () => {
  const { pokemonId } = useParams();
  const { pokemon, setPokemon, loading, error } = usePokemon(pokemonId);

  return (
    <main className="pokemonDescriptionContainer">
      <div className="containerInfo">
        <ArrowbackIcon size="3rem" fill="var(--gray-700)" />
        <p className="pokemonNumber"> {formatToHashNumber("1")}</p>
        <p className="pokemonName">Bulbasaur</p>
        <p className="pokemonGeneration">Generation 1</p>
        <div className="pokemonsTypes">
          <PokemonTags types={["normal", "fighting"]} />
        </div>
        <div className="navBarInformation">
          <p className="option active">Data</p>
          <p className="option">Stats</p>
          <p className="option">Evolution</p>
        </div>
        <div className="infoBox">
          <div className="pokedexData">
            <p className="aboutLabel">About this Pokemon:</p>
            <p className="about">
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger
            </p>
            <div className="infoRow">
              <p className="label">Species</p>
              <p className="info">Seed Pokémon</p>
            </div>
            <div className="infoRow">
              <p className="label">Height</p>
              <p className="info">0.7m (2′04″)</p>
            </div>
            <div className="infoRow">
              <p className="label">Weight</p>
              <p className="info">6.9kg (15.2 lbs)</p>
            </div>
            <div className="infoRow">
              <p className="label">Abilities</p>
              <p className="info">1. Overgrow</p>
            </div>
            <div className="infoRow">
              <p className="label">Weaknesses</p>
              <p className="info">fire</p>
            </div>
          </div>
          <div className="stats">
            <p className="statsInfo"></p>
            <div className="infoRowStat">
              <p className="stat">HP</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div className="progress"></div>
              </div>
              <p className="minStat">min</p>
              <p className="maxStat">max</p>
            </div>

            <div className="infoRowStat">
              <p className="stat">Attack</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div className="progress"></div>
              </div>
              <p className="minStat">min</p>
              <p className="maxStat">max</p>
            </div>

            <div className="infoRowStat">
              <p className="stat">Defense</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div className="progress"></div>
              </div>
              <p className="minStat">min</p>
              <p className="maxStat">max</p>
            </div>
            <div className="infoRowStat">
              <p className="stat">Sp. Atk</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div className="progress"></div>
              </div>
              <p className="minStat">min</p>
              <p className="maxStat">max</p>
            </div>
            <div className="infoRowStat">
              <p className="stat">Sp. Def</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div className="progress"></div>
              </div>
              <p className="minStat">min</p>
              <p className="maxStat">max</p>
            </div>
            <div className="infoRowStat">
              <p className="stat">Speed</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div className="progress"></div>
              </div>
              <p className="minStat">min</p>
              <p className="maxStat">max</p>
            </div>
          </div>
          <div className="evolution">
            <p className="evolutioLabel">Evolution Chart</p>
            <div className="evolutionChain">
              <div className="evolutionPokemon">
                <div className="evolutionImageContainer">
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
                    alt=""
                  />
                </div>
                <p className="pokemonNumber">#001</p>
                <div className="pokemonName">Bulbasaur</div>
                <div className="pokemonTypes"></div>
              </div>
              <div className="evolutionPokemon">
                <div className="evolutionImageContainer">
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
                    alt=""
                  />
                </div>
                <p className="pokemonNumber">#001</p>
                <div className="pokemonName">Bulbasaur</div>
                <div className="pokemonTypes"></div>
              </div>
              <div className="evolutionPokemon">
                <div className="evolutionImageContainer">
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
                    alt=""
                  />
                </div>
                <p className="pokemonNumber">#001</p>
                <div className="pokemonName">Bulbasaur</div>
                <div className="pokemonTypes"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="containerPokemon">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <DefaultButton>Previous #000</DefaultButton>
          <DefaultButton>Next #000</DefaultButton>
        </div>
      </div>
    </main>
  );
};
