import { formatHeight } from "../../utils/formatHeight";
import { formatWeight } from "../../utils/formatWeight ";
import { PokemonTags } from "../atoms/PokemonTags";
import "./PokemonAbout.css";

export const PokemonAbout = ({ pokemonSpecies, pokemon, weaknesses }) => {
  const renderAbilities = (abilities) => {
    if (!Array.isArray(abilities)) return null;

    return abilities.map((item, index) => {
      const name = item.ability?.name || "Unknown";
      const isHidden = item.is_hidden;

      return (
        <p key={name}>
          {index + 1}. {name.charAt(0).toUpperCase() + name.slice(1)}
          {isHidden ? " (Hidden)" : ""}
        </p>
      );
    });
  };

  return (
    <div className="pokedexData">
      <p className="aboutLabel">About this Pokemon:</p>
      <p className="about">
        {pokemonSpecies?.flavor_text_entries[44]?.flavor_text}
      </p>
      <div className="infoRow">
        <p className="label">Species</p>
        <p className="info">{pokemonSpecies?.genera[7]?.genus}</p>
      </div>
      <div className="infoRow">
        <p className="label">Height</p>
        <p className="info">{formatHeight(pokemon.height)}</p>
      </div>
      <div className="infoRow">
        <p className="label">Weight</p>
        <p className="info">{formatWeight(pokemon.weight)}</p>
      </div>
      <div className="infoRow">
        <p className="label">Abilities</p>
        <div className="info">{renderAbilities(pokemon.abilities)}</div>
      </div>
      <div className="infoRow">
        <p className="label">Weaknesses</p>
        <div className="info">
          <PokemonTags types={weaknesses} showText={false} />
        </div>
      </div>
    </div>
  );
};
