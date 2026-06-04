
import React from "react";

interface KeyFeatureProps {
  number: number;
  title: string;
  description: string;
}

const KeyFeature = ({ number, title, description }: KeyFeatureProps) => {
  return (
    <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-xs font-bold">{number}</span>
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default KeyFeature;
