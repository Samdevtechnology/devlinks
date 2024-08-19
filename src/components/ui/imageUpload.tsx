"use client";

import React, { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Image } from "@phosphor-icons/react";
import useUserStore from "@/stores/userStore";

interface ImageUploadProps {
  className?: string;
  label?: string;
  onChange: (image: string) => void;
  onBlur: () => void;
}

const ImageUpload = ({
  className = "",
  label,
  onChange,
  onBlur,
}: ImageUploadProps) => {
  const { user } = useUserStore();
  const userImage = user?.photoURL;
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      onChange("");
    }
  };

  return (
    <div className="flex flex-col items-start bg-grey-light text-grey rounded-xl p-5">
      <label htmlFor="imageUpload" className="cursor-pointer relative">
        <span>{label}</span>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          onBlur={onBlur}
        />
        <div
          className={cn(
            "text-primary rounded-xl flex justify-center items-center mt-4 py-14 px-9",
            className,
            userImage ? "bg-cover bg-center text-white" : "bg-primary-light"
          )}
          style={{
            backgroundImage: userImage
              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${userImage})`
              : "none",
            backgroundColor: userImage ? "lightgray" : "",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <Image size={40} className="text-inherit" alt="image icon" />
            <span className="font-semibold">
              {!userImage ? "+ Upload Image" : "Change Image"}
            </span>
          </div>
        </div>
      </label>
      <span className="text-xs mt-6">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </span>
    </div>
  );
};

export default ImageUpload;
