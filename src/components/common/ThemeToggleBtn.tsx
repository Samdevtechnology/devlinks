import { Button } from "../ui/button";
import Icons from "../icons/Icons";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";

const ThemeToggleBtn = () => {
  const { theme, toggleTheme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  return (
    <Button onClick={toggleTheme} variant="ghost">
      {theme === "dark" ? <Icons.Sun size={24} /> : <Icons.Moon size={24} />}
    </Button>
  );
};

export default ThemeToggleBtn;
