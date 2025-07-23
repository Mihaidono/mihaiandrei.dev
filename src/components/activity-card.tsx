"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Activity } from "@/lib/supabase";
import { getActivityImageUrls } from "@/lib/supabase";

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

  return (
    <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
      {/* Carousel */}
      {imageUrls.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <div className="flex h-full w-full overflow-x-auto snap-x">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full h-full snap-center relative"
              >
                <Image
                  src={url}
                  alt={`Activity image ${idx}`}
                  width={400}
                  height={200}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Type Badge */}
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

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white flex-1">
            {activity.title}
          </h3>
        </div>

        <div className="flex items-center text-gray-400 text-sm mb-4">
          <Calendar size={16} className="mr-2" />
          {formattedDate}
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3 group-hover:line-clamp-none">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
