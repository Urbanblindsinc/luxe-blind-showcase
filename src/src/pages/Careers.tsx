
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Careers = () => {
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
              <h1 className="heading-lg mb-6">Join Our Team</h1>
              <p className="text-xl text-muted-foreground">
                Explore career opportunities at Urban Blinds and be part of our commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-6">Career Opportunities</h2>
            <p className="text-lg mb-6">
              Urban Blinds is always looking for talented individuals who are passionate about design, craftsmanship, and customer service. If you're interested in joining our team, we'd love to hear from you.
            </p>
            
            <h3 className="text-xl font-medium mt-10 mb-4">Why Work With Us</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Opportunity to work with premium products and high-profile clients</li>
              <li>Collaborative and supportive team environment</li>
              <li>Ongoing professional development and growth opportunities</li>
              <li>Competitive compensation and benefits</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-10 mb-4">Current Openings</h3>
            <p className="mb-10">
              We currently don't have any open positions, but we're always interested in connecting with talented professionals. Please send your resume and a brief introduction to <a href="mailto:urban.blinds.inc@gmail.com" className="text-primary hover:underline">urban.blinds.inc@gmail.com</a> and we'll keep your information on file for future opportunities.
            </p>
            
            <div className="bg-secondary p-8 rounded-xl mt-12">
              <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
              <p className="mb-6">
                For any inquiries about careers at Urban Blinds, please contact our HR team.
              </p>
              <a 
                href="mailto:urban.blinds.inc@gmail.com" 
                className="text-primary hover:underline"
              >
                urban.blinds.inc@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
