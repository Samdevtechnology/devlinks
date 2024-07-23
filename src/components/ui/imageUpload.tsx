"use client";

import React, { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Image } from "@phosphor-icons/react";

interface ImageUploadProps {
  className?: string;
}

const ImageUpload = ({ className = "" }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="imageUpload" className="cursor-pointer relative">
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div
          className={cn(
            "text-primary rounded-xl flex justify-center items-center py-14 px-9",
            className,
            selectedImage ? "bg-cover bg-center text-white" : "bg-primary-light"
          )}
          style={{
            backgroundImage: selectedImage
              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${selectedImage})`
              : "none",
            backgroundColor: selectedImage ? "lightgray" : "transparent",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <Image size={40} className="text-inherit" alt="image icon" />
            <button className="font-semibold">
              {!selectedImage ? "+ Upload Image" : "Change Image"}
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
