"use client";

import { useEffect, useRef } from "react";
import QrCodeGenerator from "./QrCodeGenerator";
import { useQRCodeStore } from "@/stores/qrCodeStore";

interface CardBackProps {
  url: string;
}

const CardBack = ({ url }: CardBackProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const setDownloadQRCode = useQRCodeStore((state) => state.setDownloadQRCode);

  useEffect(() => {
    const downloadQRCode = () => {
      const svg = qrCodeRef.current?.querySelector("svg");
      if (!svg) {
        console.error("SVG element not found.");
        return;
      }

      try {
        // Convert SVG to string
        const svgData = new XMLSerializer().serializeToString(svg);

        // Create a canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Create an image to draw on canvas
        const img = new Image();

        // Convert SVG to data URL
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const URL = window.URL || window.webkitURL || window;
        const svgUrl = URL.createObjectURL(svgBlob);

        img.onload = () => {
          // Set canvas size to match SVG
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image on canvas
          ctx?.drawImage(img, 0, 0);

          // Convert to PNG
          const dataUrl = canvas.toDataURL("image/png");

          // Download
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qrcode.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Cleanup
          URL.revokeObjectURL(svgUrl);
        };

        img.src = svgUrl;
      } catch (error) {
        console.error("Error downloading QR code:", error);
      }
    }; // Register downloadQRCode in the global store
    setDownloadQRCode(downloadQRCode);

    // Clean up on unmount
    return () => setDownloadQRCode(() => {});
  }, [setDownloadQRCode]);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="flex flex-col bg-card rounded-3xl justify-center items-center p-6 w-full h-full dark:bg-primary-light max-w-80">
        <div
          ref={qrCodeRef}
          className="flex flex-col justify-center items-center text-center w-full h-full"
        >
          <QrCodeGenerator link={url} />
        </div>
      </div>
    </div>
  );
};

export default CardBack;
