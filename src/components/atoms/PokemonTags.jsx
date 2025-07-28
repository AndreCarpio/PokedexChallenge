import { Link } from "react-router";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import { getTagColor } from "../../utils/getTagColor.js";
import "./PokemonTags.css";
import { TypeIcon } from "./TypeIcon.jsx";

export const PokemonTags = ({
  types = [],
  showText = true,
  shadow = false,
  circular = false,
}) => {
  return (
    <div className="tagsContainer">
      {types.map((type, index) => {
        return (
          <div
            key={index}
            className={`tagCard ${circular ? "circular" : ""} ${showText ? "showText" : ""}`}
            style={{
              backgroundColor: getTagColor(type),
              boxShadow: shadow ? `0px 4px 15px ${getTagColor(type, 0.6)}` : "",
            }}
          >
            <div className="tagCardImage">
              <TypeIcon type={type}></TypeIcon>
            </div>
            {showText && <p>{capitalizeFirstLetter(type)}</p>}
          </div>
        );
      })}
    </div>
  );
};
