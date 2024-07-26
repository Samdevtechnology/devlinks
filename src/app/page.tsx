"use client";
import HomePage from "@/app/(home)/Home";
import { auth } from "../stores/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (!loading && !user) {
    router.push("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to Login...</div>; // Or you can return a placeholder
  }

  return <HomePage />;
}
