import { createContext, useContext, useRef, useState } from "react";

const PokemonContext = createContext(null);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const nextPage = useRef(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        limit,
        setLimit,
        offset,
        setOffset,
        nextPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => useContext(PokemonContext);
