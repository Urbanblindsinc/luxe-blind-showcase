
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  theme?: "light" | "dark";
}

const CTA = ({
  title = "Transform Your Space with Premium Window Treatments",
  subtitle = "Schedule a complimentary consultation with our design experts to find the perfect blinds for your space.",
  buttonText = "Request a Quote",
  buttonLink = "/quote",
  image = "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  theme = "dark"
}: CTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  const textColorClass = theme === "dark" ? "text-white" : "text-foreground";
  const subTextColorClass = theme === "dark" ? "text-white/80" : "text-muted-foreground";
  const buttonColorClass = theme === "dark" 
    ? "bg-primary text-white hover:bg-primary/90" 
    : "bg-primary text-white hover:bg-primary/90";

  return (
    <div 
      ref={ctaRef}
      className="relative overflow-hidden rounded-xl"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${theme === "dark" ? "bg-gradient-to-r from-navy-dark/70 to-navy-dark/50" : "bg-white/10"} z-10`} />
        <img
          src={image}
          alt="Interior with blinds"
          className={`h-full w-full object-cover ${isVisible ? "animate-blur-in" : "opacity-0"}`}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className={`heading-lg mb-4 ${textColorClass} opacity-0 ${isVisible ? "animate-slide-up" : ""}`}
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            {title}
          </h2>
          <p 
            className={`text-lg md:text-xl ${subTextColorClass} mb-8 max-w-2xl mx-auto opacity-0 ${isVisible ? "animate-slide-up" : ""}`}
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
          >
            {subtitle}
          </p>
          <Link
            to={buttonLink}
            className={`inline-flex items-center px-8 py-3 rounded-md button-transition ${buttonColorClass} opacity-0 ${isVisible ? "animate-slide-up" : ""}`}
            style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
          >
            <span>{buttonText}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
