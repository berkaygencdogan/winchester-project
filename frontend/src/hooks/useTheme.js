import { useEffect, useState } from "react";

export default function useTheme() {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    // Sistem teması
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
