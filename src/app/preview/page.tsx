"use client";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLinkStore } from "@/stores/linkStore";
import useUserStore from "@/stores/userStore";
import { toast } from "@/components/ui/use-toast";
import UserCard from "./components/UserCard";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import SplitBtn from "./components/SplitBtn";

const Preview = () => {
  const { links } = useLinkStore();
  const { user } = useUserStore();
  const [url, setUrl] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setUrl(currentUrl.replace("/preview", `/view/${user?.uid}`));
    }
  }, [user?.uid]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div>
      <div className="bg-primary w-full h-[40vh] top-0 hidden sm:flex absolute rounded-b-[32px] -z-10"></div>
      <Container className="pt-4 flex flex-col h-screen">
        <div className="flex justify-between items-center gap-4 sm:bg-card rounded-xl py-2 sm:px-4 dark:bg-primary-light">
          <div className="w-full sm:w-fit">
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Back to Editor
              </Button>
            </Link>
          </div>
          <div className="w-full sm:w-fit flex justify-center items-center gap-2">
            <ThemeToggleBtn />
            <SplitBtn
              copyFunc={copyToClipboard}
              qrFunc={handleFlip}
              isFlipped={isFlipped}
            />
          </div>
        </div>

        <UserCard user={user} links={links} isFlipped={isFlipped} url={url} />
      </Container>
    </div>
  );
};

export default Preview;
