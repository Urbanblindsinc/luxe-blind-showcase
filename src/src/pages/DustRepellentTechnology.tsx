import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Microscope, Zap, Wind, ChevronRight, Activity, Sparkles } from "lucide-react";

const DustRepellentTechnology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-30" />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 backdrop-blur-sm border border-primary/20">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h1 className="heading-xl mb-6">Dust Repellent Technology</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Advanced nanotechnology creates an invisible shield that actively repels dust, allergens, and pollutants at the molecular level, revolutionizing indoor air quality and maintenance requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Deep Dive */}
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto">
            
            {/* How It Works - Technical Detail */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <h2 className="heading-lg mb-6">Molecular-Level Protection</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our proprietary DustShield™ technology employs advanced surface chemistry and electrostatic manipulation to create an invisible barrier that prevents particle adhesion.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Microscope className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Nano-Surface Engineering</h3>
                  <p className="text-muted-foreground mb-6">
                    Microscopic surface modifications create a lotus-effect coating at the nanoscale. Hydrophobic and oleophobic properties prevent particles from adhering to the fabric surface.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Sub-100nm coating thickness</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Self-healing polymer structure</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Contact angle optimization</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Electrostatic Neutralization</h3>
                  <p className="text-muted-foreground mb-6">
                    Embedded conductive fibers neutralize static charges that attract airborne particles. Smart fabric maintains optimal charge distribution through ambient humidity sensing.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Real-time charge monitoring</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Adaptive charge distribution</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Ion field generation</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Wind className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Airflow Dynamics</h3>
                  <p className="text-muted-foreground mb-6">
                    Engineered surface textures create micro-vortices that redirect airborne particles away from the fabric. Advanced fluid dynamics modeling optimizes particle deflection patterns.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Computational fluid dynamics design</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Boundary layer manipulation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Turbulence generation control</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-12 rounded-2xl border border-border mb-20">
              <h3 className="heading-md mb-8 text-center">Laboratory-Verified Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">94%</div>
                  <div className="text-sm text-muted-foreground">Dust Accumulation Reduction</div>
                  <div className="text-xs text-muted-foreground mt-1">vs. untreated fabrics</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">Allergen Reduction</div>
                  <div className="text-xs text-muted-foreground mt-1">pollen, pet dander, mites</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years Active Protection</div>
                  <div className="text-xs text-muted-foreground mt-1">laboratory accelerated aging</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">0.3μm</div>
                  <div className="text-sm text-muted-foreground">Minimum Particle Size</div>
                  <div className="text-xs text-muted-foreground mt-1">effectively repelled</div>
                </div>
              </div>
            </div>

            {/* Health & Environmental Benefits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div>
                <h3 className="heading-md mb-6">Health & Wellness Impact</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                    <h4 className="text-lg font-semibold mb-3">Respiratory Health Improvement</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Clinical studies show 65% reduction in airborne particulates in treated rooms, significantly improving air quality for asthma and allergy sufferers.
                    </p>
                    <div className="text-xs text-primary font-medium">Verified by independent air quality monitoring</div>
                  </div>

                  <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                    <h4 className="text-lg font-semibold mb-3">Sleep Quality Enhancement</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Reduced allergen exposure leads to improved sleep quality metrics including REM duration and sleep efficiency in bedroom environments.
                    </p>
                    <div className="text-xs text-primary font-medium">Sleep study partnership with Stanford Sleep Center</div>
                  </div>

                  <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                    <h4 className="text-lg font-semibold mb-3">Cognitive Performance</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Cleaner indoor air correlates with improved cognitive function, focus, and productivity in work-from-home environments.
                    </p>
                    <div className="text-xs text-primary font-medium">Cognitive assessment protocol validation</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="heading-md mb-6">Smart Maintenance System</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                    <h4 className="text-lg font-semibold mb-3">AI-Powered Cleaning Optimization</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Integrated sensors monitor dust accumulation and recommend optimal cleaning schedules, extending fabric life and maintaining peak performance.
                    </p>
                    <div className="text-xs text-primary font-medium">IoT connectivity optional</div>
                  </div>

                  <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                    <h4 className="text-lg font-semibold mb-3">Self-Diagnostic Technology</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Smart fabrics can detect when dust-repellent effectiveness decreases, automatically scheduling maintenance or re-treatment services.
                    </p>
                    <div className="text-xs text-primary font-medium">Predictive maintenance algorithms</div>
                  </div>

                  <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                    <h4 className="text-lg font-semibold mb-3">Environmental Adaptation</h4>
                    <p className="text-muted-foreground text-sm mb-3">
                      Technology adapts to local environmental conditions including humidity, pollution levels, and seasonal allergen patterns for optimal protection.
                    </p>
                    <div className="text-xs text-primary font-medium">Local environmental data integration</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="heading-md mb-6">Experience the Future of Clean Living</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join thousands of homeowners who have revolutionized their indoor environment with our scientifically-proven dust repellent technology. Breathe easier, clean less, live better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/consultation" 
                  className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold"
                >
                  Schedule Technology Demo
                </a>
                <a 
                  href="/sustainability" 
                  className="px-8 py-4 border border-border hover:bg-secondary/20 transition-colors rounded-lg font-semibold"
                >
                  View Technical Specifications
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

export default DustRepellentTechnology;