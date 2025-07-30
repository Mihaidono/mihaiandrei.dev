"use client";

import { useEffect, useState, useRef } from "react";
import { Github, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (project.images?.length) {
        const urls = await getProjectImageUrls(project.title, project.images);
        setImageUrls(urls);
        setCurrentIndex(0);
      }
    };
    fetchImageUrls();
  }, [project]);

  const startAutoPlay = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }, 5000);
  };

  useEffect(() => {
    if (imageUrls.length > 1 && !isModalOpen) {
      startAutoPlay();
    }
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [imageUrls, isModalOpen]);

  const resetAutoPlayWithDelay = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    resumeTimeoutRef.current = setTimeout(() => {
      if (!isModalOpen) {
        startAutoPlay();
      }
    }, 6000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
    resetAutoPlayWithDelay();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    resetAutoPlayWithDelay();
  };

  const openModal = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    setModalImageIndex(currentIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (imageUrls.length > 1) {
      startAutoPlay();
    }
  };

  const goToModalPrevious = () => {
    setModalImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const goToModalNext = () => {
    setModalImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {project.title}
          </h2>
          <div className="max-w-none text-gray-300 text-base mb-6 max-h-96 overflow-y-auto pr-2 scrollbar-custom">
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
        <div className="p-4 space-y-4 relative">
          {imageUrls.length > 0 && (
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageUrls[currentIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={openModal}
                >
                  <Image
                    src={imageUrls[currentIndex]}
                    alt={`${project.title} image ${currentIndex + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
              {/* Arrows */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    aria-label="Previous Image"
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white p-1 rounded-full hover:text-blue-400 transition z-10"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Next Image"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white p-1 rounded-full hover:text-blue-400 transition z-10"
                  >
                    &#8594;
                  </button>
                </>
              )}
            </div>
          )}

          {/* Technologies */}
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

          {/* Contexts */}
          {project.contexts && (
            <ul className="text-gray-400 list-disc list-inside text-sm space-y-1">
              {project.contexts.map((ctx, idx) => (
                <li key={ctx + idx}>{ctx}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-blue-400 transition-colors z-10 p-1 sm:p-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50"
                aria-label="Close Modal"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={imageUrls[modalImageIndex]}
                  alt={`${project.title} image ${modalImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl"
                  unoptimized
                  draggable={false}
                />
              </div>

              {/* Modal Navigation Arrows */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={goToModalPrevious}
                    aria-label="Previous Image"
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 hover:scale-110 transition-all duration-200 text-sm sm:text-lg md:text-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-lg flex items-center justify-center"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={goToModalNext}
                    aria-label="Next Image"
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 hover:scale-110 transition-all duration-200 text-sm sm:text-lg md:text-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-lg flex items-center justify-center"
                  >
                    &#8594;
                  </button>
                </>
              )}

              {/* Image Counter */}
              {imageUrls.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {modalImageIndex + 1} / {imageUrls.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
