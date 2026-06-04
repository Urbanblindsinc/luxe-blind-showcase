
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WhyUrbanBlinds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Banner */}
        <div className="relative py-20 md:py-28 px-6 bg-secondary overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-secondary to-transparent"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="heading-lg mb-6">Why Choose Urban Blinds</h1>
              <p className="text-xl text-muted-foreground">
                Discover what makes Urban Blinds the premier choice for luxury window treatments.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-6">Our Commitment to Excellence</h2>
            <p className="text-lg mb-6">
              At Urban Blinds, we're dedicated to providing superior quality window treatments that combine functionality with elegant design. Our commitment to excellence drives everything we do.
            </p>
            
            <h3 className="text-xl font-medium mt-10 mb-4">Premium Materials</h3>
            <p className="mb-6">
              We source only the finest materials for our window treatments, ensuring durability, performance, and aesthetic appeal that stands the test of time.
            </p>
            
            <h3 className="text-xl font-medium mt-10 mb-4">Expert Craftsmanship</h3>
            <p className="mb-6">
              Our team of skilled craftspeople brings years of experience to every project, paying meticulous attention to detail for flawless results.
            </p>
            
            <h3 className="text-xl font-medium mt-10 mb-4">Personalized Service</h3>
            <p className="mb-6">
              We believe in building relationships with our clients, taking the time to understand your unique needs and preferences to deliver customized solutions that exceed expectations.
            </p>
            
            <div className="mt-12">
              <h3 className="text-xl font-medium mb-4">Ready to Transform Your Space?</h3>
              <div className="mt-6">
                <a 
                  href="/consultation" 
                  className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-block"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WhyUrbanBlinds;
