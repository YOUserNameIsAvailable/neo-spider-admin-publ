"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  selTheme: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [selTheme, setSelTheme] = useState<any>(null);

  const themeHandler = async () => {
    const pathname = window.location.pathname;
    const themeJson = await fetch("/theme.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const themes = await themeJson.json();
    const selTheme = themes[pathname.split("/")[1]];
    console.log("themes: ", themes, selTheme);
    setSelTheme(selTheme);
  };

  useEffect(() => {
    themeHandler();
  }, []);

  return <ThemeContext.Provider value={{ selTheme }}>{children}</ThemeContext.Provider>;
}
