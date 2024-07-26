import { useTheme } from "./ThemeProvider";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-full p-2 flex gap-2 h-16">
      <button
        onClick={() => setTheme("dark")}
        className="w-full h-full bg-primary rounded-xl"
        style={{
          border: theme === "dark" ? "2px solid var(--accent)" : "none",
        }}
      >
        Dark mode
      </button>
      <button
        onClick={() => setTheme("light")}
        className="w-full h-full bg-primary rounded-xl"
        style={{
          border: theme === "light" ? "2px solid var(--accent)" : "none",
        }}
      >
        Light Mode
      </button>
      <button
        onClick={() => setTheme("system")}
        className="w-full h-full bg-primary rounded-xl"
        style={{
          border: theme === "system" ? "2px solid var(--accent)" : "none",
        }}
      >
        Auto
      </button>
    </div>
  );
};

export default ThemeSwitch;
