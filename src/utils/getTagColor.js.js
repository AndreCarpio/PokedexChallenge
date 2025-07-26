export function getTagColor(type, opacity = 1) {
  let hex = "";

  switch (type) {
    case "normal":
      hex = "#9DA0AA";
      break;
    case "fighting":
      hex = "#D04164";
      break;
    case "flying":
      hex = "#748FC9";
      break;
    case "poison":
      hex = "#A552CC";
      break;
    case "ground":
      hex = "#DD7748";
      break;
    case "rock":
      hex = "#BAAB82";
      break;
    case "bug":
      hex = "#8CB230";
      break;
    case "ghost":
      hex = "#556AAE";
      break;
    case "steel":
      hex = "#417D9A";
      break;
    case "fire":
      hex = "#FD7D24";
      break;
    case "water":
      hex = "#4A90DA";
      break;
    case "grass":
      hex = "#62B957";
      break;
    case "electric":
      hex = "#EED535";
      break;
    case "psychic":
      hex = "#EA5D60";
      break;
    case "ice":
      hex = "#61CEC0";
      break;
    case "dragon":
      hex = "#0F6AC0";
      break;
    case "dark":
      hex = "#58575F";
      break;
    case "fairy":
      hex = "#ED6EC7";
      break;
    case "stellar":
    case "unknown":
    default:
      hex = "#777";
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
