import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    release_date?: string | undefined;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    genres?: string[];
    runtime?: number;
  };
  onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseYear = movie.release_date?.split("-")[0]; // Extract release year

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row bg-white rounded-lg shadow-md m-2 p-3"
    >
      {/* Poster Image */}
      <Image source={{ uri: posterUrl }} className="h-32 w-24 rounded-lg" />

      {/* Movie Details */}
      <View className="flex-1 ml-4 justify-between">
        {/* Title */}
        <Text className="text-lg font-bold">{movie.title}</Text>

        {/* Rating */}
        <Text className="text-yellow-500 text-sm">
          ⭐ {movie.vote_average.toFixed(1)}
        </Text>

        {/* Genres */}
        <Text className="text-gray-500 text-sm">
          Release Year: {releaseYear || "N/A"}
        </Text>

        {/* Runtime */}
        <Text className="text-gray-500 text-sm">{movie.vote_count} votes</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
