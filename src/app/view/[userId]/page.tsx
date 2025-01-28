"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/stores/firebase/config"; // Adjust this path based on your setup
import UserCard from "@/app/preview/components/UserCard";
import { Link as LinkType } from "@/types/link";
import Container from "@/components/common/Container";
import Link from "next/link";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import SplitBtn from "@/app/preview/components/SplitBtn";
import { toast } from "@/components/ui/use-toast";
import Logo from "@/components/common/Logo";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface User {
  uid: string;
  displayMail: string | null;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  useNickname?: boolean;
}

interface ViewPageProps {
  params: { userId: string };
}

const ViewPage = ({ params }: ViewPageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [url, setUrl] = useState("");

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = params.userId;
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          console.log("User not found");
        }

        // Fetch user's links from Firestore
        const linksCollection = collection(db, "users", userId, "links");
        const linksSnapshot = await getDocs(
          query(linksCollection, orderBy("order"))
        );
        const userLinks: LinkType[] = linksSnapshot.docs.map((doc) => {
          const data = doc.data() as LinkType;
          return {
            id: doc.id,
            type: data.type,
            url: data.url,
          };
        });

        setLinks(userLinks);
      } catch (error) {
        console.error("Error fetching user or links: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.userId]);

  if (loading) {
    return (
      <Container className="pt-4 flex justify-center items-center h-screen">
        <LoadingSpinner text="Fetching User" />
      </Container>
    );
  }

  return (
    <div>
      {user ? (
        <Container className="pt-4 flex flex-col h-screen">
          <div className="flex justify-between items-center gap-4 sm:bg-card rounded-xl py-2 sm:px-4 dark:bg-primary-light">
            <div className="w-full sm:w-fit">
              <Link href="/">
                <Logo />
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
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default ViewPage;
