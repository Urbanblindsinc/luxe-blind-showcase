
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Recycle, Sun, TreePine, Shield, Award, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Sustainability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Energy Estimator state
  const [region, setRegion] = useState<'US' | 'CA'>('CA');
  const [blindType, setBlindType] = useState<'Honeycomb' | 'Zebra' | 'Roller'>('Honeycomb');
  const [annualCost, setAnnualCost] = useState<number>(1200);
  const [pricePerKWh, setPricePerKWh] = useState<number>(0.13);
  const rates = { Honeycomb: 0.2, Zebra: 0.12, Roller: 0.08 } as const;
  const co2Factor = region === 'US' ? 0.4 : 0.15; // kg CO2 per kWh (avg grid factor)
  const savings = Math.max(0, annualCost) * rates[blindType];
  const savedKWh = pricePerKWh > 0 ? savings / pricePerKWh : 0;
  const savedCO2 = savedKWh * co2Factor;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Section */}
        <div className="relative h-[600px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Lush green forest representing sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-primary/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Leaf className="h-8 w-8 text-primary" />
                  <span className="text-lg bg-primary/20 px-4 py-2 rounded-full">Certified Sustainable</span>
                </div>
                <h1 className="text-5xl font-display font-medium mb-6">Our Sustainability Commitment</h1>
                <p className="text-xl mb-8">
                  At Urban Blinds, we believe luxury and environmental responsibility go hand in hand. 
                  Discover how we're pioneering sustainable practices in window treatments while helping you reduce your home's environmental impact.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Carbon Neutral</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Recycled Materials</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Energy Efficient</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Forest Positive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact Stats */}
        <div className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-medium mb-4">Our Environmental Impact</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Real numbers that demonstrate our commitment to environmental stewardship
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">75%</div>
                <p className="text-sm text-muted-foreground">Reduction in manufacturing waste since 2020</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
                <p className="text-sm text-muted-foreground">Trees planted through our reforestation program</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">30%</div>
                <p className="text-sm text-muted-foreground">Average energy savings in homes with our smart blinds</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Renewable energy in our manufacturing facilities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainable Materials */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-display font-medium mb-6">Sustainable Materials & Manufacturing</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We've revolutionized our supply chain to prioritize environmental responsibility without compromising on quality or aesthetics.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Recycle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recycled & Recyclable Fabrics</h3>
                      <p className="text-muted-foreground">Our premium fabrics contain up to 85% recycled content from post-consumer plastic bottles and textile waste</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <TreePine className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">FSC-Certified Wood</h3>
                      <p className="text-muted-foreground">All wooden components sourced from Forest Stewardship Council certified sustainable forests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Non-Toxic Treatments</h3>
                      <p className="text-muted-foreground">All fabric treatments and finishes are GREENGUARD Gold certified for indoor air quality</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Sustainable fabric manufacturing" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Sustainable forest" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1574263867128-feefb1867d92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Recycling process" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Green energy manufacturing" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Energy Efficiency */}
        <div className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Solar panels and energy efficiency" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-display font-medium mb-6">Helping You Save Energy</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our window treatments are designed to be active participants in your home's energy management, 
                  reducing your carbon footprint while cutting utility costs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sun className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Thermal Regulation</h3>
                      <p className="text-muted-foreground">Advanced insulating properties reduce heating and cooling loads by up to 30%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Smart Automation</h3>
                      <p className="text-muted-foreground">AI-powered scheduling optimizes natural light usage throughout the day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Carbon Footprint Tracking</h3>
                      <p className="text-muted-foreground">Our app shows real-time energy savings and carbon offset achievements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Savings Estimator */}
        <div id="energy-savings-estimator" className="py-16 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-medium mb-4">Energy Savings Estimator</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Estimate how much you can save on heating and cooling with different blind types and see your eco impact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="region">Region</Label>
                      <Select value={region} onValueChange={(v) => setRegion(v as 'US' | 'CA')}>
                        <SelectTrigger id="region"><SelectValue placeholder="Select region" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="US">United States</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="blindType">Blind Type</Label>
                      <Select value={blindType} onValueChange={(v) => setBlindType(v as any)}>
                        <SelectTrigger id="blindType"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Honeycomb">Honeycomb (best insulation)</SelectItem>
                          <SelectItem value="Zebra">Zebra</SelectItem>
                          <SelectItem value="Roller">Roller</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="annualCost">Annual HVAC Cost (USD)</Label>
                      <Input id="annualCost" type="number" min={0} value={annualCost}
                        onChange={(e) => setAnnualCost(Number(e.target.value) || 0)} placeholder="e.g., 1200" />
                    </div>
                    <div>
                      <Label htmlFor="pricePerKWh">Energy Price ($/kWh)</Label>
                      <Input id="pricePerKWh" type="number" step="0.01" min={0} value={pricePerKWh}
                        onChange={(e) => setPricePerKWh(Number(e.target.value) || 0)} placeholder="e.g., 0.13" />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Assumptions: Savings rate depends on blind type. CO₂ factor uses average grid mix
                    ({" "}{region === 'US' ? '0.40' : '0.15'} kg CO₂/kWh).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle>Estimated Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-primary">{rates[blindType] * 100}%</div>
                      <p className="text-sm text-muted-foreground">Savings rate</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-primary">${'{'}savings.toFixed(0){'}'}</div>
                      <p className="text-sm text-muted-foreground">Annual savings</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-primary">{savedCO2.toFixed(0)} kg</div>
                      <p className="text-sm text-muted-foreground">CO₂ reduced / year</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-primary/10 text-sm">
                    Choosing <span className="font-medium">{blindType}</span> blinds could save approximately
                    <span className="font-semibold"> ${'{'}savings.toFixed(0){'}'}</span> per year and reduce emissions by
                    <span className="font-semibold"> {savedCO2.toFixed(0)} kg</span> annually.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-medium mb-4">Recognized Leadership</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our commitment to sustainability has been recognized by leading environmental organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white border border-border rounded-lg">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">GREENGUARD Gold</h3>
                <p className="text-sm text-muted-foreground">Certified for low chemical emissions</p>
              </div>
              
              <div className="text-center p-6 bg-white border border-border rounded-lg">
                <TreePine className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">FSC Certified</h3>
                <p className="text-sm text-muted-foreground">Responsible forest management</p>
              </div>
              
              <div className="text-center p-6 bg-white border border-border rounded-lg">
                <Recycle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Cradle to Cradle</h3>
                <p className="text-sm text-muted-foreground">Bronze level certified products</p>
              </div>
              
              <div className="text-center p-6 bg-white border border-border rounded-lg">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">B Corp Certified</h3>
                <p className="text-sm text-muted-foreground">Meeting highest standards of social and environmental performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Take Action */}
        <div className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-medium mb-4">Join Our Sustainability Mission</h2>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Every purchase supports reforestation efforts, renewable energy initiatives, and sustainable manufacturing practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Plant a Tree</h3>
                <p className="opacity-90">For every blind purchased, we plant a tree in partnership with global reforestation projects</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Recycle Program</h3>
                <p className="opacity-90">Return your old blinds to us for responsible recycling and receive a discount on new purchases</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">Energy Savings</h3>
                <p className="opacity-90">Track your home's energy savings and carbon offset through our smart blind analytics</p>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href="/consultation" 
                className="px-8 py-4 bg-white text-green-600 hover:bg-gray-100 transition-colors inline-block rounded-lg font-medium"
              >
                Start Your Sustainable Journey
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sustainability;
