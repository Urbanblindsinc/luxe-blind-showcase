import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useRegion } from "@/hooks/use-region";
import { 
  Button,
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent
} from "@/components";
import {
  ArrowRight,
  Check,
  Star,
  Heart,
  Zap,
  Save,
  Droplets,
  Fingerprint
} from "lucide-react";
import CTA from "@/components/CTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const FallSale = () => {
  const [activeTab, setActiveTab] = useState("roller");
  const navigate = useNavigate();
  const { zone } = useRegion();

  const handleCustomizeOrder = () => {
    navigate("/quote-calculator");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = {
    roller: [
      {
        id: 1,
        name: "Premium Light Filtering Roller",
        features: [
          "Superior light filtering technology",
          "UV protection to prevent fading",
          "Room darkening capabilities",
          "Energy efficiency rating: High"
        ],
        image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: true,
      },
      {
        id: 2,
        name: "Deluxe Blackout Roller",
        features: [
          "100% room darkening capability",
          "Thermal insulation properties",
          "Sound dampening technology",
          "Energy efficiency rating: Very High"
        ],
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: false,
      },
      {
        id: 3,
        name: "Classic Sunscreen Roller",
        features: [
          "Filters harsh sunlight without blocking views",
          "Anti-glare technology for digital screens",
          "UV protection for furniture",
          "Energy efficiency rating: Medium"
        ],
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: false,
      }
    ],
    zebra: [
      {
        id: 4,
        name: "Modern Day & Night Zebra",
        features: [
          "Adjustable light control strips",
          "Dual-layered premium fabric",
          "Contemporary striped design",
          "Energy efficiency rating: Medium-High"
        ],
        image: "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: true,
      },
      {
        id: 5,
        name: "Luxury Zebra Shading",
        features: [
          "Extra-wide fabric strips for enhanced privacy",
          "Premium motorized operation",
          "Designer fabric collection",
          "Energy efficiency rating: High"
        ],
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: false,
      }
    ],
    honeycomb: [
      {
        id: 6,
        name: "Double Cell Honeycomb",
        features: [
          "Superior insulation with double cell structure",
          "Noise reduction technology",
          "Dust-resistant fabric treatment",
          "Energy efficiency rating: Very High"
        ],
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: true,
      },
      {
        id: 7,
        name: "Top-Down Bottom-Up Honeycomb",
        features: [
          "Versatile operation from either direction",
          "Premium cord management system",
          "Child and pet safety certified",
          "Energy efficiency rating: Highest"
        ],
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        popular: false,
      }
    ]
  };

  const faqs = [
    {
      question: "How long will the Fall Sale last?",
      answer: "Our Fall Sale is running for a limited time until November 30th, 2025. This is the perfect opportunity to upgrade your window treatments at exceptional value."
    },
    {
      question: "Are installation services included?",
      answer: "Professional installation services are available at an additional cost. Our expert installers ensure your blinds are perfectly fitted with precision and care."
    },
    {
      question: "What is the warranty on sale items?",
      answer: "All our products, including sale items, come with our standard 5-year warranty covering manufacturing defects and mechanical issues. Premium motorized options include an extended 7-year warranty."
    },
    {
      question: "Can I request custom sizes during the sale?",
      answer: "Absolutely! All our window treatments are custom-made to your exact specifications. The sale pricing applies to all standard and custom sizes."
    },
    {
      question: "How can I qualify for free shipping?",
      answer: "Free shipping is automatically applied to all orders over $1,000. For orders below this threshold, shipping costs will be calculated based on your location."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Banner */}
        <section className="relative bg-primary py-20 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Fall Harvest Sale
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your windows with our premium window treatments at special seasonal pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={handleCustomizeOrder} 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Get Your Custom Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate("/consultation")} 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Fall Collection</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our most popular styles, now with special fall pricing for a limited time.
              </p>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="roller">Roller Blinds</TabsTrigger>
                <TabsTrigger value="zebra">Zebra Blinds</TabsTrigger>
                <TabsTrigger value="honeycomb">Honeycomb Shades</TabsTrigger>
              </TabsList>

              {Object.entries(products).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((product) => (
                      <div 
                        key={product.id} 
                        className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg relative"
                      >
                        {product.popular && (
                          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                            Most Popular
                          </div>
                        )}
                        <div className="h-64 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                          <ul className="space-y-2 mb-6">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="space-y-3 mt-6">
                            <Button
                              onClick={handleCustomizeOrder}
                              className="w-full bg-primary hover:bg-primary/90"
                            >
                              Customize & Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fall Benefits & Features
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Invest in quality window treatments that enhance your home's comfort, style, and efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                <p className="text-gray-600">
                  Crafted with superior materials and attention to detail for exceptional durability and performance.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Designer Styles</h3>
                <p className="text-gray-600">
                  Curated selection of on-trend colors and patterns to perfectly complement your interior design.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Energy Efficiency</h3>
                <p className="text-gray-600">
                  Thermal insulation properties that help reduce energy costs by maintaining optimal room temperature.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Save className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Limited-Time Savings</h3>
                <p className="text-gray-600">
                  Special fall pricing on our most popular collections for maximum value on your investment.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Droplets className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Maintenance</h3>
                <p className="text-gray-600">
                  Dust-resistant treatments and simple cleaning requirements keep your blinds looking fresh with minimal effort.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Fingerprint className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Options</h3>
                <p className="text-gray-600">
                  Personalize every aspect from size to control mechanisms for a perfect fit to your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Customer Testimonials
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear what our satisfied customers have to say about their Urban Blinds experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "The quality of our new roller blinds exceeded our expectations. The light filtering is perfect for our living room, and the installation was flawless."
                </p>
                <div>
                  <p className="font-bold">Sarah M.</p>
                  <p className="text-gray-500 text-sm">{zone === "SEATTLE" ? "Seattle, WA" : "Local Customer"}</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "We installed zebra blinds in our bedroom and home office, and the ability to adjust light levels throughout the day has been a game-changer."
                </p>
                <div>
                  <p className="font-bold">Michael T.</p>
                  <p className="text-gray-500 text-sm">Vancouver, BC</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "The honeycomb blinds have made a noticeable difference in our energy bills. Plus, they look absolutely stunning and match our décor perfectly."
                </p>
                <div>
                  <p className="font-bold">Emily R.</p>
                  <p className="text-gray-500 text-sm">Montreal, QC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our Spring Sale and products.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Windows?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't miss out on our limited-time Spring offers. Schedule your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                onClick={handleCustomizeOrder}
                className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg"
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/quote")}
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Request In-Home Measurement
              </Button>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default FallSale;
