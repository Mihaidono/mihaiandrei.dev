"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { supabase, Project } from "@/lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here's a collection of projects I've worked on, showcasing my skills
            in web development, design, and problem-solving. Each project
            represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                {/* Project Image */}
                {project.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 via-orange-500 to-pink-600 hover:from-blue-700 hover:via-orange-600 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white text-sm font-medium rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No projects found</div>
            <p className="text-gray-500">
              Projects will appear here once they're added to the database.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900/20 via-orange-900/10 to-pink-900/20 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Interested in working together?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and exciting
              projects. Let's connect and see how we can create something
              amazing together.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 via-orange-500 to-pink-600 rounded-full hover:from-blue-700 hover:via-orange-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
