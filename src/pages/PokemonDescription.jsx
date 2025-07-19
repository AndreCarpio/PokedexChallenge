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
    <main>
      {loading ? (
        <div style={{ height: "2rem" }}>
          <Spinner color="var(--primary-color)" />
        </div>
      ) : (
        <p>fetch data</p>
      )}

      {error && <p>Error getting data</p>}
      <div className="containerInfo">
        <ArrowbackIcon />
        <p> {formatToHashNumber("1")}</p>
        <p>Bulbasaur</p>
        <p>Generation 1</p>
        <div className="types">
          <PokemonTags types={["normal", "fighting"]} />
        </div>
        <div className="navBarInformation">
          <p className="option">Pokedex Data</p>
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
            <div>
              <p>Species</p>
              <p>Seed Pokémon</p>
            </div>
            <div>
              <p>Height</p>
              <p>0.7m (2′04″)</p>
            </div>
            <div>
              <p>Weight</p>
              <p>6.9kg (15.2 lbs)</p>
            </div>
            <div>
              <p>Abilities</p>
              <p>1. Overgrow</p>
            </div>
            <div>
              <p>Weaknesses</p>
              <p>fire</p>
            </div>
          </div>
          <div className="stats">
            <p className="statsInfo"></p>
            <div>
              <p>HP</p>
              <p className="baseStat">45</p>
              <div className="bar">
                <div></div>
              </div>
              <p>min</p>
              <p>max</p>
            </div>
          </div>
          <div className="evolution">
            <p className="evolutioLabel">Evolution Chart</p>
            <div className="evolution">
              <div>
                <img src="" alt="" />
              </div>
              <p>#001</p>
              <div>types</div>
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
