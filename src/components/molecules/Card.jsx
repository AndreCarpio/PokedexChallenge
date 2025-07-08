import { getTypeColor } from "../../utils/getTypeColor";
import { CardNumber } from "../atoms/CardNumber";
import { CardPokemonName } from "../atoms/CardPokemonName";
import { PokemonTags } from "../atoms/PokemonTags";
import dottedPattern from "../../assets/pokemonCardImages/dottedPattern.png";
import pokeballBackground from "../../assets/pokemonCardImages/pokeballBackground.png";
import "./Card.css";

export const Card = ({
  pokemonName = "Sin Nombre",
  pokemonNumber = "#000",
  imageURL = "",
  types = [],
}) => {
  return (
    <div
      className="pokemonCard"
      style={{ backgroundColor: getTypeColor(types[0]) }}
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
        <CardNumber pokemonNumber={pokemonNumber}></CardNumber>
        <CardPokemonName pokemonName={pokemonName}></CardPokemonName>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <PokemonTags types={types}></PokemonTags>
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
        src={imageURL}
        style={{ position: "absolute", height: "80%", right: "-3rem" }}
        alt="pokemon image"
      />
    </div>
  );
};
