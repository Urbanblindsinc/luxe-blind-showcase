import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sun, Moon, Eye, Lightbulb, Smartphone, ChevronRight, Zap, Gauge } from "lucide-react";

const AdvancedLightControl = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 md:py-32 px-6 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/15 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,183,77,0.1),transparent_50%)]" />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8 backdrop-blur-sm border border-primary/20">
                <Sun className="h-10 w-10 text-primary" />
              </div>
              <h1 className="heading-xl mb-6">Advanced Light Control</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Precision optical engineering meets smart automation to deliver unprecedented control over natural light, creating adaptive environments that respond to your needs throughout the day.
              </p>
            </div>
          </div>
        </div>

        {/* Core Technology */}
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto">
            
            {/* Technology Overview */}
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-6">Optical Engineering Innovation</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our LightSync™ technology combines advanced materials science with precision optical design to create dynamic light management systems that adapt to changing conditions in real-time.
              </p>
            </div>

            {/* Advanced Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Circadian Light Optimization</h3>
                      <p className="text-muted-foreground mb-4">
                        AI-powered algorithms automatically adjust light filtering throughout the day to support natural circadian rhythms, improving sleep quality and mental health.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Automatic blue light filtering at sunset</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Morning light therapy simulation</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Seasonal affective disorder mitigation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Photonic Light Diffusion</h3>
                      <p className="text-muted-foreground mb-4">
                        Engineered at the nanoscale, our fabric structures create controlled light scattering that eliminates harsh shadows while maintaining visual privacy and reducing glare.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Uniform luminance distribution</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Glare reduction up to 90%</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Color temperature preservation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Smart Environment Integration</h3>
                      <p className="text-muted-foreground mb-4">
                        Seamlessly integrates with home automation systems, adjusting based on weather data, calendar events, and occupancy sensors for optimal comfort and energy efficiency.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Weather-responsive automation</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Voice control compatibility</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Machine learning adaptation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/30 to-accent/10 p-8 rounded-2xl border border-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Dynamic Energy Optimization</h3>
                      <p className="text-muted-foreground mb-4">
                        Real-time analysis of solar gain, thermal load, and lighting requirements automatically adjusts blind positioning to minimize HVAC usage and artificial lighting needs.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Peak demand load reduction</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Thermal comfort optimization</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          <span>Carbon footprint tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Dashboard */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-12 rounded-2xl border border-border mb-20">
              <h3 className="heading-md mb-8 text-center">Performance Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Gauge className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">45%</div>
                  <div className="text-sm text-muted-foreground">Energy Consumption Reduction</div>
                  <div className="text-xs text-muted-foreground mt-1">average annual savings</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Sun className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">99%</div>
                  <div className="text-sm text-muted-foreground">UV Protection Rating</div>
                  <div className="text-xs text-muted-foreground mt-1">furniture preservation</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Moon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <div className="text-sm text-muted-foreground">Light Blocking Capability</div>
                  <div className="text-xs text-muted-foreground mt-1">maximum privacy mode</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">72%</div>
                  <div className="text-sm text-muted-foreground">Glare Reduction</div>
                  <div className="text-xs text-muted-foreground mt-1">improved visual comfort</div>
                </div>
              </div>
            </div>

            {/* Application Scenarios */}
            <div className="mb-20">
              <h3 className="heading-md mb-12 text-center">Application Scenarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-8 bg-secondary/20 rounded-2xl border border-border">
                  <h4 className="text-xl font-semibold mb-4">Home Office Productivity</h4>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Automatically adjusts throughout the workday to reduce eye strain, minimize screen glare, and maintain alertness through optimized natural light exposure.
                  </p>
                  <div className="text-primary font-medium text-sm">23% productivity increase measured</div>
                </div>

                <div className="p-8 bg-secondary/20 rounded-2xl border border-border">
                  <h4 className="text-xl font-semibold mb-4">Bedroom Sleep Enhancement</h4>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Gradual dimming in the evening promotes melatonin production, while gradual brightening in the morning provides natural wake-up cues for better sleep cycles.
                  </p>
                  <div className="text-primary font-medium text-sm">42% improvement in sleep quality scores</div>
                </div>

                <div className="p-8 bg-secondary/20 rounded-2xl border border-border">
                  <h4 className="text-xl font-semibold mb-4">Media Room Perfection</h4>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Intelligent blackout modes eliminate ambient light interference while maintaining room ventilation, creating optimal viewing conditions for any content.
                  </p>
                  <div className="text-primary font-medium text-sm">Cinema-grade darkness on demand</div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-gradient-to-br from-secondary/20 to-accent/10 p-12 rounded-2xl border border-border mb-20">
              <h3 className="heading-md mb-8 text-center">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Optical Performance</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Visible Light Transmission</span>
                      <span>5-95% (adjustable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">UV Rejection</span>
                      <span>99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IR Heat Rejection</span>
                      <span>85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color Rendering Index</span>
                      <span>95+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Smart Features</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span>&lt;2 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Positioning Accuracy</span>
                      <span>±1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power Consumption</span>
                      <span>0.5W standby</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wireless Range</span>
                      <span>150m (line of sight)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="heading-md mb-6">Master Your Environment</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience the future of light control with technology that adapts to your lifestyle. Schedule a personalized demonstration to see how advanced light management can transform your space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/consultation" 
                  className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold"
                >
                  Schedule Smart Demo
                </a>
                <a 
                  href="/smart-home-integration" 
                  className="px-8 py-4 border border-border hover:bg-secondary/20 transition-colors rounded-lg font-semibold"
                >
                  View Smart Home Integration
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

export default AdvancedLightControl;