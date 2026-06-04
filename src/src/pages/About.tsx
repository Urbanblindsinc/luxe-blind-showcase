import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import CTA from "@/components/CTA";
import { ArrowRight, Award, Calendar, Clock, Diamond, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoSpotlight from "@/components/PhotoSpotlight";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | Urban Blinds";
  }, []);

  const milestones = [
    { year: "2010", title: "Founded", description: "Urban Blinds was established as a family business with a mission to redefine luxury window treatments throughout Canada and the United States." },
    { year: "2015", title: "Family Expansion", description: "Opened our flagship showroom and expanded our family-run design consultation services nationwide across Canada and the US." },
    { year: "2018", title: "Innovation", description: "Our family craftsmen launched our exclusive smart home integration technology for seamless control, serving both Canadian and US homeowners." },
    { year: "2022", title: "Excellence", description: "Our family business was recognized with the National Design Excellence Award for our custom collections in North America." }
  ];

  const values = [
    { 
      icon: Diamond,
      title: "Uncompromising Quality",
      description: "We source only the finest materials and employ master craftspeople to create window treatments of exceptional quality."
    },
    { 
      icon: Users,
      title: "Personalized Experience",
      description: "Every client receives a bespoke consultation experience tailored to their unique style and functional needs."
    },
    { 
      icon: ShieldCheck,
      title: "Enduring Reliability",
      description: "Our lifetime guarantee reflects our confidence in the durability and performance of our window treatments."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 pt-32">
        {/* Elegant Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <img 
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Luxury interior with custom window treatments"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40"></div>
          </div>
          
          <div className="container-padded relative z-10 py-32">
            <div className="max-w-3xl">
              <div className="w-16 h-[1px] bg-white/80 mb-8"></div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-medium mb-8 text-white leading-tight">
                Artistry Meets <span className="text-primary">Innovation</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mb-12">
                For over a decade, Urban Blinds has set the standard for exquisite window treatments that transform ordinary spaces into extraordinary sanctuaries across Canada and the United States.
              </p>
              <Link 
                to="/consultation" 
                className="inline-flex items-center group px-8 py-4 bg-white text-black hover:bg-primary hover:text-white transition-all duration-300"
              >
                <span className="font-medium">Book a Consultation</span>
                <ArrowRight className="ml-3 w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Our Philosophy */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Urban Blinds craftsmanship" 
                    className="w-full h-[600px] object-cover"
                  />
                </div>
                <div className="absolute top-6 -left-6 w-full h-full border-2 border-primary -z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-2/3 h-1/3 bg-secondary -z-0"></div>
              </div>
              
              <div>
                <div className="w-12 h-[1px] bg-primary mb-6"></div>
                <h2 className="text-4xl md:text-5xl font-display font-medium mb-8">
                  Our Philosophy
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  At Urban Blinds, a proud family-owned business serving clients throughout Canada and the United States, we believe that exceptional window treatments are more than mere accessories—they are foundational elements that define a space's character, comfort, and functionality.
                </p>
                <p className="text-lg text-muted-foreground mb-10">
                  Every product we create reflects our family's unwavering commitment to excellence, from the selection of premium materials to the precision of our craftsmanship and the innovation of our designs.
                </p>
                <div className="p-6 border-l-4 border-primary bg-secondary/30">
                  <p className="text-xl font-display italic">
                    "We don't just create window treatments; we craft experiences that transform how people interact with their spaces every day."
                  </p>
                  <div className="mt-4">
                    <span className="font-medium">The Urban Blinds Family</span>
                    <span className="text-sm text-muted-foreground ml-2">Family-Owned Since 2010</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
              <h2 className="text-4xl font-display font-medium mb-6">The Urban Blinds Ethos</h2>
              <p className="text-lg text-muted-foreground">
                Our core values guide every decision we make, every product we create, and every interaction we have with our clients throughout North America.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <PhotoSpotlight 
          src="/lovable-uploads/fa805304-64ec-439c-ae19-b2bb68294dd2.png"
          alt="Bedroom with night-mode zebra blinds – recent Urban Blinds project"
          caption="From a recent Urban Blinds project"
        />
        
        {/* Company History Timeline */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="w-12 h-[1px] bg-primary mx-auto mb-6"></div>
              <h2 className="text-4xl font-display font-medium mb-6">Our Family Journey</h2>
              <p className="text-lg text-muted-foreground">
                From a small family workshop to an industry-leading name in luxury window treatments across Canada and the United States.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 transform md:translate-x-[-0.5px]"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-white border-4 border-primary rounded-full transform translate-x-[-14px] md:translate-x-[-16px]"></div>
                    
                    <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                      <span className="text-3xl font-display text-primary font-medium">{milestone.year}</span>
                      <h3 className="text-xl font-medium mt-2 mb-3">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                    
                    <div className={index % 2 === 0 ? 'md:order-2' : ''}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Google Reviews Section */}
        <GoogleReviews />
        
        {/* CTA Section */}
        <CTA 
          title="Experience the Urban Blinds Difference"
          subtitle="Schedule a complimentary consultation with our family of design experts and discover how our luxury window treatments can transform your space."
          buttonText="Book a Consultation"
          buttonLink="/consultation"
          image="https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
