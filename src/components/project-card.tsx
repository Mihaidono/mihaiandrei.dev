"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Project, getProjectImageUrls } from "@/lib/supabase";

interface ProjectCardProps {
  project: Project;
  direction: number;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
}

export default function ProjectCard({
  project,
  direction,
  onDragEnd,
}: ProjectCardProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (project.images?.length) {
        const urls = await getProjectImageUrls(project.title, project.images);
        setImageUrls(urls);
      }
    };
    fetchImageUrls();
  }, [project]);

  return (
    <motion.div
      key={project.id}
      custom={direction}
      variants={{
        enter: (dir: number) => ({
          x: dir > 0 ? 300 : -300,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
        },
        exit: (dir: number) => ({
          x: dir > 0 ? -300 : 300,
          opacity: 0,
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px]"
    >
      {/* Left Side */}
      <div className="p-4">
        <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
        <div className="max-w-none text-gray-300 text-base mb-6">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>

        {project.repo_link && (
          <a
            href={project.repo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
          >
            <Github size={16} className="mr-2" /> View Code
          </a>
        )}
      </div>

      {/* Right Side */}
      <div className="p-4 space-y-4">
        {imageUrls[0] && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <Image
              src={imageUrls[0]}
              alt={project.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {project.technologies_used?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm text-gray-200 bg-gray-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.contexts && (
          <ul className="text-gray-400 list-disc list-inside text-sm space-y-1">
            {project.contexts.map((ctx, idx) => (
              <li key={ctx + idx}>{ctx}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
