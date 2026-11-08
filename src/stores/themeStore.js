
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Detect System Theme
const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Create Theme Store
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getInitialTheme(),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "bait-altaheen-theme",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);
