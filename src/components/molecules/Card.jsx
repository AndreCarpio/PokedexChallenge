import { getTypeColor } from "../../utils/getTypeColor";
import { CardNumber } from "../atoms/CardNumber";
import { CardPokemonName } from "../atoms/CardPokemonName";
import { PokemonTags } from "../atoms/PokemonTags";
import dottedPattern from "../../assets/pokemonCardImages/dottedPattern.png";
import pokeballBackground from "../../assets/pokemonCardImages/pokeballBackground.png";
import "./Card.css";
import { Link } from "react-router";

export const Card = ({ pokemon }) => {
  if (
    !pokemon ||
    !pokemon.id ||
    !pokemon.name ||
    !pokemon.types ||
    !pokemon.sprites?.other?.["official-artwork"]?.front_default
  ) {
    return <div className="cardError">Invalid Pokémon data</div>;
  }
  return (
    <Link
      to={`/pokemons/${pokemon.id}`}
      className="pokemonCard"
      style={{
        backgroundColor: getTypeColor(pokemon.types.map((t) => t.type.name)[0]),
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 2,
          flexDirection: "column",
          justifyContent: "flex-end",
          textAlign: "start",
        }}
      >
        <CardNumber pokemonNumber={pokemon.id}></CardNumber>
        <CardPokemonName pokemonName={pokemon.name}></CardPokemonName>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <PokemonTags
          types={pokemon.types.map((t) => t.type.name)}
        ></PokemonTags>
      </div>

      <img
        src={dottedPattern}
        style={{ position: "absolute", top: "2.1rem", height: "18%" }}
        alt="dottedPattern background"
      />

      <img
        src={pokeballBackground}
        style={{ position: "absolute", top: 0, right: 0, height: "100%" }}
        alt="pokeball background"
      />

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        style={{ position: "absolute", height: "80%", right: "-3rem" }}
        alt="pokemon image"
      />
    </Link>
  );
};
