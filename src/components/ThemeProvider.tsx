import { useThemeDetector, useThemeColor } from "@/utils/hooks";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_themeColor, updateThemeColor] = useThemeColor();
  const systemTheme = useThemeDetector();
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const usedTheme = systemTheme ? "dark" : "light";
      updateThemeColor(usedTheme === "dark" ? "#130b18" : "#efe7f4");
      root.classList.add(usedTheme);
      return;
    }

    root.style.transition = "all 0.35s ease-in-out";
    updateThemeColor(theme === "dark" ? "#130b18" : "#efe7f4");
    root.classList.add(theme);
  }, [theme, systemTheme, updateThemeColor]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
