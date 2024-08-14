"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/stores/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import useUserStore from "@/stores/userStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const [dbUser, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(error);
      return;
    }

    if (dbUser) {
      if (!user) {
        const { uid, email, displayName, photoURL } = dbUser;
        setUser({ uid, email, displayName, photoURL });
      }
    } else {
      clearUser();
      router.push("/login");
    }
  }, [dbUser, loading, error, user, setUser, clearUser, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
