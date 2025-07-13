import "./SearchSeccion.css";
import dottedPatterSearch from "../../assets/searchSeccionImages/dottedPatterSearch.png";
import { SearchInput } from "../atoms/SearchInput";

export const SearchSeccion = ({ refInput, onKeyDown }) => {
  return (
    <div className="searchSeccion ">
      <div className="containerInput" style={{ minWidth: "50%" }}>
        <SearchInput ref={refInput} onKeyDown={onKeyDown}></SearchInput>
      </div>

      <p style={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}>
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
