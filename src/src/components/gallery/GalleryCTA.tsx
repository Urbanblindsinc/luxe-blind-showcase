
import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const GalleryCTA = () => {
  return (
    <div className="mt-20 bg-gray-50 p-12 rounded-sm border border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-lg mb-8">
          Our design consultants are ready to help you create the perfect window treatments for your home or business. 
          Let us bring your vision to life with our premium materials and expert craftsmanship.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="px-8 py-6 text-base">
            <Link to="/consultation">Book a Design Consultation</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base">
            <Link to="/customization">
              <ImageIcon className="mr-2 h-4 w-4" />
              Create Custom Blinds
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryCTA;
