import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import AnimatedBackground from "@/components/animated-background";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

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
        className={`${poppins.className} bg-slate-900 text-white min-h-screen`}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
