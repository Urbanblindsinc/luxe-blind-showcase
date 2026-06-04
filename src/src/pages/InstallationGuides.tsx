
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const InstallationGuides = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const guides = [
    {
      productType: "Roller Blinds",
      steps: [
        "Unpack your blinds and gather all provided hardware",
        "Mark and pre-drill bracket locations on your window frame or wall",
        "Secure brackets using the screws provided",
        "Mount the blind headrail into the brackets",
        "Test operation and make any necessary adjustments"
      ]
    },
    {
      productType: "Zebra Blinds",
      steps: [
        "Carefully unpack your zebra blinds",
        "Position and mark bracket locations",
        "Install brackets using appropriate screws for your surface",
        "Insert the headrail into the brackets until it clicks",
        "Test the blind mechanism and adjust if needed"
      ]
    },
    {
      productType: "Honeycomb Blinds",
      steps: [
        "Remove blinds from packaging and check all hardware",
        "Position brackets at desired mounting locations",
        "Secure brackets with provided screws",
        "Insert the headrail into the installed brackets",
        "Test operation and make any tension adjustments if necessary"
      ]
    }
  ];

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
              <h1 className="heading-lg mb-6">Installation Guides</h1>
              <p className="text-xl text-muted-foreground">
                Step-by-step instructions for installing your Urban Blinds products.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-6">DIY Installation Instructions</h2>
            <p className="text-lg mb-6">
              While we offer professional installation services, we understand that some customers prefer to install their window treatments themselves. These guides will help you through the process for different product types.
            </p>
            
            <div className="bg-secondary/50 p-6 rounded-lg mb-10">
              <p className="font-medium">Important Note:</p>
              <p>For the best results and to protect your warranty, we recommend professional installation. Contact us to learn more about our installation services.</p>
            </div>
            
            {guides.map((guide, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-xl font-medium mb-4">{guide.productType} Installation</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>
            ))}
            
            <div className="bg-primary text-primary-foreground p-8 rounded-xl mt-12">
              <h3 className="text-xl font-medium mb-4">Choose Professional Installation</h3>
              <p className="mb-6">
                For a hassle-free experience and perfect results, let our professional installers handle your window treatments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/consultation" 
                  className="px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-colors text-center"
                >
                  Book Installation Services
                </a>
                <a 
                  href="/quote" 
                  className="px-6 py-3 border border-white text-white hover:bg-primary-foreground/10 transition-colors text-center"
                >
                  Contact Us With Questions
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

export default InstallationGuides;
