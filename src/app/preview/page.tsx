"use client";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { useLinkStore } from "@/stores/linkStore";
import useUserStore from "@/stores/userStore";
import { toast } from "@/components/ui/use-toast";
import UserCard from "./components/UserCard";

const Preview = () => {
  const { links } = useLinkStore();
  const { user } = useUserStore();

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      const previewUrl = currentUrl.replace("/preview", `/view/${user?.uid}`);
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

        <UserCard user={user} links={links} />
      </Container>
    </div>
  );
};

export default Preview;
