import { useEffect, useState } from "react";

export const useGet = (url) => {
  const [data, setFetch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  async function fetchData() {
    try {
      setLoading(true);
      let res = await fetch(url);
      if (res.ok) {
        res = await res.json();
        setFetch(res);
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

  return { data, setFetch, loading, error };
};
