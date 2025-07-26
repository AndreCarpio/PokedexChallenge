import Bug from "../../assets/typeIcons/bug.svg?react";
import Dark from "../../assets/typeIcons/dark.svg?react";
import Dragon from "../../assets/typeIcons/dragon.svg?react";
import Electric from "../../assets/typeIcons/electric.svg?react";
import Fairy from "../../assets/typeIcons/fairy.svg?react";
import Fighting from "../../assets/typeIcons/fighting.svg?react";
import Fire from "../../assets/typeIcons/fire.svg?react";
import Flying from "../../assets/typeIcons/flying.svg?react";
import Ghost from "../../assets/typeIcons/ghost.svg?react";
import Grass from "../../assets/typeIcons/grass.svg?react";
import Ground from "../../assets/typeIcons/ground.svg?react";
import Ice from "../../assets/typeIcons/ice.svg?react";
import Normal from "../../assets/typeIcons/normal.svg?react";
import Poison from "../../assets/typeIcons/poison.svg?react";
import Psychic from "../../assets/typeIcons/psychic.svg?react";
import Rock from "../../assets/typeIcons/rock.svg?react";
import Steel from "../../assets/typeIcons/steel.svg?react";
import Water from "../../assets/typeIcons/water.svg?react";

import "./TypeIcon.css";

const typeIcons = {
  normal: Normal,
  fighting: Fighting,
  flying: Flying,
  poison: Poison,
  ground: Ground,
  rock: Rock,
  bug: Bug,
  steel: Steel,
  fire: Fire,
  water: Water,
  grass: Grass,
  electric: Electric,
  psychic: Psychic,
  ice: Ice,
  dragon: Dragon,
  dark: Dark,
  fairy: Fairy,
  ghost: Ghost,
};

export function TypeIcon({ type }) {
  if (type === "stellar") {
    return <span className="type-icon">⭐</span>;
  }
  if (type === "unknown") {
    return <span className="type-icon">❓</span>;
  }

  const IconComponent = typeIcons[type];
  return IconComponent ? <IconComponent className="type-icon" /> : null;
}
