
import React from "react";
import { ShieldCheck, Zap, Clock, Smartphone, Wifi, RefreshCw, Home, Cloud, Battery, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SpecialCollection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Smart Home Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600">
            Intelligent Motorization Options
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our premium motorized blind technology, designed to integrate seamlessly with your smart home ecosystem
          </p>
        </div>
        
        {/* Motor Types Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Standard Motor */}
          <div className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full"></div>
            <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-primary/5 rounded-full"></div>
            
            <div className="p-8 relative z-10">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <Wifi className="h-7 w-7 text-purple-700" />
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-4">
                Signature Smart Motor
              </h3>
              
              <p className="text-gray-600 mb-6">
                Our standard motor solution seamlessly integrates with all major smart home systems through our dedicated Smart Hub
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-purple-700" />
                  </div>
                  <span className="text-sm text-gray-700">Ultra-quiet operation (below 45db)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <Battery className="h-3 w-3 text-purple-700" />
                  </div>
                  <span className="text-sm text-gray-700">6-hour charge lasts 800+ operations</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <Cloud className="h-3 w-3 text-purple-700" />
                  </div>
                  <span className="text-sm text-gray-700">Works with all voice assistants</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    <span className="text-xs text-gray-500">Hub included</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">CONTROL OPTIONS</span>
                    <div className="flex">
                      <Smartphone className="h-3 w-3 text-gray-400" />
                      <Home className="h-3 w-3 text-gray-400 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </div>
          
          {/* Zigbee Motor */}
          <div className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full"></div>
            <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-primary/5 rounded-full"></div>
            
            <div className="p-8 relative z-10">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <RefreshCw className="h-7 w-7 text-blue-700" />
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-4">
                Zigbee Direct Connect
              </h3>
              
              <p className="text-gray-600 mb-6">
                Connect directly to Echo and SmartThings devices without requiring any additional hub or bridge
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-blue-700" />
                  </div>
                  <span className="text-sm text-gray-700">Compatible with 5 Echo models</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Battery className="h-3 w-3 text-blue-700" />
                  </div>
                  <span className="text-sm text-gray-700">Optional solar panel charging</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Cloud className="h-3 w-3 text-blue-700" />
                  </div>
                  <span className="text-sm text-gray-700">No hub required for Echo devices</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span className="text-xs text-gray-500">Zigbee-enabled</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">DIRECT CONNECT</span>
                    <div className="flex">
                      <Smartphone className="h-3 w-3 text-gray-400" />
                      <Home className="h-3 w-3 text-gray-400 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </div>
          
          {/* Matter Motor */}
          <div className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full"></div>
            <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-primary/5 rounded-full"></div>
            
            <div className="p-8 relative z-10">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <Fingerprint className="h-7 w-7 text-amber-700" />
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-4">
                Matter-Enabled Luxury
              </h3>
              
              <p className="text-gray-600 mb-6">
                The future of smart home with universal compatibility across all major smart home platforms
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-amber-700" />
                  </div>
                  <span className="text-sm text-gray-700">Seamless multi-platform integration</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Battery className="h-3 w-3 text-amber-700" />
                  </div>
                  <span className="text-sm text-gray-700">Extended 12-month battery life</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <Cloud className="h-3 w-3 text-amber-700" />
                  </div>
                  <span className="text-sm text-gray-700">Compatible with HomeKit, Google, Alexa</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    <span className="text-xs text-gray-500">Matter-certified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">UNIVERSAL</span>
                    <div className="flex">
                      <Smartphone className="h-3 w-3 text-gray-400" />
                      <Home className="h-3 w-3 text-gray-400 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -z-10 w-full h-full rounded-3xl bg-gradient-to-br from-slate-100 to-gray-100 rotate-3 transform-gpu"></div>
              <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Smart blind with smartphone control" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    console.error("Image failed to load");
                    e.currentTarget.src = "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
                    toast.error("Image failed to load, using fallback image", { duration: 3000 });
                  }}
                />
                <div className="p-6">
                  <h4 className="text-lg font-medium mb-2 text-gray-800">Effortless Smart Home Integration</h4>
                  <p className="text-sm text-gray-600">Control all your blinds from anywhere using voice commands or our intuitive mobile app</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-display font-medium mb-6 text-gray-800 tracking-tight">
                  Elevate Your Home with Intelligent Technology
                </h3>
                <p className="text-gray-600 mb-6">
                  Our motorized blinds do more than just open and close at the touch of a button—they learn your preferences, adapt to your lifestyle, and seamlessly integrate with your existing smart home ecosystem.
                </p>
              </div>
              
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-gray-800">Intelligent Scheduling</h4>
                    <p className="text-gray-600">Automatically adjust your blinds according to time of day, weather conditions, or presence detection</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-gray-800">Energy Optimization</h4>
                    <p className="text-gray-600">Reduce energy costs by up to 30% through automated temperature management and natural light utilization</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-gray-800">Remote Access</h4>
                    <p className="text-gray-600">Monitor and control your blinds from anywhere in the world with our secure cloud platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-10"></div>
          <blockquote className="relative mb-8">
            <div className="text-3xl text-gray-300 absolute -top-10 left-0 -translate-x-1/2">"</div>
            <p className="text-xl md:text-2xl italic text-gray-700 mb-6 leading-relaxed">
              The motorized blinds have transformed how we experience our living spaces throughout the day. The ability to schedule different positions for different times has been revolutionary.
            </p>
            <div className="text-3xl text-gray-300 absolute -bottom-10 right-0 translate-x-1/2">"</div>
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Customer portrait" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Customer portrait failed to load");
                  e.currentTarget.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                  toast.error("Image failed to load, using fallback image", { duration: 3000 });
                }}
              />
            </div>
            <cite className="not-italic">
              <span className="text-gray-800 font-medium block">Sarah Johnson</span>
              <span className="text-gray-500 text-sm">Design Enthusiast, New York</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialCollection;
