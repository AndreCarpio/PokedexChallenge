export function getTypeColor(type) {
  let res = "";

  switch (type) {
    case "normal":
      res = "#B5B9C4";
      break;
    case "fighting":
      res = "#EB4971";
      break;
    case "flying":
      res = "#83A2E3";
      break;
    case "poison":
      res = "#9F6E97";
      break;
    case "ground":
      res = "#F78551";
      break;
    case "rock":
      res = "#D4C294";
      break;
    case "bug":
      res = "#8BD674";
      break;
    case "ghost":
      res = "#8571BE";
      break;
    case "steel":
      res = "#4C91B2";
      break;
    case "fire":
      res = "#FFA756";
      break;
    case "water":
      res = "#58ABF6";
      break;
    case "grass":
      res = "#8BBE8A";
      break;
    case "electric":
      res = "#F2CB55";
      break;
    case "psychic":
      res = "#FF6568";
      break;
    case "ice":
      res = "#91D8DF";
      break;
    case "dragon":
      res = "#7383B9";
      break;
    case "dark":
      res = "#6F6E78";
      break;
    case "fairy":
      res = "#EBA8C3";
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
