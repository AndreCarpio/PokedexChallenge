import { useEffect, useState } from "react";

export const useWeaknessesFromTypes = (pokemon) => {
  const [weaknesses, setWeaknesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemon || !pokemon.types) return;

    const fetchWeaknesses = async () => {
      setLoading(true);
      setError(null);

      try {
        const urls = pokemon.types.map((t) => t.type.url);
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(
          responses.map((res) => {
            if (!res.ok) throw new Error(`Error fetching type: ${res.status}`);
            return res.json();
          }),
        );

        const damageMap = {};

        data.forEach((type) => {
          const { double_damage_from, half_damage_from, no_damage_from } =
            type.damage_relations;

          double_damage_from.forEach(({ name }) => {
            damageMap[name] = (damageMap[name] || 1) * 2;
          });

          half_damage_from.forEach(({ name }) => {
            damageMap[name] = (damageMap[name] || 1) * 0.5;
          });

          no_damage_from.forEach(({ name }) => {
            damageMap[name] = 0;
          });
        });

        const result = Object.entries(damageMap)
          .filter(([_, value]) => value > 1)
          .map(([type]) => type);

        setWeaknesses(result);
      } catch (err) {
        setError(err.message || "Error fetching type data.");
        setWeaknesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeaknesses();
  }, [pokemon]);

  return { weaknesses, loading, error };
};
