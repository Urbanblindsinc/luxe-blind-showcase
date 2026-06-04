
import React from "react";
import { Filter } from "lucide-react";
import { ProjectImage } from "@/types/gallery";
import ProjectShowcase from "./ProjectShowcase";

interface ProjectPortfolioProps {
  projectGroups: Record<string, ProjectImage[]>;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const ProjectPortfolio = ({ projectGroups, activeFilter, setActiveFilter }: ProjectPortfolioProps) => {
  const nonFeaturedProjects = Object.entries(projectGroups)
    .filter(([_, images]) => !images.some(img => img.featured));

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-display font-medium mb-4 md:mb-0">Complete Portfolio</h2>
        <div className="flex items-center gap-2 border border-gray-200 rounded-full p-1 bg-white shadow-sm">
          <Filter size={16} className="ml-3 text-muted-foreground" />
          <div className="flex flex-wrap gap-1 px-1">
            {["all", "roller", "zebra", "honeycomb"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm transition-all duration-300 rounded-full ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "text-foreground hover:bg-gray-100"
                }`}
              >
                {filter === "all" ? "All Installations" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Blinds`}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nonFeaturedProjects.map(([group, images]) => (
          <ProjectShowcase 
            key={group} 
            images={images} 
            projectGroup={group}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPortfolio;
