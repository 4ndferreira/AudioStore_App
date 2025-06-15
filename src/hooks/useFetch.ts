import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { auth } from "../firebase/Config";

export interface Data {
  id: number;
  name: string; 
  price: string; 
  description: {
    title: string;
    content: string[]
  };
  image: string;
  category: string;
  rating: number;
  created_at: string;
  reviews: [
    {
      id: number;
      user: string,
      description: string,
      rating: number,
    }
  ];
}

export const useFetch = () => {
  const [data, setData] = useState<Data[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      auth.currentUser
      ?.getIdToken(true)
      .then((idToken) => {
          const url = `https://my-project-pb-challenge-default-rtdb.firebaseio.com/products.json?auth=${idToken}`;
          setLoading(true);
          axios
            .get(url)
            .then((res: AxiosResponse<Data[]>) => isMounted && setData(res.data))
            .catch((err) => {
              setError("An error occurred. Awkward...");
              console.error(error, err);
            })
            .finally(() => setLoading(false));
        })
        .catch((error) => {
          console.error("Error obtaining authentication token: ", error);
        });

      // const url = "http://localhost:3000/products";
      // setLoading(true);
      // axios
      //   .get(url)
      //   .then((res: AxiosResponse<Data[]>) => isMounted && setData(res.data))
      //   .catch((err) => {
      //     setError("An error occurred. Awkward...");
      //     console.error(error, err);
      //   })
      //   .finally(() => setLoading(false));
    };
    
    fetchData();
    return () => {
      setIsMounted(false);
    };
  }, [error, isMounted]);
  return { data, loading, error };
};