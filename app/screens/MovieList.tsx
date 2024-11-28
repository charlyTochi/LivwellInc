import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  useColorScheme,
} from "react-native";
import { useState, useEffect } from "react";
import SearchBar from "@/app/components/SearchBar";
import MovieCard from "@/app/components/MovieCard";
import React from "react";
import useFetchMovies from "@/hooks/useFetchMovies";

export default function MovieList() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { movies, loading, hasMore, fetchMoreMovies } = useFetchMovies();
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <View
      className={`flex-1 pl-4 pr-4 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      {loading && movies.length === 0 ? (
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
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => <MovieCard movie={item} />}
            onEndReached={fetchMoreMovies}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && movies.length > 0 ? (
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
