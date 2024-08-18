"use client";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLinkStore } from "@/stores/linkStore";
import useUserStore from "@/stores/userStore";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/lib/utils";
import BrandedLinks from "@/components/common/BrandedLinks";
import { toast } from "@/components/ui/use-toast";

const Preview = () => {
  const { links } = useLinkStore();
  const { user } = useUserStore();

  const profilePic = user?.photoURL;
  const fullName =
    user?.firstName || user?.lastName
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : undefined;

  const profileName = user?.useNickname ? user?.nickname : fullName;

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      const previewUrl = currentUrl.replace(
        "/preview",
        `/${user?.uid}/preview`
      );
      await navigator.clipboard.writeText(previewUrl);
      toast({
        title: "Link Copied",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <div className="bg-primary w-full h-[40vh] top-0 hidden sm:flex absolute rounded-b-[32px] -z-10"></div>
      <Container className="pt-4 flex flex-col h-screen">
        <div className="flex justify-between items-center gap-4 sm:bg-white rounded-xl py-2 sm:px-4 ">
          <div className="w-full sm:w-fit">
            <Link href="\">
              <Button size="lg" variant="secondary">
                Back to Editor
              </Button>
            </Link>
          </div>
          <div className="w-full sm:w-fit">
            <Button size="lg" onClick={copyToClipboard}>
              Share Link
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col bg-white rounded-3xl justify-center items-center p-6 w-full max-w-80">
            <div className="flex flex-col justify-center items-center text-center">
              <Avatar
                className={cn(
                  "w-28 h-28",
                  profilePic && "border-4 border-primary"
                )}
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
      </Container>
    </div>
  );
};

export default Preview;
