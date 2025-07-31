"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getProjects, Project } from "@/lib/supabase";
import ProjectCard from "@/components/project-card";
import { toast } from "sonner";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch {
        toast.error("Projects could not be retrieved");
      }
    };

    fetchProjects();
  }, []);

  const handlePaginate = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const project = projects[currentIndex];

  return projects.length === 0 ? (
    <div className="min-h-screen px-4 py-20 flex items-center justify-center text-white text-xl">
      No projects found.
    </div>
  ) : (
    <div className="min-h-screen px-4 py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {project && (
            <ProjectCard
              key={project.id}
              project={project}
              direction={direction}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100 && currentIndex > 0) {
                  handlePaginate(currentIndex - 1);
                } else if (
                  info.offset.x < -100 &&
                  currentIndex < projects.length - 1
                ) {
                  handlePaginate(currentIndex + 1);
                }
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-3">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePaginate(idx)}
            className={`w-8 h-3 rounded-full transition-all duration-300 border-2 ${
              currentIndex === idx
                ? "bg-white border-white"
                : "bg-gray-700 border-gray-600 hover:bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
