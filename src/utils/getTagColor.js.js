export function getTagColor(type) {
  let res = "";

  switch (type) {
    case "normal":
      res = "#9DA0AA";
      break;
    case "fighting":
      res = "#D04164";
      break;
    case "flying":
      res = "#748FC9";
      break;
    case "poison":
      res = "#A552CC";
      break;
    case "ground":
      res = "#DD7748";
      break;
    case "rock":
      res = "#BAAB82";
      break;
    case "bug":
      res = "#8CB230";
      break;
    case "ghost":
      res = "#556AAE";
      break;
    case "steel":
      res = "#417D9A";
      break;
    case "fire":
      res = "#FD7D24";
      break;
    case "water":
      res = "#4A90DA";
      break;
    case "grass":
      res = "#62B957";
      break;
    case "electric":
      res = "#EED535";
      break;
    case "psychic":
      res = "#EA5D60";
      break;
    case "ice":
      res = "#61CEC0";
      break;
    case "dragon":
      res = "#0F6AC0";
      break;
    case "dark":
      res = "#58575F";
      break;
    case "fairy":
      res = "#ED6EC7";
      break;
    case "stellar":
      res = "#777"; //
      break;
    case "unknown":
      res = "#777"; //
      break;
    default:
      res = "#777"; //
  }

  return res;
}
