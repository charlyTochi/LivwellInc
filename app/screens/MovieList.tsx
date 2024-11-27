import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import MovieCard from "@/app/components/MovieCard";
import React from "react";
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

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetching movies function using the fetch API
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
      console.log("making the api call");

      const response = await fetch(url, options);
      const data = await response.json();
      if (data.results) {
        console.log(data.results);

        // Append new movies to the existing list if we're fetching next page
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setHasMore(data.results.length > 0); // If there are no results, set hasMore to false
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load movies when the page changes
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Filter movies based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery, movies]);

  // Trigger next page on scroll for infinite scrolling
  const loadNextPage = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View className="flex-1 bg-white pl-4 pr-4">
      {loading && page === 1 ? (
        <ActivityIndicator size="large" className="mt-4" />
      ) : (
        <>
          <View style={{ marginTop: 50 }}>
            <SearchBar
              placeholder="Search movies..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

          <FlatList
            data={filteredMovies}
            keyExtractor={(item, index) => `${item.id}-${page}-${index}`}
            renderItem={({ item }) => <MovieCard movie={item} />}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && page > 1 ? (
                <ActivityIndicator className="mt-4" />
              ) : null
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
