import { CardNumber } from "../atoms/CardNumber";
import { CardPokemonName } from "../atoms/CardPokemonName";
import { PokemonTags } from "../atoms/PokemonTags";
import dottedPattern from "../../assets/pokemonCardImages/dottedPattern.png";
import pokeballBackground from "../../assets/pokemonCardImages/pokeballBackground.png";
import { Link } from "react-router";
import { getTypeColor } from "../../utils/getTypeColor";
import "./Card.css";

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
  const primaryType = pokemon.types[0].type.name;

  return (
    <Link
      to={`/pokemons/${pokemon.id}`}
      className="pokemonCard"
      style={{ backgroundColor: getTypeColor(primaryType) }}
    >
      <div className="cardInfo">
        <CardNumber pokemonNumber={pokemon.id} />
        <CardPokemonName pokemonName={pokemon.name} />
      </div>

      <div className="cardTags">
        <PokemonTags types={pokemon.types.map((t) => t.type.name)} />
      </div>

      <img
        loading="lazy"
        src={dottedPattern}
        className="dottedPattern"
        alt="dottedPattern background"
      />

      <img
        loading="lazy"
        src={pokeballBackground}
        className="pokeballBackground"
        alt="pokeball background"
      />

      <img
        loading="lazy"
        src={pokemon.sprites.other["official-artwork"].front_default}
        className="pokemonImage"
        alt="pokemon image"
      />
    </Link>
  );
};
