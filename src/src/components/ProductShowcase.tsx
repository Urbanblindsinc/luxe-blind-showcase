
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const products = [
  {
    id: "roller-premium",
    category: "roller",
    name: "Premium Light Filtering",
    description: "Our premium roller blinds provide the perfect balance of light control and privacy with elegant, clean lines that complement any interior style.",
    features: ["Light filtering fabric", "Smooth operation", "Custom sizing", "Motorization available"],
    image: "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "/products/roller"
  },
  {
    id: "zebra-horizon",
    category: "zebra",
    name: "Horizon Dual Layer",
    description: "Experience the ultimate in light control with our Horizon Zebra blinds, featuring alternating layers of sheer and solid fabric for a distinctive look.",
    features: ["Dual layer design", "Precision light control", "Contemporary styling", "Multiple opacity options"],
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    link: "/products/zebra"
  },
  {
    id: "honeycomb-cellular",
    category: "honeycomb",
    name: "Cellular Elegance",
    description: "Our Honeycomb blinds combine energy efficiency with sophisticated design, featuring a unique cellular structure that traps air for superior insulation.",
    features: ["Energy efficient", "Sound dampening", "Clean, uniform appearance", "Multiple cell sizes"],
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf", // Updated with a house image
    link: "/products/honeycomb"
  }
];

const categories = [
  { id: "all", label: "All Products" },
  { id: "roller", label: "Roller Blinds" },
  { id: "zebra", label: "Zebra Blinds" },
  { id: "honeycomb", label: "Honeycomb Blinds" }
];

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  useEffect(() => {
    const productImages = products.map(product => product.image);
    
    productImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => ({...prev, [src]: true}));
      };
    });
  }, []);
    
  useEffect(() => {
    let interval = null;
    
    if (autoRotate && !isAnimating && filteredProducts.length > 1) {
      interval = setInterval(() => {
        const currentIndex = filteredProducts.findIndex(product => product.id === activeProduct.id);
        const nextIndex = (currentIndex + 1) % filteredProducts.length;
        setIsAnimating(true);
        setActiveProduct(filteredProducts[nextIndex]);
      }, 8000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeProduct.id, filteredProducts, isAnimating, autoRotate]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const productExists = filteredProducts.some(p => p.id === activeProduct.id);
      if (!productExists) {
        setActiveProduct(filteredProducts[0]);
      }
    }
  }, [activeCategory, filteredProducts]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId !== activeCategory) {
      setActiveCategory(categoryId);
      setAutoRotate(false);
    }
  };

  const handleProductChange = (product) => {
    if (product.id !== activeProduct.id) {
      setIsAnimating(true);
      setActiveProduct(product);
      setAutoRotate(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Discover Our Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
            Premium Window Treatments
          </h2>
          <p className="text-lg text-muted-foreground">
            Expertly crafted with premium materials for unparalleled quality, style, and functionality.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-foreground border border-gray-200 hover:border-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              className="relative overflow-hidden rounded-xl shadow-xl"
            >
              <div className="aspect-[4/3] bg-gray-100 relative">
                {!imagesLoaded[activeProduct.image] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                  onLoad={() => setImagesLoaded(prev => ({...prev, [activeProduct.image]: true}))}
                  style={{opacity: imagesLoaded[activeProduct.image] ? 1 : 0, transition: 'opacity 0.3s'}}
                />
              </div>
              
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-1 rounded-full backdrop-blur-sm text-sm">
                {categories.find(c => c.id === activeProduct.category)?.label}
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductChange(product)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeProduct.id === product.id 
                        ? "w-8 bg-white" 
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`View ${product.name}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full justify-center"
            >
              <span className="text-primary font-medium uppercase tracking-wider text-sm mb-3">
                {categories.find(c => c.id === activeProduct.category)?.label}
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-medium mb-4">
                {activeProduct.name}
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                {activeProduct.description}
              </p>
              
              <ul className="mb-8 space-y-3">
                {activeProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 text-primary bg-primary/10 p-1 rounded-full">
                      <Check size={14} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Link
                  to={activeProduct.link}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/20"
                >
                  <span className="font-medium">Explore Collection</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
