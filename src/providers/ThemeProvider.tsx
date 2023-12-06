"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

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

  // JSON theme 가져오기
  const getThemes = async () => {
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
    themeHandler(selTheme);
  };

  // JSON theme 적용
  const themeHandler = useCallback(
    (_selTheme: any) => {
      console.log("themeHandler: ", _selTheme);
      if (_selTheme) {
        Object.keys(_selTheme).map((key: any) => {
          const element = document.getElementById(key);
          if (!element) return;

          console.log(
            123123,
            _selTheme[key]["스타일"],
            _selTheme[key]["내용"],
            _selTheme[key]["이미지"],
            _selTheme[key]["링크"],
            element.nodeName,
          );

          if (_selTheme[key]["스타일"]) {
            element.style.color = _selTheme[key]["스타일"]["컬러"] || element.style.color;
            element.style.fontWeight = _selTheme[key]["스타일"]["글자굵기"] || element.style.fontWeight;
            element.style.fontSize = _selTheme[key]["스타일"]["글자크기"] || element.style.fontSize;
            element.style.width = _selTheme[key]["스타일"]["가로"] || element.style.width;
            element.style.height = _selTheme[key]["스타일"]["세로"] || element.style.height;
          }

          if (_selTheme[key]["내용"]) {
            element.innerHTML = _selTheme[key]["내용"] || "";
          }

          if (_selTheme[key]["이미지"] && element instanceof HTMLImageElement) {
            element.src = _selTheme[key]["이미지"];
          }

          if (_selTheme[key]["링크"] && element instanceof HTMLAnchorElement) {
            element.href = _selTheme[key]["링크"];
          }

          element.style.border = "1px solid red";
        });
      }
    },
    [selTheme],
  );

  useEffect(() => {
    getThemes();
  }, []);

  return <ThemeContext.Provider value={{ selTheme }}>{children}</ThemeContext.Provider>;
}
