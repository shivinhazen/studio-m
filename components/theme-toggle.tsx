"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("light");

  const applyTheme = React.useCallback((next: Theme) => {
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = window.localStorage.getItem("theme") as Theme | null;
    const initialTheme = stored ?? (media.matches ? "dark" : "light");
    applyTheme(initialTheme);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      const hasStoredPreference = Boolean(window.localStorage.getItem("theme"));
      if (hasStoredPreference) return;
      applyTheme(event.matches ? "dark" : "light");
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme" && (event.newValue === "light" || event.newValue === "dark")) {
        applyTheme(event.newValue);
      }
    };

    media.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      media.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [applyTheme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    window.localStorage.setItem("theme", next);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Alternar tema"
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className="relative"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
