import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/lib/utils";
import BrandedLinks from "@/components/common/BrandedLinks";
import { Link as LinkType } from "@/types/link";

interface User {
  uid: string;
  email: string | null;
  nickname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  photoURL?: string | null;
  useNickname?: boolean;
}

interface UserCardProps {
  user: User | null;
  links?: LinkType[];
}

const UserCard = ({ user, links = [] }: UserCardProps) => {
  const profilePic = user?.photoURL;
  const fullName =
    user?.firstName || user?.lastName
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : undefined;

  const profileName = user?.useNickname ? user?.nickname : fullName;

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="flex flex-col bg-white rounded-3xl justify-center items-center p-6 w-full max-w-80">
        <div className="flex flex-col justify-center items-center text-center">
          <Avatar
            className={cn("w-28 h-28", profilePic && "border-4 border-primary")}
          >
            <AvatarImage src={profilePic ?? ""} />

            <AvatarFallback>
              <Skeleton width={112} height={112} circle />
            </AvatarFallback>
          </Avatar>

          <h3 className="font-bold w-full text-3xl mt-2 mb-1">
            {profileName || <Skeleton />}
          </h3>

          <p className="text-grey w-full">
            {user?.email || <Skeleton height={6} />}
          </p>
        </div>
        <div className="link mt-4 max-h-40 w-full overflow-y-auto no-scrollbar">
          {!links.length && <div>No links Available</div>}
          <ul>
            {Array.from({ length: Math.max(links.length, 4) }).map(
              (_, index) => {
                const link = links[index];
                if (link) {
                  return (
                    <li key={link.id}>
                      <Link href={link.url} target="_blank">
                        <BrandedLinks
                          className="font-semibold"
                          name={link.type}
                        />
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={`skeleton-${index}`}>
                      <Skeleton className="mb-2 w-full" height={40} />
                    </li>
                  );
                }
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
