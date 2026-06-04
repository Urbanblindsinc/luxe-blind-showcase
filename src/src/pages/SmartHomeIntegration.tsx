
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, Smartphone, Wifi, Zap } from "lucide-react";

const SmartHomeIntegration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 md:py-32 px-6 bg-secondary/50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-secondary/50 to-transparent"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h1 className="heading-lg mb-6">Smart Home Integration</h1>
              <p className="text-xl text-muted-foreground">
                Seamlessly connect your blinds to your smart home system for automated control, optimizing light and temperature for energy efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 items-center">
              <div>
                <h2 className="heading-md mb-6">Modern Control for Modern Living</h2>
                <p className="text-lg mb-6 text-muted-foreground">
                  Our smart blinds connect effortlessly to your existing smart home system, putting control of your window treatments at your fingertips—or even with just your voice.
                </p>
                <p className="text-lg mb-6 text-muted-foreground">
                  With automated scheduling and seamless integration with your favorite platforms, you can optimize light and temperature throughout the day for enhanced comfort and energy efficiency.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/30 p-6 rounded-lg flex flex-col items-center text-center">
                  <Smartphone className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium">Mobile Control</h3>
                  <p className="text-sm text-muted-foreground mt-2">Adjust your blinds from anywhere using our intuitive mobile app</p>
                </div>
                <div className="bg-secondary/30 p-6 rounded-lg flex flex-col items-center text-center">
                  <Wifi className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium">Wireless Connectivity</h3>
                  <p className="text-sm text-muted-foreground mt-2">Secure wireless connection for reliable performance</p>
                </div>
                <div className="bg-secondary/30 p-6 rounded-lg flex flex-col items-center text-center">
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium">Energy Saving</h3>
                  <p className="text-sm text-muted-foreground mt-2">Reduce energy costs with automated temperature control</p>
                </div>
                <div className="bg-secondary/30 p-6 rounded-lg flex flex-col items-center text-center">
                  <Home className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-medium">Platform Integration</h3>
                  <p className="text-sm text-muted-foreground mt-2">Works with major smart home platforms</p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="heading-md mb-6">Compatible Smart Home Systems</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 border border-border rounded-lg flex flex-col items-center text-center">
                  <h3 className="text-xl font-medium mb-3">Amazon Alexa</h3>
                  <p className="text-muted-foreground">"Alexa, close the living room blinds." Control your blinds with simple voice commands.</p>
                </div>
                <div className="p-8 border border-border rounded-lg flex flex-col items-center text-center">
                  <h3 className="text-xl font-medium mb-3">Google Home</h3>
                  <p className="text-muted-foreground">Integrate with Google Assistant for seamless control through voice or scheduled routines.</p>
                </div>
                <div className="p-8 border border-border rounded-lg flex flex-col items-center text-center">
                  <h3 className="text-xl font-medium mb-3">Apple HomeKit</h3>
                  <p className="text-muted-foreground">Connect with Apple's ecosystem for control via Siri, iPhone, or automated scenes.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="heading-sm mb-6">Experience The Future of Window Treatments</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your home with smart blinds that adapt to your lifestyle, saving energy while adding convenience and elegance.
              </p>
              <a 
                href="/consultation" 
                className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-block"
              >
                Schedule a Smart Home Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SmartHomeIntegration;
