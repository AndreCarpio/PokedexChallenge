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
  const inputSeacrh = useRef(null);
  const [pokemonSearch, setPokemonSearch] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showListPokemons, setShowListPokemons] = useState(true);

  const searchPokemon = async (e) => {
    if (e.key === "Enter") {
      if (inputSeacrh.current.value == "") {
        setLoadingSearch(false);
        setShowListPokemons(true);
        setPokemonSearch(null);
        return;
      }
      if (!loadingSearch) {
        setLoadingSearch(true);
        setShowListPokemons(false);
        try {
          let resSearch = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${inputSeacrh.current.value}`,
          );
          if (resSearch.ok) {
            resSearch = await resSearch.json();
            setPokemonSearch(resSearch);
          } else {
            throw new Error("Pokemon not found");
          }
        } catch (error) {
          console.log(error);
          setPokemonSearch(null);
        } finally {
          setLoadingSearch(false);
        }
      }
    }
  };

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
        return details;
      }),
    );
    setPokemons((prev) => [...prev, ...pokemonsInfo]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (showListPokemons) {
            setCurrentPage(nextPage.current);
          }
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
      <SearchSeccion
        refInput={inputSeacrh}
        onKeyDown={searchPokemon}
      ></SearchSeccion>

      {showListPokemons && (
        <>
          <div className="containerPokemonCard">
            {pokemons.map((pokemon) => {
              return <Card key={pokemon.id} pokemon={pokemon}></Card>;
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
            <Spinner color="var(--primary-color)"></Spinner>
          </div>
        </>
      )}
      <button ref={buttonLoadMore} style={{ opacity: 0 }}>
        load more
      </button>

      {!showListPokemons && (
        <>
          {pokemonSearch != null && !loadingSearch && (
            <>
              <div className="containerPokemonCard">
                <Card key={pokemonSearch.id} pokemon={pokemonSearch}></Card>
              </div>
            </>
          )}

          {loadingSearch && (
            <div
              style={{
                height: "5rem",
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
                margin: "3rem auto",
              }}
            >
              <Spinner color="var(--primary-color)"></Spinner>
            </div>
          )}
          {!loadingSearch && !pokemonSearch && (
            <div className="messagePokemonNoFound">
              <p>Pokémon "{inputSeacrh.current.value}" not found</p>
            </div>
          )}
        </>
      )}
    </main>
  );
};
