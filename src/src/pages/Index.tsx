
import React from "react";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";

import FeaturedProductsGrid from "@/components/home/FeaturedProductsGrid";
import RecentProjects from "@/components/home/RecentProjects";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/Footer";

import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAdsTag from "@/components/GoogleAdsTag";


import UrgencyBanner from "@/components/home/UrgencyBanner";
import PhotoSpotlight from "@/components/PhotoSpotlight";
import RegionSEO from "@/components/RegionSEO";
import PromoBanner from "@/components/PromoBanner";
import AboutUsSection from "@/components/home/AboutUsSection";
import ContactUsSection from "@/components/home/ContactUsSection";
import FAQSection from "@/components/home/FAQSection";
import MobileCTASection from "@/components/mobile/MobileCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <RegionSEO />
      <GoogleAdsTag />
      <Navbar />
      <main className="pt-28 md:pt-32 pb-24 lg:pb-8">
        <HomeHero />
        <FeaturedProductsGrid />
        
        {/* Mobile CTA after featured products */}
        <div className="lg:hidden px-4 py-8">
          <MobileCTASection urgencyType="customers" />
        </div>
        
        <AboutUsSection />
        <RecentProjects />
        
        
        <PhotoSpotlight 
          src="/lovable-uploads/5ddf1372-3c13-4f71-9ebc-872a09f81483.png"
          alt="Zebra blinds installation in modern living room"
          priority={true}
        />
        <UrgencyBanner />
        <ContactUsSection />
        <FAQSection />
        
        
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      
      <WhatsAppButton />
      
    </div>
  );
};

export default Index;
