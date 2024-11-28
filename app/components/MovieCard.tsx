import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import AnimatedViewWrapper from "./AnimatedViewWrapper";

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
  const colorScheme = useColorScheme(); // Get the current theme (light or dark)
  const isDarkMode = colorScheme === "dark";
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseYear = movie.release_date?.split("-")[0];

  return (
    <AnimatedViewWrapper
      animation="fadeInUp"
      duration={2000}
      className="m-2"
      delay={0 * 100}
      key={0}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[
          // Android uses elevation
          { elevation: 5 },
          // iOS uses shadow properties
          Platform.OS === "ios" && {
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
          },
        ]}
        className={`flex flex-row rounded-lg shadow-lg p-3 ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <Image source={{ uri: posterUrl }} className="h-32 w-24 rounded-lg" />
        <View className="flex-1 ml-4 justify-between">
          <Text
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {movie.title}
          </Text>
          <Text className="text-yellow-500">
            ⭐ {movie.vote_average.toFixed(1)}
          </Text>
          <Text className="text-gray-500">
            Release Year: {releaseYear || "N/A"}
          </Text>
          <Text className="text-gray-500">{movie.vote_count} votes</Text>
        </View>
      </TouchableOpacity>
    </AnimatedViewWrapper>
  );
};

export default MovieCard;
