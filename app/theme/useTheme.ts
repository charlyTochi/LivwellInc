import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";

export const useTheme = () => {
  const colorScheme = useColorScheme(); // Detects the system theme (light/dark)

  // Set the initial theme
  const [theme, setTheme] = useState(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  // Update the theme whenever the system color scheme changes
  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  return theme;
};
