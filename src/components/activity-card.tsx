"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Activity } from "@/lib/supabase";
import { getActivityImageUrls } from "@/lib/supabase";
import { motion } from "framer-motion";

interface ActivityCardProps {
  activity: Activity;
}

const typeColors = {
  all: "from-slate-600 to-slate-400",
  hackathon: "from-blue-600 to-blue-400",
  project: "from-orange-600 to-orange-400",
  achievement: "from-pink-600 to-pink-400",
  conference: "from-purple-600 to-purple-400",
  workshop: "from-green-600 to-green-400",
};

const typeIcons = {
  all: "",
  hackathon: "🏆",
  project: "💻",
  achievement: "🎯",
  conference: "🎤",
  workshop: "🛠️",
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hovering, setHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(activity.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  useEffect(() => {
    const fetchImages = async () => {
      if (activity.images?.length) {
        const urls = await getActivityImageUrls(
          activity.title,
          activity.images
        );
        setImageUrls(urls);
      }
    };
    fetchImages();
  }, [activity]);

  useEffect(() => {
    if (!hovering || imageUrls.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [hovering, imageUrls]);

  useEffect(() => {
    if (!hovering) setCurrentImageIndex(0);
  }, [hovering]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 flex flex-col h-full min-h-[420px]"
    >
      {/* Image */}
      {imageUrls.length > 0 ? (
        <div className="relative h-48 w-full overflow-hidden">
          {imageUrls.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt={`Activity image ${idx}`}
              fill
              unoptimized
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="h-48 w-full bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Badge */}
      <div className="absolute top-4 left-4">
        <div
          className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${
            typeColors[activity.type]
          } flex items-center space-x-1`}
        >
          <span>{typeIcons[activity.type]}</span>
          <span className="capitalize">{activity.type}</span>
        </div>
      </div>

      {/* Content: make this grow */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white flex-1">
            {activity.title}
          </h3>
        </div>

        <div className="flex items-center text-gray-400 text-sm mb-4">
          <Calendar size={16} className="mr-2" />
          {formattedDate}
        </div>

        <p
          className={`text-gray-300 text-sm mb-4 transition-all duration-300 ${
            expanded ? "line-clamp-none" : "line-clamp-2"
          }`}
        >
          {activity.description}
        </p>

        <button
          className="text-blue-400 text-sm font-medium mt-auto"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>
    </motion.div>
  );
}
