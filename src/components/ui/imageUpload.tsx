"use client";

import React, { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Image } from "@phosphor-icons/react";

interface ImageUploadProps {
  className?: string;
  label?: string;
  onChange: (file: File | null) => void;
  onBlur: () => void;
}

const ImageUpload = ({
  className = "",
  label,
  onChange,
  onBlur,
}: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null);
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
            selectedImage ? "bg-cover bg-center text-white" : "bg-primary-light"
          )}
          style={{
            backgroundImage: selectedImage
              ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${selectedImage})`
              : "none",
            backgroundColor: selectedImage ? "lightgray" : "",
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
      <span className="text-xs mt-6">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </span>
    </div>
  );
};

export default ImageUpload;
