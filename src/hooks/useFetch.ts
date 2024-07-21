import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, isPending, error };
};
