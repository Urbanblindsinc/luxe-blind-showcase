
import React from "react";
import KeyFeature from "./KeyFeature";

interface FeatureSectionProps {
  image: string;
  imageAlt: string;
  features: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

const FeatureSection = ({ image, imageAlt, features }: FeatureSectionProps) => {
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="mb-8">
          <img 
            src={image} 
            alt={imageAlt} 
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <KeyFeature 
              key={index}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
