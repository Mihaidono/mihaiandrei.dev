"use client";

import { useState, useEffect } from "react";
import { Code2, Palette, Zap, Users, Filter } from "lucide-react";
import { supabase, Activity } from "@/lib/supabase";
import ActivityCard from "@/components/activity-card";
import Pagination from "@/components/pagination";

export default function About() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const activitiesPerPage = 6;
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  const startIndex = (currentPage - 1) * activitiesPerPage;
  const currentActivities = filteredActivities.slice(
    startIndex,
    startIndex + activitiesPerPage
  );

  const activityTypes = [
    { value: "all", label: "All Activities", icon: "📋" },
    { value: "hackathon", label: "Hackathons", icon: "🏆" },
    { value: "project", label: "Projects", icon: "💻" },
    { value: "achievement", label: "Achievements", icon: "🎯" },
    { value: "conference", label: "Conferences", icon: "🎤" },
    { value: "workshop", label: "Workshops", icon: "🛠️" },
  ];

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [activities, selectedType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterActivities = () => {
    if (selectedType === "all") {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(
        activities.filter((activity) => activity.type === selectedType)
      );
    }
  };
  const skills = [
    {
      name: "Frontend Development",
      icon: <Code2 size={24} />,
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      name: "Backend Development",
      icon: <Zap size={24} />,
      description: "Node.js, Python, PostgreSQL, MongoDB",
    },
    {
      name: "UI/UX Design",
      icon: <Palette size={24} />,
      description: "Figma, Adobe Creative Suite, User Research",
    },
    {
      name: "Team Collaboration",
      icon: <Users size={24} />,
      description: "Git, Agile, Code Reviews, Mentoring",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating digital experiences
            that make a difference. With a strong foundation in both technical
            skills and design principles, I bridge the gap between beautiful
            interfaces and robust functionality.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            My Journey
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              My journey into technology started with curiosity and has evolved
              into a passion for solving complex problems through elegant code.
              I believe in writing clean, maintainable code that not only works
              but is also a joy to work with.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source projects, or sharing knowledge with
              the developer community. I'm always excited about the next
              challenge and opportunity to learn.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
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
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : currentActivities.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-12">
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
