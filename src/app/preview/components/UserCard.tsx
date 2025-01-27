"use client";
import { Link as LinkType } from "@/types/link";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

interface User {
  uid: string;
  displayMail?: string | null;
  nickname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  photoURL?: string | null;
  useNickname?: boolean;
}

interface UserCardProps {
  user: User | null;
  links?: LinkType[];
  isFlipped: boolean;
  url: string;
}

const UserCard = ({ user, links = [], isFlipped, url }: UserCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="group perspective w-64 h-96">
        <div
          className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full flex justify-center items-center h-full backface-hidden">
            <CardFront user={user} links={links} />
          </div>

          {/* Back Side */}
          <div className="absolute w-full flex justify-center items-center h-full rounded-lg rotate-y-180 backface-hidden">
            <CardBack url={url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
