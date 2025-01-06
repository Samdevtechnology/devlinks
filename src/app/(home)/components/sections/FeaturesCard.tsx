"use client";

import Icons from "@/components/icons/Icons";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  Icon: "Brush" | "QRCode" | "Tool" | "Wind";
  Title: string;
  Text: string;
  Inverse?: boolean;
}

const FeaturesCard = ({ Icon, Title, Text, Inverse }: Props) => {
  const { systemTheme, theme } = useTheme();
  const [loading, setLoading] = useState(true);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (currentTheme) setLoading(false);
  }, [currentTheme]);

  const IconName = Icons[`${Icon}`];
  const iconColor = loading
    ? "#633cff"
    : currentTheme === "dark"
    ? "#A985FF"
    : "#633cff";

  return (
    <div
      className={cn(
        "bg-white dark:bg-primary-light p-6 rounded-md",
        Inverse && "bg-primary dark:bg-primary"
      )}
    >
      <div className="mb-5 sm:mb-0 p-3 bg-white dark:bg-primary-light rounded-sm w-fit">
        <IconName color={iconColor} />
      </div>
      <h5 className="text-2xl font-semibold mb-2 my-1">{Title}</h5>
      <p className="text-lg">{Text}</p>
    </div>
  );
};

export default FeaturesCard;
