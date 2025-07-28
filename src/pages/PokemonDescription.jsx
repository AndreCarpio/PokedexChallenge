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
import { useEffect, useState } from "react";
import { PokemonEvolutions } from "../components/molecules/PokemonEvolutions";
import "./PokemonDescription.css";
import { useWeaknessesFromTypes } from "../hooks/useWeaknessesFromTypes";
import { useEvolutionChain } from "../hooks/useEvolutionChain";
import { Loading } from "../components/atoms/loading";
import { Alert } from "../components/molecules/Alert";

export const PokemonDescription = () => {
  const MAX_ID = 1025; // Pokemon with complete information up to now
  const MIN_ID = 1;
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

  const {
    evolutions,
    loading: loadingEvolutions,
    error: errorEvolution,
  } = useEvolutionChain(pokemonSpecies?.evolution_chain?.url);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pokemonId]);

  if (loadingPokemon) {
    return (
      <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
        <Loading></Loading>
      </div>
    );
  }

  if (!pokemon || errorPokemon) {
    return (
      <div style={{ margin: "1.5rem" }}>
        <Alert
          type="error"
          title="Pokémon not found"
          description={`No Pokémon found with ID "${pokemonId}". Please try a different one.`}
        />
      </div>
    );
  }

  const getNext = (id) => {
    return id >= MAX_ID ? MIN_ID : id + 1;
  };

  const getPrevious = (id) => {
    return id <= MIN_ID ? MAX_ID : id - 1;
  };

  return (
    <main className="pokemonDescriptionContainer">
      <div className="containerInfo">
        <button
          className="btnGoBack"
          onClick={() => {
            navigate("/pokemons");
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
          <PokemonTags types={pokemon.types.map((t) => t.type.name)} shadow />
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
            <>
              {loadingEvolutions && (
                <Loading text="Loading Evolutions"></Loading>
              )}
              {!loadingEvolutions && errorEvolution && (
                <p>Error fetching evolutions</p>
              )}
              {!loadingEvolutions && !errorEvolution && (
                <PokemonEvolutions evolutions={evolutions} />
              )}
            </>
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
            onCLick={() => {
              navigate(`/pokemons/${getPrevious(pokemon.id)}`);
            }}
          >
            Previous {formatToHashNumber(getPrevious(pokemon.id))}
          </DefaultButton>
          <DefaultButton
            className="sizeXl fontSemibold"
            onCLick={() => {
              navigate(`/pokemons/${getNext(pokemon.id)}`);
            }}
          >
            Next {formatToHashNumber(getNext(pokemon.id))}
          </DefaultButton>
        </div>
      </div>
    </main>
  );
};
