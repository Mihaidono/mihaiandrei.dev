"use client";

import Image from "next/image";
import { Mail, Linkedin, Github, Code } from "lucide-react";
import SocialButton from "@/components/social-button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
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
            Your Name
          </h1>
          <p className="text-lg sm:text-xl text-blue-400 font-medium">
            Full-Stack Developer
          </p>
        </div>

        {/* Introduction */}
        <div className="max-w-lg mx-auto">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Passionate about creating beautiful, functional, and user-friendly
            applications. I specialize in modern web technologies and love
            turning ideas into reality through code.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center space-x-4 sm:space-x-6 pt-6">
          <SocialButton
            href="mailto:your.email@gmail.com"
            icon={<Mail size={20} />}
            label="Email"
          />
          <SocialButton
            href="https://linkedin.com/in/yourprofile"
            icon={<Linkedin size={20} />}
            label="LinkedIn"
          />
          <SocialButton
            href="https://github.com/yourusername"
            icon={<Github size={20} />}
            label="GitHub"
          />
          <SocialButton
            href="https://leetcode.com/yourusername"
            icon={<Code size={20} />}
            label="LeetCode"
          />
        </div>

        {/* Call to Action */}
        <div className="pt-8">
          <button className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 via-orange-500 to-pink-600 rounded-full hover:from-blue-700 hover:via-orange-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
            <span className="relative">Get In Touch</span>
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
