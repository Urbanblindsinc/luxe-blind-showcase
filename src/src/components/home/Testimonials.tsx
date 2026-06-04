import React from "react";
import { useRegion } from "@/hooks/use-region";

const testimonials = [
  { quote: "Urban Blinds transformed our home. Professional, affordable, and stunning results.", author: "Samantha L.", city: "Bellevue" },
  { quote: "The Seattle team was on time, detail-oriented, and our home feels brand new.", author: "Mark R.", city: "Seattle" },
  { quote: "Excellent quality and service from start to finish.", author: "Riya K.", city: "Bothell" },
];

const Testimonials: React.FC = () => {
  const { zone } = useRegion();
  
  const filteredTestimonials = testimonials.filter(t => {
    if (zone === "SEATTLE") return true; // Show all Seattle area testimonials
    return true; // Show all for OTHER
  });

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-10 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.map((t, i) => (
            <blockquote key={i} className="bg-white p-6 border border-border shadow-sm">
              <p className="text-lg">"{t.quote}"</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {t.author}, {t.city}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;