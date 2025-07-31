"use client";

import Image from "next/image";
import { Mail, Linkedin, Github, Code } from "lucide-react";
import SocialButton from "@/components/social-button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Profile Picture */}
        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-orange-400 to-pink-600 rounded-full p-1">
            <div className="w-full h-full bg-gray-900 rounded-full p-1">
              <Image
                src="/me.jpg"
                alt="Profile Picture"
                width={192}
                height={192}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Mihai Andrei
          </h1>
          <p className="text-lg sm:text-xl text-blue-400 font-medium">
            Full-Stack Developer
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-lg mx-auto">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            &quot;I&apos;m passionate about programming and thrive on solving
            real-world problems through it. I&apos;m driven by challenges and
            always eager to exceed expectations by creating efficient, impactful
            solutions.&quot;
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center space-x-4 sm:space-x-6 pt-6">
          <SocialButton
            href="mailto:amihai2001@gmail.com"
            icon={<Mail size={20} />}
            label="Email"
          />
          <SocialButton
            href="https://www.linkedin.com/in/mihai-alexandru-andrei-09208b217/"
            icon={<Linkedin size={20} />}
            label="LinkedIn"
          />
          <SocialButton
            href="https://github.com/Mihaidono"
            icon={<Github size={20} />}
            label="GitHub"
          />
          <SocialButton
            href="https://leetcode.com/u/Mihaidono/"
            icon={<Code size={20} />}
            label="LeetCode"
          />
        </div>
      </div>
    </div>
  );
}
