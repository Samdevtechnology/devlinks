import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (theme) => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        set({ theme });
      },

      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          const root = document.documentElement;
          root.classList.remove(state.theme);
          root.classList.add(newTheme);
          return { theme: newTheme };
        });
      },

      initializeTheme: () => {
        const root = document.documentElement;
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        const osPreference: Theme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";
        const initialTheme = storedTheme || osPreference;
        root.classList.remove("light", "dark");
        root.classList.add(initialTheme);
        set({ theme: initialTheme });
      },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(state?.theme || "light");
      },
    }
  )
);
