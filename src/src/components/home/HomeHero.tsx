import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/hooks/use-region";

const heroPoster = "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=80";

const HomeHero: React.FC = () => {
  const { phones, zone } = useRegion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${phones.primary.replace(/[^+\d]/g, "")}`;
  };

  return (
    <header className="relative h-[85vh] min-h-[560px] w-full overflow-hidden" role="banner">
      <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true" />
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${videoError ? 'hidden' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
        onError={() => setVideoError(true)}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {videoError && (
        <img src={heroPoster} alt="Sunlight through sheer blinds in a luxury living room" className="absolute inset-0 w-full h-full object-cover" />
      )}

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="heading-xl font-display text-white">
              Luxury Window Coverings, Made for Your Home
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/90">
              Custom blinds, shades, and drapery tailored to your space — luxury without the luxury price tag.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                <Link to="/consultation" aria-label="Book a free consultation">Book a Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/80 text-white hover:bg-white/10" onClick={handleCall} aria-label="Call Now">
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
