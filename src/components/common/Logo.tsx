import React from "react";
import { Logo as LogoIcon } from "../icons/Icons";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className, textClassName }: LogoProps) => {
  return (
    <div className={cn(`flex justify-center items-center gap-2 `, className)}>
      <div className="text-primary">
        <LogoIcon color="currentColor" />
      </div>
      <span className={cn("font-bold text-3xl", textClassName)}>devlinks</span>
    </div>
  );
};

export default Logo;
