import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import AnimatedBackground from "@/components/animated-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "my-portfolio",
  description: "Portfolio with my projects, education, socials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-slate-900 text-white min-h-screen`}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10 pt-16">{children}</main>
      </body>
    </html>
  );
}
