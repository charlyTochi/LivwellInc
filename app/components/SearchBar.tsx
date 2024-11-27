import React from "react";
import { Platform, TextInput, useColorScheme, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
}) => {
  const colorScheme = useColorScheme(); // Get the current theme (light or dark)
  const isDarkMode = colorScheme === "dark";

  return (
    <View
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
      className={`flex-row items-center rounded-lg p-2 mx-2 my-2 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className={`flex-1 text-base  ${
          isDarkMode ? "text-white" : "text-black"
        } `}
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default SearchBar;
