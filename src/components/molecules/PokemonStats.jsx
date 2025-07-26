import { calculateStatRange } from "../../utils/calculateStatRange";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import "./PokemonStats.css";

const getFormattedStatName = (name) => {
  if (name === "special-attack") return "Sp. Atk";
  if (name === "special-defense") return "Sp. Def";
  return capitalizeFirstLetter(name);
};

export const PokemonStats = ({ pokemon }) => {
  if (!pokemon?.stats) return <p>Stats not found.</p>;

  const totalBase = pokemon.stats.reduce(
    (acc, stat) => acc + stat.base_stat,
    0,
  );

  return (
    <div className="stats">
      <p className="statsInfo">
        The ranges shown are for a level 100 Pokémon. Max values assume
        beneficial nature, 252 EVs, 31 IVs; min values assume hindering nature,
        0 EVs, 0 IVs.
      </p>

      {pokemon.stats.map(({ stat, base_stat }) => {
        const name = stat.name;
        const { min, max } = calculateStatRange(base_stat, name);
        const progressPercent = Math.min((base_stat / max) * 100, 100);

        return (
          <div className="infoRowStat" key={name}>
            <p className="stat">{getFormattedStatName(name)}</p>
            <div className="otherStats">
              <p className="baseStat">{base_stat}</p>
              <div className="bar">
                <div
                  className="progress"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="minStat">{min}</p>
              <p className="maxStat">{max}</p>
            </div>
          </div>
        );
      })}

      <div className="infoRowStat totalRow">
        <p className="stat">Total</p>
        <div className="otherStats">
          <p className="baseStat">{totalBase}</p>
          <div className="bar"></div>
          <p className="minStat">
            <b>Min</b>
          </p>
          <p className="maxStat">
            <b>Max</b>
          </p>
        </div>
      </div>
    </div>
  );
};
