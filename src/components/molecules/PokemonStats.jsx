import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import "./PokemonStats.css";

export const PokemonStats = ({ pokemon }) => {
  const calculateStatRange = (baseStat, statName) => {
    if (statName === "hp") {
      const min = Math.floor((2 * baseStat * 100) / 100 + 10 + 5);
      const max = Math.floor(
        ((2 * baseStat + 31 + Math.floor(252 / 4)) * 100) / 100 + 10,
      );
      return { min, max };
    } else {
      const min = Math.floor(((2 * baseStat * 100) / 100 + 5) * 0.9);
      const max = Math.floor(
        (((2 * baseStat + 31 + Math.floor(252 / 4)) * 100) / 100 + 5) * 1.1,
      );
      return { min, max };
    }
  };
  if (!pokemon?.stats) {
    return <p>No stats were found.</p>;
  }
  return (
    <div className="stats">
      <p className="statsInfo">
        The ranges shown on the right are for a level 100 Pokémon. Maximum
        values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values
        are based on a hindering nature, 0 EVs, 0 IVs.
      </p>
      {pokemon.stats.map((stat) => {
        let name = stat.stat.name;
        let base = stat.base_stat;
        let { min, max } = calculateStatRange(base, name);
        if (name === "special-attack") {
          name = "Sp. Atk";
        }
        if (name === "special-defense") {
          name = "Sp. Def";
        }
        return (
          <div className="infoRowStat" key={name}>
            <p className="stat">{capitalizeFirstLetter(name)}</p>
            <p className="baseStat">{base}</p>
            <div className="bar">
              <div
                className="progress"
                style={{ width: `${(base / max) * 100}%` }}
              ></div>
            </div>
            <p className="minStat">{min}</p>
            <p className="maxStat">{max}</p>
          </div>
        );
      })}
    </div>
  );
};
