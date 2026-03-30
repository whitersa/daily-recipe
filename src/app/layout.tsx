import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UpdatePrompt from "@/components/UpdatePrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Recipe",
  description: "Your premium minimalist kitchen companion",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Daily Recipe",
  },
};

export const viewport: Viewport = {
  themeColor: "#5D6B67",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-stone-50 text-stone-900 antialiased min-h-screen`}>
        <UpdatePrompt />
        <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
