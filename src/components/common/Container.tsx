import { cn } from "@/lib/utils";
import { ReactNode, ElementType } from "react";
type props = {
  children: ReactNode;
  className?: string;
  Variant?: ElementType;
};

const Container = ({ children, className = "", Variant = "div" }: props) => {
  return (
    <Variant
      className={cn(`px-6 md:px-8 lg:px-12 max-w-[90rem] mx-auto`, className)}
    >
      {children}
    </Variant>
  );
};

export const CarouselCont =
  "w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] lg:w-[calc(100vw-6rem)] max-w-[84rem]";

export default Container;
