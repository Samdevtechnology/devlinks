import BrandedLinks from "@/components/common/BrandedLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useLinkStore } from "@/stores/linkStore";
import useUserStore from "@/stores/userStore";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PreviewFrame = () => {
  const { links } = useLinkStore();
  const { user } = useUserStore();

  const profilePic = user?.photoURL;
  const fullName =
    user?.firstName || user?.lastName
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : undefined;

  const profileName = user?.useNickname ? user?.nickname : fullName;
  return (
    <div className="w-full h-fit bg-white rounded-xl ml-8 lg:ml-12 mt-6 sticky top-0">
      <div className="w-full flex justify-center items-center py-6 ">
        <div className="relative">
          <Image
            src="/assets/image/preview-frame.png"
            alt="preview frame"
            priority
            width={256}
            height={528}
          />
          <div className="absolute inset-0 overflow-hidden m-4 px-4 flex items-start justify-center ">
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex flex-col justify-center items-center text-center">
                <Avatar
                  className={cn(
                    "w-24 h-24 mt-10",
                    profilePic && "border-4 border-primary"
                  )}
                >
                  <AvatarImage src={profilePic ?? ""} />

                  <AvatarFallback>
                    <Skeleton width={96} height={96} circle />
                  </AvatarFallback>
                </Avatar>

                <h3 className="font-semibold w-full text-lg my-2">
                  {profileName || <Skeleton />}
                </h3>

                <p className="text-grey w-full">
                  {user?.email || <Skeleton height={6} />}
                </p>
              </div>
              <div className="link mt-8 max-h-[264px] w-full overflow-y-auto no-scrollbar">
                <ul>
                  {Array.from({ length: Math.max(links.length, 4) }).map(
                    (_, index) => {
                      const link = links[index];
                      if (link) {
                        return (
                          <li key={link.id}>
                            <BrandedLinks name={link.type} />
                          </li>
                        );
                      } else {
                        return (
                          <Skeleton
                            className="mb-2 w-full"
                            height={40}
                            key={`skeleton-${index}`}
                          />
                        );
                      }
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFrame;
