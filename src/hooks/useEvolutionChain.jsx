import { useEffect, useState } from "react";

const extractPokemonIds = (chain) => {
  const ids = [];

  const traverse = (node) => {
    const speciesUrl = node.species.url;
    const id = speciesUrl.split("/").filter(Boolean).pop();
    ids.push(id);
    node.evolves_to.forEach(traverse);
  };

  traverse(chain);
  return ids;
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
        const ids = extractPokemonIds(data.chain);

        const pokemonUrls = ids.map(
          (id) => `https://pokeapi.co/api/v2/pokemon/${id}`,
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
