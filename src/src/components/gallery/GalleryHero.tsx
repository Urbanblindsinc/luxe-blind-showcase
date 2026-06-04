
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GalleryHero = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10"></div>
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8 }}
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Luxury window treatments gallery"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 h-full">
        <div className="flex flex-col justify-center h-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-sm uppercase tracking-wider text-white/80 mb-4 font-light">
              Design Inspiration
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 text-white">
              Curated Gallery
            </h1>
            <div className="w-20 h-[1px] bg-primary mb-6"></div>
            <p className="text-xl text-white/90 max-w-2xl mb-8">
              Explore our portfolio of bespoke window treatments, crafted with precision and installed in exceptional spaces.
            </p>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={16} />
              <span className="text-white">Gallery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;
