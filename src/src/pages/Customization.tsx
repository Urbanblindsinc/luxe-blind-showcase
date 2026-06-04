
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Heart, Sliders } from "lucide-react";
import { Link } from "react-router-dom";

const Customization = () => {
  const customizationOptions = [
    {
      title: "Fabric Selection",
      description: "Choose from over 200 premium fabrics in various colors, patterns, and opacities to perfectly match your décor.",
      features: ["Light filtering options", "Room darkening fabrics", "Designer patterns", "Eco-friendly materials"]
    },
    {
      title: "Smart Home Integration",
      description: "Control your window treatments with voice commands or schedule them to open and close automatically.",
      features: ["Works with Alexa & Google Home", "Smart phone control", "Automated schedules", "Battery or hardwired options"]
    },
    {
      title: "Hardware & Trims",
      description: "Complete your window treatments with designer hardware and decorative trims for a polished look.",
      features: ["Premium metal finishes", "Decorative valances", "Custom bottom bars", "Coordinating accessories"]
    },
    {
      title: "Size & Installation",
      description: "Perfect fit guaranteed with our professional measuring and installation services.",
      features: ["In-home measuring", "Professional installation", "Custom shapes available", "Perfect fit guarantee"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32">
        {/* Hero Section */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6">
                Create Your Perfect Blind
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Customize every aspect of your window treatments to perfectly match your style and functional needs.
              </p>
              <Button asChild size="lg" className="rounded-md">
                <Link to="/consultation">
                  Book a Free Consultation <ChevronRight className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Customization Options */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Endless Possibilities
              </h2>
              <p className="text-lg text-muted-foreground">
                Create window treatments that are uniquely yours with our extensive customization options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {customizationOptions.map((option, index) => (
                <div key={index} className="bg-secondary p-8 rounded-lg border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-display mb-3">{option.title}</h3>
                  <p className="text-muted-foreground mb-6">{option.description}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Create Your Design CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-display font-medium">
                  Ready to start customizing?
                </h3>
                <p className="mt-2 text-primary-foreground/80">
                  Our design experts are ready to help bring your vision to life.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="secondary">
                  <Link to="/quote-calculator">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/consultation">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Customization;
