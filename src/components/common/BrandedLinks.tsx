import { cn } from "@/lib/utils";
import BgColors from "../colors/BgColors";
import Icons, { ForwardArrow } from "../icons/Icons";

interface BrandedLinksProps {
  name: string;
  className?: string;
}

const BrandedLinks = ({ name, className }: BrandedLinksProps) => {
  const casedName = name.replace(/[ .]/g, "_");
  const Icon = Icons[casedName as keyof typeof Icons];
  const color = BgColors[casedName as keyof typeof BgColors];

  if (casedName === "Frontend_Mentor") {
    return (
      <div
        className={cn(
          `flex justify-between items-center mb-2 w-full border border-[#D9D9D9] text-grey-dark text-xs bg-white px-4 py-3 rounded-md`,
          className
        )}
      >
        <div className="flex gap-2">
          <Icon colored />
          <span>{name}</span>
        </div>
        <div>
          <ForwardArrow color="#737373" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        `flex justify-between items-center mb-2 w-full text-xs text-white px-4 py-3 rounded-md`,
        className
      )}
      style={{ backgroundColor: color }}
    >
      <div className="flex gap-2">
        <Icon color="white" innerColor={color} />
        <span>{name}</span>
      </div>
      <div>
        <ForwardArrow color="white" />
      </div>
    </div>
  );
};

export default BrandedLinks;
