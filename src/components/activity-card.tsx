"use client";

import { Calendar, ExternalLink, Tag } from "lucide-react";
import Image from "next/image";
import { Activity } from "@/lib/supabase";

interface ActivityCardProps {
  activity: Activity;
}

const typeColors = {
  hackathon: "from-blue-600 to-blue-400",
  project: "from-orange-600 to-orange-400",
  achievement: "from-pink-600 to-pink-400",
  conference: "from-purple-600 to-purple-400",
  workshop: "from-green-600 to-green-400",
};

const typeIcons = {
  hackathon: "🏆",
  project: "💻",
  achievement: "🎯",
  conference: "🎤",
  workshop: "🛠️",
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const formattedDate = new Date(activity.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
      {/* Activity Image */}
      {activity.image_url && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={activity.image_url}
            alt={activity.title}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

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
        </div>
      )}

      {/* Activity Content */}
      <div className="p-6">
        {/* Title and Date */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 flex-1">
            {activity.title}
          </h3>
          {activity.link && (
            <a
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <Calendar size={16} className="mr-2" />
          {formattedDate}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {activity.description}
        </p>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activity.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600"
              >
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
