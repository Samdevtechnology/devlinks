"use client";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import ProfileForm from "@/components/forms/Profile";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const formRef = useRef<{ submit: () => void } | null>(null);
  const router = useRouter();

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
    router.push("/preview");
  };

  return (
    <Container className="h-[90%]">
      <div className="bg-white h-fit flex flex-col justify-between items-center pt-6 mt-6 rounded-xl">
        <div className="px-6 mb-10">
          <h1 className="font-bold text-2xl">Profile Details</h1>
          <p className="text-grey">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="p-6 w-full">
          <ProfileForm ref={formRef} />
        </div>
        <div className="border-t border-border p-4 w-full">
          <Button onClick={handleFormSubmit}>Save</Button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
