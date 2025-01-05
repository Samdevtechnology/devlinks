"use client";

import { Dark, Light, Skeleton } from "@/components/icons/Hero";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const HeroImage = () => {
  const { systemTheme, theme } = useTheme();
  const [loading, setLoading] = useState(true);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (currentTheme) setLoading(false);
  }, [currentTheme]);

  if (loading) return <Skeleton />;

  return currentTheme === "dark" ? <Dark /> : <Light />;
};

export default HeroImage;
