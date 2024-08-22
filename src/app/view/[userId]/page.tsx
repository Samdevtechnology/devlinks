"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/stores/firebase/config"; // Adjust this path based on your setup
import UserCard from "@/app/preview/components/UserCard";
import { Link } from "@/types/link";

interface User {
  uid: string;
  email: string | null;
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
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        const linksSnapshot = await getDocs(
          collection(db, "users", userId, "links")
        );
        const userLinks: Link[] = linksSnapshot.docs.map((doc) => {
          const data = doc.data() as Link;
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <UserCard user={user} links={links} />
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default ViewPage;
