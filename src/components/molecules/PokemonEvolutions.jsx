import { Link } from "react-router";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import { formatToHashNumber } from "../../utils/formatToHashNumber";
import { PokemonTags } from "../atoms/PokemonTags";
import "./PokemonEvolutions.css";

export const PokemonEvolutions = ({ evolutions }) => {
  if (!evolutions) return <p> Evolutions not found.</p>;
  return (
    <div className="evolution">
      <p className="evolutioLabel">Evolution Chart</p>
      <div className="evolutionChain">
        {evolutions.map((pokemonEvolution) => (
          <Link
            className="evolutionPokemon"
            key={pokemonEvolution.id}
            to={`/pokemons/${pokemonEvolution.id}`}
          >
            <div className="evolutionImageContainer">
              <img
                src={
                  pokemonEvolution.sprites?.other?.["official-artwork"]
                    ?.front_default
                }
                alt={pokemonEvolution.name}
              />
            </div>
            <p className="pokemonNumber">
              {formatToHashNumber(pokemonEvolution.id)}
            </p>
            <div className="pokemonName">
              {capitalizeFirstLetter(pokemonEvolution.name)}
            </div>
            <div className="pokemonTypes">
              <PokemonTags
                types={pokemonEvolution.types.map((t) => t.type.name)}
                showText={false}
                shadow
                circular
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
