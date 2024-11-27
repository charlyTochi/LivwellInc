import React from "react";
import { TextInput, View } from "react-native";

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
  return (
    <View
      className={"flex-row items-center bg-gray-50 rounded-lg p-2 mx-2 my-2"}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className={"flex-1 text-base text-gray-800"}
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default SearchBar;
