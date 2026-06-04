import React from "react";
import { useRegion } from "@/hooks/use-region";

const RegionCallButton: React.FC = () => {
  const { phones } = useRegion();
  const tel = phones.primary.replace(/[^+\d]/g, "");
  
  
  return (
    <a 
      href={`tel:${tel}`}
      className="px-6 py-3 border border-input hover:bg-accent hover:text-accent-foreground transition-colors text-center"
    >
      Call: {phones.primary}
    </a>
  );
};

export default RegionCallButton;
