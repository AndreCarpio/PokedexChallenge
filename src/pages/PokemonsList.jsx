import { useState, useEffect, useRef } from "react";
import "./PokemonsList.css";
import { Card } from "../components/molecules/Card";
import { SearchSeccion } from "../components/molecules/SearchSeccion";
import { Alert } from "../components/molecules/Alert";
import { DefaultButton } from "../components/atoms/DefaultButton";
import { Loading } from "../components/atoms/loading";
import { usePokemonContext } from "../context/pokemonListContext";

export const PokemonsList = () => {
  const {
    pokemons,
    setPokemons,
    limit,
    setLimit,
    offset,
    setOffset,
    nextPage,
  } = usePokemonContext();
  const buttonLoadMore = useRef(null);
  const inputSeacrh = useRef(null);
  const [pokemonSearch, setPokemonSearch] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showListPokemons, setShowListPokemons] = useState(true);
  const [autoFetch, setAutoFetch] = useState(true);

  const handleApplyPagination = async () => {
    setAutoFetch(false);
    setPokemons([]);
    await getPokemons(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    );
    setAutoFetch(true);
  };

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

  const getPokemons = async (url) => {
    if (url == null) {
      if (nextPage.current == null) {
        setAutoFetch(false);
        return;
      }
      return;
    }

    setLoadingSearch(true);

    const res = await fetch(url);
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

    setLoadingSearch(false);
  };

  useEffect(() => {
    if (!autoFetch || !showListPokemons) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          getPokemons(nextPage.current);
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(buttonLoadMore.current);
    return () => {
      observer.disconnect();
    };
  }, [autoFetch, showListPokemons]);

  return (
    <main>
      <SearchSeccion
        refInput={inputSeacrh}
        onKeyDown={searchPokemon}
      ></SearchSeccion>

      {showListPokemons && (
        <>
          <div className="fetchOptions">
            <div className="option">
              <label>Limit: </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
              </select>
            </div>
            <div className="option">
              <label>Offset: </label>
              <input
                type="number"
                min={0}
                value={offset}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value));
                  setOffset(val);
                }}
              />
            </div>
            <DefaultButton onClick={handleApplyPagination}>Apply</DefaultButton>
          </div>

          {pokemons.length > 0 && (
            <div className="containerPokemonCard">
              {pokemons.map((pokemon) => {
                return <Card key={pokemon.id} pokemon={pokemon}></Card>;
              })}
            </div>
          )}

          {!loadingSearch && pokemons.length == 0 && (
            <div className="messagePokemonNoFound">
              <Alert
                type="warn"
                title="No Pokémon found."
                description="Try using a smaller offset criteria."
              />
            </div>
          )}

          <div
            style={{
              height: "5rem",
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {loadingSearch && <Loading text="Loading Pokemons" />}
          </div>
        </>
      )}

      <button ref={buttonLoadMore} style={{ opacity: 0 }}>
        load more
      </button>

      {!showListPokemons && (
        <>
          {pokemonSearch != null && !loadingSearch && (
            <div className="containerPokemonCard">
              <Card key={pokemonSearch.id} pokemon={pokemonSearch}></Card>
            </div>
          )}

          {loadingSearch && <Loading text="Searching Pokemon" />}
          {!loadingSearch && !pokemonSearch && (
            <div className="messagePokemonNoFound">
              <Alert
                type="warn"
                title={`No Pokémon found for '${inputSeacrh.current.value}'.`}
                description="Try the following options:"
                list={[
                  "Check for typos",
                  "Use official Pokédex ID",
                  "Try a simpler name like 'pikachu'",
                ]}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};
