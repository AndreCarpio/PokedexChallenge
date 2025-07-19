import { useEffect, useState } from "react";

export const usePokemon = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      if (res.ok) {
        const data = await res.json();
        setPokemon(data);
      } else {
        setError("Failed to get data");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to get data");
    } finally {
      setLoading(false);
    }
  }

  return { pokemon, setPokemon, loading, error };
};
