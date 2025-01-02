"use client";

import { Button } from "../ui/button";
import { Sun, Moon } from "../icons/Icons";
import { useTheme } from "next-themes";

const ThemeToggleBtn = ({ className }: { className?: string }) => {
  const { setTheme, systemTheme, theme } = useTheme();

  const toggleTheme = () => {
    const effectiveTheme = theme === "system" ? systemTheme : theme;
    setTheme(effectiveTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" onClick={toggleTheme} className={className}>
      <Sun size={24} className="dark:flex hidden" />
      <Moon size={24} className="dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggleBtn;
