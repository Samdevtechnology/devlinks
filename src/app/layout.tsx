import type { Metadata } from "next";
import { Instrument_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TabsLayout from "@/components/common/TabsLayout";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-grey-light ${fontSans.variable}`}>
        <TabsLayout>{children}</TabsLayout>
        <Toaster />
      </body>
    </html>
  );
}
