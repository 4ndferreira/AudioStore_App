import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export interface Data {
  price: string; 
  id: number;
  name: string; 
  category: string;
  rating: number
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(true);
  
  useEffect(() => {
    const fetchData = () => {
      axios
      .get(url)
      .then((res: AxiosResponse<Data[]>) => isMounted && setData(res.data))
      .catch(err => {
        setError('An error occurred. Awkward...');
        console.error("error fetching API data", err);
      })
      .finally(() => setLoading(false))
    };
    fetchData();
    return () => {
      setIsMounted(false);
    };
  }, [isMounted, url]);

  return { data, loading, error };
};