import "./SearchSeccion.css";
import dottedPatterSearch from "../../assets/searchSeccionImages/dottedPatterSearch.png";
import { SearchInput } from "../atoms/SearchInput";

export const SearchSeccion = () => {
  return (
    <div className="searchSeccion ">
      <div className="" style={{ minWidth: "50%" }}>
        <SearchInput></SearchInput>
      </div>

      <p style={{ color: "white", fontSize: "1.2rem" }}>
        Search for Pokémon by name or using the National Pokédex number.
      </p>
      <img
        src={dottedPatterSearch}
        alt="dottedPatterLeft bg"
        className="backgroundPattern left "
      />
      <img
        src={dottedPatterSearch}
        alt="dottedPatterRight bg"
        className="backgroundPattern  right "
      />
    </div>
  );
};
