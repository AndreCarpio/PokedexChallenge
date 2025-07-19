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
            resSearch = {
              url: resSearch.id,
              id: resSearch.id,
              name: resSearch.name,
              image: resSearch.sprites.other["official-artwork"].front_default,
              types: resSearch.types.map((t) => t.type.name),
            };
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
        return {
          url: pokemon.url,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
          types: details.types.map((t) => t.type.name),
          id: details.id,
        };
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
            {pokemons.map((pokemon, index) => {
              return (
                <Card
                  key={pokemon.url}
                  pokemonName={pokemon.name}
                  pokemonNumber={index + 1}
                  imageURL={pokemon.image}
                  types={pokemon.types}
                  id={pokemon.id}
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
                <Card
                  key={pokemonSearch.url}
                  pokemonName={pokemonSearch.name}
                  pokemonNumber={pokemonSearch.id}
                  imageURL={pokemonSearch.image}
                  types={pokemonSearch.types}
                  id={pokemonSearch.id}
                ></Card>
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
