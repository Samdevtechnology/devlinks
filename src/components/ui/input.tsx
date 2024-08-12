import * as React from "react";
import { IconProps } from "../icons/Icons";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string;
  msgOffset?: string;
  Icon?: ({ color, size }: IconProps) => React.JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMsg, Icon, msgOffset = "12", ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-destructive">
            {<Icon />}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-0 focus-visible:shadow focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
            errorMsg &&
              "border-destructive pr-${msgOffset} text-destructive focus-visible:shadow-error focus-visible:border-destructive",
            Icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMsg && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-destructive">
            {errorMsg}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
