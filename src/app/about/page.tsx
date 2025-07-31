"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Palette,
  GraduationCap,
  Star,
  ServerCog,
  Terminal,
} from "lucide-react";
import {
  getAllActivities,
  getActivitiesByType,
  getTotalActivityCount,
  Activity,
} from "@/lib/supabase";
import ActivityCard from "@/components/activity-card";
import Pagination from "@/components/pagination";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function About() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const maxPerPage = 3;
  const visibleCount = windowWidth < 1024 ? 2 : 3;
  const totalPages = Math.ceil(totalActivities / maxPerPage);

  const activityTypes = [
    { value: "all", label: "All Activities", icon: "📋" },
    { value: "hackathon", label: "Hackathons", icon: "🏆" },
    { value: "project", label: "Projects", icon: "💻" },
    { value: "achievement", label: "Achievements", icon: "🎯" },
    { value: "conference", label: "Conferences", icon: "🎤" },
    { value: "workshop", label: "Workshops", icon: "🛠️" },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        let activitiesData: Activity[];
        let totalCount: number;

        if (selectedType === "all") {
          activitiesData = await getAllActivities(currentPage, maxPerPage);
          totalCount = await getTotalActivityCount();
        } else {
          activitiesData = await getActivitiesByType(
            selectedType as Activity["type"],
            currentPage,
            maxPerPage
          );
          totalCount = await getTotalActivityCount(
            selectedType as Activity["type"]
          );
        }

        setActivities(activitiesData);
        setTotalActivities(totalCount);
      } catch {
        toast.error("Activities could not be retrieved");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [selectedType, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const visibleActivities = activities.slice(0, visibleCount);

  const skills = [
    {
      name: "Languages",
      icon: <Terminal size={24} />,
      description: "Python, C#, Java, Bash, C/C++, JavaScript",
    },
    {
      name: "Frontend Development",
      icon: <Palette size={24} />,
      description: "React, Next.js, JS/TS, Angular, Tailwind CSS",
    },
    {
      name: "Backend Development",
      icon: <Zap size={24} />,
      description: "Python, .NET, PostgreSQL, MongoDB, InfluxDB",
    },
    {
      name: "DevOps",
      icon: <ServerCog size={24} />,
      description: "Docker, Kubernetes, Helm, Grafana, GitLab CI/CD",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether it&apos;s developing full-stack applications, scripting
            automation tools, or building smart systems, I enjoy turning
            complexity into functional solutions.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* My Journey Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
            <h2 className="flex items-center gap-4 text-2xl sm:text-3xl font-bold text-white mb-6">
              <Star size={28} className="text-blue-400" />
              My Journey
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I got into tech because I was curious about how video games are
                made. That curiosity led me to study IT and Computer Science in
                college.
              </p>
              <p>
                Once there, I discovered a much broader world and became
                especially interested in understanding how existing solutions
                were designed and implemented. I was fascinated by the challenge
                of logically breaking down complex systems to see if I could
                recreate them or even create an improved version of my own.
              </p>
            </div>
          </div>

          {/* Studies Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
            <h2 className="flex items-center gap-4 text-2xl sm:text-3xl font-bold text-white mb-6">
              <GraduationCap size={28} className="text-blue-400" />
              My Studies
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I completed my <b>Bachelor&apos;s degree</b> in{" "}
                <b>Computer Science</b> at the{" "}
                <b>University of Transylvania in Brașov</b>, where I gained a
                deep understanding of software development, systems
                architecture, and algorithmic thinking.
              </p>
              <p>
                Currently, I&apos;m pursuing a <b>Master&apos;s degree</b> in{" "}
                <b>Cyber Security</b> at the same university. My academic
                background is complemented by hands-on experience in
                internships, research projects, and competitions, where I apply
                what I learn in <b>practical ways</b>.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 via-orange-500 to-pink-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white ml-4">
                    {skill.name}
                  </h3>
                </div>
                <p className="text-gray-300">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activities Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Recent Activities
          </h2>

          {/* Activity Type Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {activityTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type.value
                    ? "bg-gradient-to-r from-blue-600 via-orange-500 to-pink-600 text-white"
                    : "bg-gray-800/50 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600"
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="min-h-[470px] flex flex-col items-center">
            {loading ? (
              <div className="flex-grow flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : activities.length > 0 ? (
              <>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {visibleActivities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </motion.div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="flex-grow flex flex-col justify-center items-center text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  No activities found
                </div>
                <p className="text-gray-500">
                  {selectedType === "all"
                    ? "No activities have been added yet."
                    : `No ${selectedType} activities found.`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-blue-900/20 via-orange-900/10 to-pink-900/20 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            What Drives Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Innovation
              </h3>
              <p className="text-gray-300">
                Always seeking new ways to solve problems and improve user
                experiences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                Quality
              </h3>
              <p className="text-gray-300">
                Committed to writing clean, efficient, and maintainable code.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">
                Growth
              </h3>
              <p className="text-gray-300">
                Continuously learning and adapting to new technologies and
                methodologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
