import { useEffect, useState } from "react";

const extractPokemonNames = (chain) => {
  const names = [];

  const traverse = (node) => {
    names.push(node.species.name);
    node.evolves_to.forEach(traverse);
  };

  traverse(chain);
  return names;
};

export const useEvolutionChain = (chainUrl) => {
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chainUrl) return;

    const fetchEvolutionData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(chainUrl);
        if (!res.ok) throw new Error("Error fetching evolution chain");

        const data = await res.json();
        const names = extractPokemonNames(data.chain);

        const pokemonUrls = names.map(
          (name) => `https://pokeapi.co/api/v2/pokemon/${name}`,
        );

        const responses = await Promise.all(
          pokemonUrls.map((url) => fetch(url)),
        );

        const pokemons = await Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error("Error fetching a Pokémon");
            return res.json();
          }),
        );

        setEvolutions(pokemons);
      } catch (err) {
        setError(err.message || "Unknown error");
        setEvolutions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionData();
  }, [chainUrl]);

  return { evolutions, loading, error };
};
