// useTheme.js

import { useContext } from "react";
import { ThemeProviderContext } from "@/app/components/theme-provider"; // Adjust the path as per your project structure

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
