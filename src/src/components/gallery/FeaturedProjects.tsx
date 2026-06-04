
import React from "react";
import { ProjectImage } from "@/types/gallery";
import ProjectShowcase from "./ProjectShowcase";

interface FeaturedProjectsProps {
  projectGroups: Record<string, ProjectImage[]>;
}

const FeaturedProjects = ({ projectGroups }: FeaturedProjectsProps) => {
  const featuredProjects = Object.entries(projectGroups)
    .filter(([_, images]) => images.some(img => img.featured));

  return (
    <div className="mb-20">
      <div className="max-w-xl mb-16">
        <div className="w-12 h-[1px] bg-primary mb-6"></div>
        <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
          Design Gallery
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover our most impressive installations, showcasing the versatility and elegance of our premium window treatments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {featuredProjects.map(([group, images]) => (
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

export default FeaturedProjects;
