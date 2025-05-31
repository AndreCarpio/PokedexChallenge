import { useState, useEffect } from "react";
import "./PokemonsList.css"
import { Card } from "../components/molecules/Card";
import { Header } from "../components/organisms/header";
import { BrowserRouter, Route, Routes } from "react-router";
import { SearchSeccion } from "../components/molecules/SearchSeccion";

export const PokemonsList = () => {
    const [pokemons, setPokemons] = useState([])

    const getPokemons = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
        const data = await res.json();

        const pokemons = await Promise.all(data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
                url: pokemon.url,
                name: details.name,
                image: details.sprites.other["official-artwork"].front_default,
                types: details.types.map(t => t.type.name)
            };
        }));
        setPokemons(pokemons)
    }

    useEffect(() => {
        getPokemons()
    }, [])

    return (
        <>
            <SearchSeccion></SearchSeccion>
            <div className="containerPokemonCard" >
                {
                    pokemons.map((pokemon, index) => {
                        return (
                            <Card key={pokemon.url} pokemonName={pokemon.name} pokemonNumber={index + 1} imageURL={pokemon.image} types={pokemon.types}  ></Card >
                        )
                    })
                }
            </div >
        </>
    )
}