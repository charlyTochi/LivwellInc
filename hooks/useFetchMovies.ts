import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Token } from "@/constants/Enums";

interface Movie {
  id: number;
  title: string;
  release_date?: string | undefined;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  genres?: string[];
  runtime?: number;
}

interface UseFetchMovies {
  movies: Movie[];
  loading: boolean;
  hasMore: boolean;
  fetchMoreMovies: () => void;
}

const useFetchMovies = (): UseFetchMovies => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMovies = async (page: number) => {
    const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Token} `,
      },
    };

    setLoading(true);

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.results) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(data.results.length > 0);
      }
    } catch (error) {
      Alert.alert(`Failed to fetch movies: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const fetchMoreMovies = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return { movies, loading, hasMore, fetchMoreMovies };
};

export default useFetchMovies;
