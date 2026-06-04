
import React from "react";
import KeyFeature from "./KeyFeature";

const KeyFeatures = () => {
  const features = [
    {
      number: 1,
      title: "Dual-Layer Design",
      description: "Alternating sheer and solid fabric creates a unique zebra effect for precise light control."
    },
    {
      number: 2,
      title: "Modern Aesthetic",
      description: "Contemporary design that complements a wide range of interior styles."
    },
    {
      number: 3,
      title: "Versatile Privacy",
      description: "Adjust bands to transition between full privacy and open views with a simple adjustment."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <KeyFeature
          key={index}
          number={feature.number}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default KeyFeatures;
