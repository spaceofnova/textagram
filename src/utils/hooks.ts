import { useEffect, useState } from "react";

const useThemeDetector = () => {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (e: MediaQueryListEvent) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};

const useThemeColor = (initialColor: string = "#100a09") => {
  const [themeColor, setThemeColor] = useState<string>(initialColor);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      setThemeColor(metaThemeColor.getAttribute("content") || initialColor);
    } else {
      const newMetaThemeColor = document.createElement("meta");
      newMetaThemeColor.name = "theme-color";
      newMetaThemeColor.content = initialColor;
      document.head.appendChild(newMetaThemeColor);
    }
  }, [initialColor]);

  const updateThemeColor = (newColor: string) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", newColor);
    }

    setThemeColor(newColor);
  };

  return [themeColor, updateThemeColor] as const;
};
export { useThemeDetector, useThemeColor };
