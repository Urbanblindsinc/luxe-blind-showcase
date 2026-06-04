
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/ConsultationForm";
import { Check, Phone, Clock, MapPin } from "lucide-react";
import { useRegion } from "@/hooks/use-region";
import PhotoSpotlight from "@/components/PhotoSpotlight";

const Consultation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      title: "Expert Guidance",
      description: "Get personalized recommendations from our experienced design consultants"
    },
    {
      title: "Free Consultation",
      description: "No cost, no obligation consultation to discuss your window treatment needs"
    },
    {
      title: "Same-Day Quotes",
      description: "Receive detailed pricing and options during your consultation"
    },
    {
      title: "Professional Installation",
      description: "Expert measurement and installation included with your purchase"
    }
  ];

  const { phones, zone } = useRegion();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
        <div className="container-padded">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Free Design Consultation
            </span>
            <h1 className="heading-xl mb-6">Transform Your Windows Today</h1>
            <p className="text-xl text-muted-foreground">
              Schedule your free consultation and get expert advice on the perfect window treatments for your home.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-padded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Column */}
            <div className="lg:order-2">
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-display font-medium mb-2">Book Your Free Consultation</h2>
                  <p className="text-muted-foreground">Our design expert will help you choose the perfect window treatments</p>
                </div>
                <ConsultationForm />
              </div>
            </div>
            
            {/* Information Column */}
            <div className="lg:order-1">
              <div className="sticky top-24">
                <h2 className="heading-md mb-8">Why Choose Urban Blinds?</h2>
                
                <div className="space-y-6 mb-12">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prefer to talk?</p>
                      <div className="space-y-1">
                        {phones.entries.map((p) => (
                          <a key={p.display} href={p.href}
                            className="text-xl font-medium text-primary hover:underline flex items-center gap-2"
                            target={p.isWhatsApp ? "_blank" : undefined} rel={p.isWhatsApp ? "noopener noreferrer" : undefined}>
                            <span>{p.flag}</span>
                            <span>{p.display}</span>
                            {p.isWhatsApp && <span className="text-sm font-normal opacity-70">(WhatsApp)</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Available Hours</h3>
                      <p className="text-muted-foreground">Mon - Sat: 9AM - 7PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Service Areas</h3>
                      <div className="space-y-1">
                        {zone === "SEATTLE" ? (
                          <p className="text-muted-foreground flex items-center">
                            <span className="text-xl mr-2">🇺🇸</span> <span className="text-base font-semibold mr-1">WA:</span> Seattle, Bothell, Bellevue, Redmond, Kirkland, Everett & Surrounding Areas
                          </p>
                        ) : (
                          <p className="text-muted-foreground flex items-center">
                            <span className="text-xl mr-2">🌍</span> <span className="text-base font-semibold mr-1">Service Area:</span> Your Local Area
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PhotoSpotlight 
        src="/lovable-uploads/0dd32c30-2a25-4809-9cad-cc18faa90f3c.png"
        alt="French doors with zebra blinds – recent installation"
        caption="From a recent Urban Blinds project"
      />
      <Footer />
    </main>
  );
};

export default Consultation;
