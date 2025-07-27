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

  const getAbout = () => {
    const preferredVersions = ["omega-ruby", "sword", "ultra-sun", "x", "y"];

    if (!pokemonSpecies?.flavor_text_entries) {
      return;
    }

    const englishEntries = pokemonSpecies.flavor_text_entries.filter(
      (entry) => entry.language.name === "en",
    );

    for (const version of preferredVersions) {
      const entry = englishEntries.find((e) => e.version.name === version);
      if (entry) {
        return entry.flavor_text.replace(/\f|\n/g, " ");
      }
    }

    if (englishEntries.length > 0) {
      return englishEntries[0].flavor_text.replace(/\f|\n/g, " ");
    }

    return "No flavor text found.";
  };

  const getSpecies = () => {
    const genusEntry = pokemonSpecies?.genera?.find(
      (entry) => entry.language.name === "en",
    );
    return genusEntry ? genusEntry.genus : "Species  not found";
  };

  return (
    <div className="pokedexData">
      <p className="aboutLabel">About this Pokemon:</p>
      <p className="about">{getAbout()}</p>
      <div className="infoRow">
        <p className="label">Species</p>
        <p className="info">{getSpecies() || "Unknow"}</p>
      </div>
      <div className="infoRow">
        <p className="label">Height</p>
        <p className="info">{formatHeight(pokemon.height) || "Unknow"}</p>
      </div>
      <div className="infoRow">
        <p className="label">Weight</p>
        <p className="info">{formatWeight(pokemon.weight) || "Unknow"}</p>
      </div>
      <div className="infoRow">
        <p className="label">Abilities</p>
        <div className="info">
          {renderAbilities(pokemon.abilities) || "Unknow"}
        </div>
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
