import React from "react";
import { useRegion } from "@/hooks/use-region";

const FixedCallNow: React.FC = () => {
  const { phones } = useRegion();
  const tel = phones.primary.replace(/[^+\d]/g, "");
  return (
    <a
      href={`tel:${tel}`}
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto w-[calc(100%-2rem)] z-50 inline-flex items-center justify-center px-5 py-3 rounded-md bg-primary text-primary-foreground shadow-md ring-2 ring-accent ring-offset-2 ring-offset-background animate-[pulse_10s_ease-in-out_infinite]"
      aria-label="Call Urban Blinds now"
    >
      Call Now: {phones.primary}
    </a>
  );
};

export default FixedCallNow;
