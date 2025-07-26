import { useNavigate, useParams } from "react-router";
import { DefaultButton } from "../components/atoms/DefaultButton";
import { ArrowbackIcon } from "../components/atoms/icons/ArrowbackIcon";
import { PokemonTags } from "../components/atoms/PokemonTags";
import { formatToHashNumber } from "../utils/formatToHashNumber";
import { getTypeColor } from "../utils/getTypeColor";
import BackgroundDots from "../assets/pokemonDetails/backgroundDots.svg";
import BackgroundPokeball from "../assets/pokemonDetails/backgroundPokeball.svg";
import { formatGeneration } from "../utils/formatGeneration";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLatter";
import { PokemonStats } from "../components/molecules/PokemonStats";
import { PokemonAbout } from "../components/molecules/PokemonAbout";
import { PokemonInfoNavbar } from "../components/molecules/PokemonInfoNavbar";
import { useGet } from "../hooks/useGet";
import { useState } from "react";
import { PokemonEvolutions } from "../components/molecules/PokemonEvolutions";
import "./PokemonDescription.css";
import { useWeaknessesFromTypes } from "../hooks/useWeaknessesFromTypes";
import { useEvolutionChain } from "../hooks/useEvolutionChain";

export const PokemonDescription = () => {
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const {
    data: pokemon,
    loading: loadingPokemon,
    error: errorPokemon,
  } = useGet(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);

  const { data: pokemonSpecies } = useGet(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`,
  );

  const NAV_OPTIONS = ["data", "stats", "evolution"];
  const [navbarInfo, setNavbarInfo] = useState(NAV_OPTIONS[0]);

  const { weaknesses } = useWeaknessesFromTypes(pokemon);

  const { evolutions } = useEvolutionChain(
    pokemonSpecies?.evolution_chain?.url,
  );

  if (loadingPokemon) {
    return <p>Loading...</p>;
  }

  if (!pokemon || errorPokemon) {
    return <p>This pokemon exist</p>;
  }

  return (
    <main className="pokemonDescriptionContainer">
      <div className="containerInfo">
        <button
          className="btnGoBack"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowbackIcon size="1.7rem" fill="var(--gray-700)" />
        </button>

        <p className="pokemonNumber"> {formatToHashNumber(pokemon.id)}</p>
        <p className="pokemonName">{capitalizeFirstLetter(pokemon.name)}</p>
        <div className="containerPokemonImageMobile">
          <img
            className="pokemonImageMobile"
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
            alt="pokemonImage"
          />
        </div>
        <p className="pokemonGeneration">
          {formatGeneration(pokemonSpecies?.generation?.name)}
        </p>

        <div className="pokemonsTypes">
          <PokemonTags types={pokemon.types.map((t) => t.type.name)} />
        </div>

        <PokemonInfoNavbar
          navbarInfo={navbarInfo}
          onChange={setNavbarInfo}
          NAV_OPTIONS={NAV_OPTIONS}
        />

        <div className="infoBox">
          {navbarInfo === "data" && (
            <PokemonAbout
              pokemonSpecies={pokemonSpecies}
              pokemon={pokemon}
              weaknesses={weaknesses}
            />
          )}
          {navbarInfo === "stats" && <PokemonStats pokemon={pokemon} />}
          {navbarInfo === "evolution" && (
            <PokemonEvolutions evolutions={evolutions} />
          )}
        </div>
      </div>

      <div
        className="containerPokemon"
        style={{ backgroundColor: getTypeColor(pokemon.types[0].type.name) }}
      >
        <img className="bgDots" src={BackgroundDots} alt=" dots background" />
        <img
          className="bgPokeball"
          src={BackgroundPokeball}
          alt="pokeball background"
        />

        <img
          className="pokemonImage"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt="pokemonImage"
        />
        <div className="btnSection ">
          <DefaultButton
            className="sizeXl fontSemibold"
            style={{
              backgroundColor: "var(--gray-100)",
              color: "var(--gray-800)",
            }}
          >
            Previous {formatToHashNumber(pokemon.id - 1)}
          </DefaultButton>
          <DefaultButton className="sizeXl fontSemibold">
            Next {formatToHashNumber(pokemon.id + 1)}
          </DefaultButton>
        </div>
      </div>
    </main>
  );
};
