import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryLink from "@/components/zebra/GalleryLink";
import ImageShowcase from "@/components/zebra/ImageShowcase";
import { 
  ArrowRight, 
  Camera, 
  ChevronRight, 
  BookOpen, 
  Star, 
  Heart, 
  Lightbulb, 
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PhotoSpotlight from "@/components/PhotoSpotlight";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";

const Inspiration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Design Inspiration | Urban Blinds";
  }, []);
  
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Spaces" },
    { id: "living", name: "Living Room" },
    { id: "bedroom", name: "Bedroom" },
    { id: "dining", name: "Dining Area" },
    { id: "office", name: "Home Office" }
  ];
  
  const clientQuotes = [
    {
      id: 1,
      quote: "The zebra blinds completely transformed our living room. The quality is exceptional and the light control is perfect for our south-facing windows.",
      author: "Sarah Johnson",
      location: "Manhattan Loft"
    },
    {
      id: 2,
      quote: "Working with Urban Blinds was a pleasure from start to finish. Their design consultation helped us find the perfect solution for our unusual bay windows.",
      author: "Michael Chen",
      location: "Brownstone Renovation"
    },
    {
      id: 3,
      quote: "The honeycomb blinds provide excellent insulation during winter. Our energy bills have noticeably decreased since installation.",
      author: "Emma Rodriguez",
      location: "Modern Townhouse"
    }
  ];
  
  const inspirationGallery = [
    {
      id: 1,
      title: "Modern Simplicity",
      description: "Clean lines and minimalist design with premium roller blinds",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "living",
      featured: true,
      product: "Roller Blinds"
    },
    {
      id: 2,
      title: "Coastal Retreat",
      description: "Light filtering zebra blinds creating a serene atmosphere",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "bedroom",
      featured: false,
      product: "Zebra Blinds"
    },
    {
      id: 3,
      title: "Executive Suite",
      description: "Sophisticated honeycomb blinds for an elegant workspace",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "office",
      featured: true,
      product: "Honeycomb Blinds"
    },
    {
      id: 4,
      title: "Urban Loft",
      description: "Industrial chic meets warm textures with customized window treatments",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "living",
      featured: false,
      product: "Roller Blinds"
    },
    {
      id: 5,
      title: "Dining Elegance",
      description: "Statement window treatments enhancing the dining experience",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      featured: false,
      product: "Zebra Blinds"
    },
    {
      id: 6,
      title: "Tranquil Master Suite",
      description: "Blackout honeycomb blinds creating a peaceful retreat",
      image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "bedroom",
      featured: true,
      product: "Honeycomb Blinds"
    }
  ];
  
  const filteredInspirations = activeCategory === "all" 
    ? inspirationGallery 
    : inspirationGallery.filter(item => item.category === activeCategory);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8 }}
            className="h-full w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Luxury interior with designer window treatments" 
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"></div>
          </motion.div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-display font-medium text-white mb-6">
              <span className="block">Design</span>
              <span className="bg-blue-gradient bg-clip-text text-transparent">Inspiration</span>
            </h1>
            
            <div className="w-20 h-[2px] bg-primary mx-auto mb-8"></div>
            
            <p className="text-xl text-white/90 mb-10">
              Discover how our premium window treatments transform spaces into extraordinary environments. 
              Explore our curated gallery of distinctive interiors and innovative design concepts.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button asChild size="lg" className="px-8 py-6 text-base">
                <Link to="/consultation">
                  Book a Design Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            >
              <a href="#inspiration-content" className="text-white flex flex-col items-center">
                <span className="text-sm font-light mb-2">Explore</span>
                <ChevronRight className="rotate-90 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <div id="inspiration-content" className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div className="max-w-xl">
                <div className="w-12 h-[1px] bg-primary mb-6"></div>
                <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">
                  Featured Designs
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore our showcase of exceptional spaces transformed by Urban Blinds' distinctive window treatments.
                </p>
              </div>
              <Link
                to="/gallery"
                className="mt-6 md:mt-0 group inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="font-medium">View Full Gallery</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {inspirationGallery.filter(item => item.featured).slice(0, 2).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative overflow-hidden group rounded-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="aspect-[16/9]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 p-10 w-full">
                      <span className="inline-block px-4 py-2 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium rounded-full mb-4">
                        {item.product}
                      </span>
                      <h3 className="text-3xl font-display font-medium text-white mb-3">{item.title}</h3>
                      <p className="text-white/90 mb-8 text-lg">{item.description}</p>
                      <Link 
                        to={`/products/${item.product.toLowerCase().replace(' ', '-')}`}
                        className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                      >
                        <span>Explore This Design</span>
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm py-6 px-8">
                    <h3 className="text-2xl font-display font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-white/80">{item.product}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                key={inspirationGallery.filter(item => item.featured)[2].id}
                className="relative overflow-hidden group rounded-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-[3/4]">
                  <img 
                    src={inspirationGallery.filter(item => item.featured)[2].image} 
                    alt={inspirationGallery.filter(item => item.featured)[2].title} 
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="inline-block px-3 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium rounded-full mb-3">
                      {inspirationGallery.filter(item => item.featured)[2].product}
                    </span>
                    <h3 className="text-2xl font-display font-medium text-white mb-2">{inspirationGallery.filter(item => item.featured)[2].title}</h3>
                    <p className="text-white/80 mb-6">{inspirationGallery.filter(item => item.featured)[2].description}</p>
                    <Link 
                      to={`/products/${inspirationGallery.filter(item => item.featured)[2].product.toLowerCase().replace(' ', '-')}`}
                      className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm py-4 px-6">
                  <h3 className="text-xl font-display font-medium text-white mb-0">{inspirationGallery.filter(item => item.featured)[2].title}</h3>
                </div>
              </motion.div>
              
              <motion.div
                key="luxury-kitchen"
                className="relative overflow-hidden group rounded-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="aspect-[3/4]">
                  <img 
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Luxury Kitchen Design" 
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="inline-block px-3 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium rounded-full mb-3">
                      Roller Blinds
                    </span>
                    <h3 className="text-2xl font-display font-medium text-white mb-2">Luxury Kitchen Design</h3>
                    <p className="text-white/80 mb-6">Light-filtering roller blinds complementing a modern kitchen with clean lines</p>
                    <Link 
                      to="/products/roller-blinds"
                      className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm py-4 px-6">
                  <h3 className="text-xl font-display font-medium text-white mb-0">Luxury Kitchen Design</h3>
                </div>
              </motion.div>
              
              <motion.div
                key="modern-nursery"
                className="relative overflow-hidden group rounded-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="aspect-[3/4]">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Modern Nursery" 
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="inline-block px-3 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium rounded-full mb-3">
                      Zebra Blinds
                    </span>
                    <h3 className="text-2xl font-display font-medium text-white mb-2">Modern Nursery</h3>
                    <p className="text-white/80 mb-6">Child-safe zebra blinds creating a peaceful and stylish nursery environment</p>
                    <Link 
                      to="/products/zebra-blinds"
                      className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm py-4 px-6">
                  <h3 className="text-xl font-display font-medium text-white mb-0">Modern Nursery</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <PhotoSpotlight 
          src="/lovable-uploads/9c9607f5-eb4b-418c-bde9-25c4ab8cf38f.png"
          alt="Beige zebra blinds in dining area – recent Urban Blinds project"
          caption="From a recent Urban Blinds project"
        />
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-medium mb-4">Design Inspirations</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Browse our curated gallery of extraordinary spaces featuring Urban Blinds products, 
                designed to inspire your next window treatment project.
              </p>
              
              <div className="flex flex-wrap justify-center mt-8 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-foreground hover:bg-blue-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInspirations.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-white rounded-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                        fetchPriority={index < 6 ? "high" : "auto"}
                      />
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-primary transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 p-8 w-full">
                        <span className="inline-block px-3 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium rounded-full mb-3">
                          {item.product}
                        </span>
                        <h3 className="text-2xl font-display font-medium text-white mb-2">{item.title}</h3>
                        <p className="text-white/80 mb-6">{item.description}</p>
                        <Link 
                          to={`/products/${item.product.toLowerCase().replace(' ', '-')}`}
                          className="inline-flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                        >
                          <span>Explore</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-display font-medium">{item.title}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-blue-500 fill-blue-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-5">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{categories.find(c => c.id === item.category)?.name}</span>
                      <Link 
                        to="/gallery" 
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        View Details <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <GalleryLink />
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto text-center mb-16">
              <span className="text-blue-600 uppercase tracking-wider text-sm font-medium">Stay Inspired</span>
              <h2 className="text-4xl font-display font-medium mt-2 mb-4">Latest Design Trends</h2>
              <p className="text-lg text-muted-foreground">
                Discover the latest innovations and trends in window treatment design, curated by our expert team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div
                key="biophilic-design"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="overflow-hidden rounded-sm mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                    alt="Biophilic Design Integration" 
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-medium">Biophilic Design Integration</h3>
                </div>
                
                <p className="text-muted-foreground pl-12">Incorporating natural elements and maximizing natural light with strategic window treatments</p>
              </motion.div>

              <motion.div
                key="smart-home"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group"
              >
                <div className="overflow-hidden rounded-sm mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Smart Home Technology" 
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-medium">Smart Home Technology</h3>
                </div>
                
                <p className="text-muted-foreground pl-12">Automated blinds that respond to voice commands and integrate with your home ecosystem</p>
              </motion.div>

              <motion.div
                key="sustainable-materials"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group"
              >
                <div className="overflow-hidden rounded-sm mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Sustainable Materials" 
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-medium">Sustainable Materials</h3>
                </div>
                
                <p className="text-muted-foreground pl-12">Eco-friendly window treatments crafted from renewable resources and recycled materials</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto text-center mb-12">
              <div className="w-12 h-[1px] bg-blue-500 mx-auto mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Client Reflections
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from our clients about how Urban Blinds transformed their living spaces.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {clientQuotes.map((quote) => (
                    <CarouselItem key={quote.id}>
                      <div className="p-1">
                        <div className="bg-white p-10 rounded-sm border border-gray-100 text-center">
                          <div className="flex justify-center mb-6">
                            <Sparkles className="text-blue-600 w-8 h-8" />
                          </div>
                          <blockquote className="text-xl md:text-2xl font-display italic mb-8">
                            "{quote.quote}"
                          </blockquote>
                          <div className="w-12 h-[1px] bg-blue-500/50 mx-auto mb-4"></div>
                          <cite className="not-italic">
                            <p className="font-medium text-lg">{quote.author}</p>
                            <p className="text-muted-foreground">{quote.location}</p>
                          </cite>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-20px]" />
                <CarouselNext className="right-[-20px]" />
              </Carousel>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Interior design consultation" 
                  className="w-full h-auto rounded-sm"
                  loading="eager"
                />
              </div>
              
              <div className="lg:col-span-3">
                <h2 className="text-4xl font-display font-medium mb-6">
                  Transform Your Space with Expert Guidance
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our design consultants are here to help you navigate the myriad of options and create 
                  a window treatment solution that perfectly complements your space and lifestyle.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <Camera className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Visualization Tools</h3>
                      <p className="text-sm text-muted-foreground">
                        Preview how different options will look in your space before making a decision.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Material Library</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore our extensive collection of premium fabrics and materials.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 px-6 py-6 text-base">
                    <Link to="/consultation">Schedule a Consultation</Link>
                  </Button>
                  <Button variant="outline" asChild className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-6 text-base">
                    <Link to="/customization">Create Custom Blinds</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
};

export default Inspiration;
