import Image from "next/image";
import FlipCardImg from "@/components/icons/FlipCard";

const FlipCard = () => {
  return (
    <div className="group perspective w-64 h-96">
      <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
        {/* Front Side */}
        <div className="absolute w-full flex justify-center items-center h-full backface-hidden">
          <FlipCardImg.Front />
        </div>

        {/* Back Side */}
        <div className="absolute w-full flex justify-center items-center h-full rounded-lg rotate-y-180 backface-hidden">
          <FlipCardImg.Back />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
