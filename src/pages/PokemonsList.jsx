import { useState, useEffect, useRef } from "react";
import "./PokemonsList.css";
import { Card } from "../components/molecules/Card";
import { SearchSeccion } from "../components/molecules/SearchSeccion";
import { Spinner } from "../components/atoms/Spinner";

export const PokemonsList = () => {
  const [pokemons, setPokemons] = useState([]);
  const buttonLoadMore = useRef(null);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
  );
  const nextPage = useRef(null);

  const getPokemons = async () => {
    if (currentPage == null) {
      return;
    }
    const res = await fetch(currentPage);
    const data = await res.json();
    nextPage.current = data.next;

    const pokemonsInfo = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          url: pokemon.url,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
          types: details.types.map((t) => t.type.name),
        };
      }),
    );
    setPokemons((prev) => [...prev, ...pokemonsInfo]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage(nextPage.current);
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(buttonLoadMore.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getPokemons();
  }, [currentPage]);

  return (
    <main>
      <SearchSeccion></SearchSeccion>

      <div className="containerPokemonCard">
        {pokemons.map((pokemon, index) => {
          return (
            <Card
              key={pokemon.url}
              pokemonName={pokemon.name}
              pokemonNumber={index + 1}
              imageURL={pokemon.image}
              types={pokemon.types}
            ></Card>
          );
        })}
      </div>

      <div
        style={{
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Spinner color="#EA5D60"></Spinner>
      </div>

      <button ref={buttonLoadMore} style={{ opacity: 0 }}>
        load more
      </button>
    </main>
  );
};
