import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Recycle, Factory, TreePine, Award, ChevronRight } from "lucide-react";

const EcoFriendlyMaterials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80"
            alt="Sustainable bamboo forest representing eco-friendly materials"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <h1 className="heading-xl mb-6">Eco-Friendly Materials</h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                Advanced sustainable materials engineered for performance, durability, and environmental responsibility. Where cutting-edge technology meets ecological stewardship.
              </p>
            </div>
          </div>
        </div>

        {/* Material Innovation Section */}
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-6">Material Innovation Lab</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our R&D team continuously develops next-generation materials that exceed performance standards while minimizing environmental impact through advanced molecular engineering and biomimetic design.
              </p>
            </div>

            {/* Advanced Materials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-secondary/50 to-accent/20 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Recycle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Bio-Composite Technology</h3>
                      <p className="text-muted-foreground mb-4">
                        Revolutionary fabric composites made from 85% recycled ocean plastic and agricultural waste fibers. Our proprietary molecular bonding process creates materials 3x stronger than traditional options.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Carbon negative manufacturing process</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>50% reduction in microplastic shedding</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Enhanced UV resistance and color retention</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/50 to-accent/20 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TreePine className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Smart Bamboo Fibers</h3>
                      <p className="text-muted-foreground mb-4">
                        Genetically optimized bamboo fibers with integrated antimicrobial properties and natural humidity regulation. Grown in vertical farms using 90% less water than traditional methods.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Self-cleaning surface technology</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Natural air purification properties</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Rapid biodegradability (24 months)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-secondary/50 to-accent/20 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Factory className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Zero-Waste Manufacturing</h3>
                      <p className="text-muted-foreground mb-4">
                        AI-powered production systems eliminate waste through precision cutting algorithms and closed-loop material recovery. All byproducts are upcycled into new products or energy.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>100% renewable energy manufacturing</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Water recycling and purification systems</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Blockchain supply chain transparency</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/50 to-accent/20 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Certified Performance</h3>
                      <p className="text-muted-foreground mb-4">
                        All materials exceed Cradle-to-Cradle Gold standards and GREENGUARD certification for indoor air quality. Third-party lifecycle assessments validate our environmental claims.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>LEED contribution points certified</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Zero VOC emissions guarantee</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>25-year durability warranty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Impact Metrics */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-12 rounded-2xl border border-border">
              <h3 className="heading-md mb-8 text-center">Environmental Impact Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">75%</div>
                  <div className="text-sm text-muted-foreground">Reduction in Carbon Footprint</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">90%</div>
                  <div className="text-sm text-muted-foreground">Recycled Content by Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">0</div>
                  <div className="text-sm text-muted-foreground">Landfill Waste Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Environmental Certifications</div>
                </div>
              </div>
            </div>

            {/* Technology Innovation */}
            <div className="mt-20 text-center">
              <h3 className="heading-md mb-6">The Future of Sustainable Materials</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Our materials research lab partners with leading universities and environmental scientists to develop tomorrow's sustainable solutions today. Every product represents years of innovation in molecular engineering and environmental science.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/consultation" 
                  className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold"
                >
                  Schedule Material Consultation
                </a>
                <a 
                  href="/sustainability" 
                  className="px-8 py-4 border border-border hover:bg-secondary/20 transition-colors rounded-lg font-semibold"
                >
                  View Sustainability Report
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

export default EcoFriendlyMaterials;