import React from "react";
import LogoIcon from "./LogoIcon";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className, textClassName }: LogoProps) => {
  return (
    <div className={cn(`flex justify-center items-center gap-2 `, className)}>
      <LogoIcon />
      <span className={cn("font-bold text-3xl", className)}>devlinks</span>
    </div>
  );
};

export default Logo;
