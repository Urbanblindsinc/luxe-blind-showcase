
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestQuoteForm from "@/components/RequestQuoteForm";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRegion } from "@/hooks/use-region";
import PhotoSpotlight from "@/components/PhotoSpotlight";

const Quote = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const { phones } = useRegion();

  const contactMethods = [
    {
      icon: <Phone className="w-10 h-10 text-primary" />,
      title: "Phone",
      description: "Give us a call to speak with one of our window treatment specialists.",
      info: (
        <div className="space-y-1">
          {phones.all.map((n) => (
            <div key={n} className="flex items-center justify-center">
              {n}
            </div>
          ))}
        </div>
      ),
      links: phones.all.map((n) => ({ href: `tel:${n.replace(/[^+\\d]/g, "")}`, label: `Call ${n}` })),
      action: "Call now"
    },
    {
      icon: <Mail className="w-10 h-10 text-primary" />,
      title: "Email",
      description: "Send us an email and we'll get back to you within 24 hours.",
      info: "urban.blinds.inc@gmail.com",
      link: "mailto:urban.blinds.inc@gmail.com",
      action: "Send email"
    },
    {
      icon: <MapPin className="w-10 h-10 text-primary" />,
      title: "Visit Our Showroom",
      description: "Come see our products in person at our showroom.",
      info: "By Appointment Only",
      link: "#",
      action: "Contact us",
      external: false
    },
  ];

  const businessHours = [
    { day: "Monday", hours: "9am - 7pm" },
    { day: "Tuesday", hours: "9am - 7pm" },
    { day: "Wednesday", hours: "9am - 7pm" },
    { day: "Thursday", hours: "9am - 7pm" },
    { day: "Friday", hours: "9am - 7pm" },
    { day: "Saturday", hours: "9am - 7pm" },
    { day: "Sunday", hours: "9am - 7pm" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-32 flex-grow">
        {/* Hero Banner */}
        <div className="relative py-20 md:py-28 px-6 bg-secondary overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-secondary to-transparent"></div>
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="heading-lg mb-6">Get Your Free Quote</h1>
              <p className="text-xl text-muted-foreground">
                Tell us about your project and we’ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <RequestQuoteForm />
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-2">Get In Touch</h3>
                <div className="grid grid-cols-1 gap-5">
                  {contactMethods.map((method, index) => (
                    <Card key={index} className="border border-primary/10 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-0">
                        <div className="flex flex-col p-6">
                          <div className="bg-secondary/50 -mx-6 -mt-6 p-6 flex justify-center mb-4">
                            <div className="bg-white rounded-full p-3 shadow-md">
                              {method.icon}
                            </div>
                          </div>
                          <h4 className="font-medium text-lg text-center mb-2">{method.title}</h4>
                          <p className="text-sm text-muted-foreground text-center mb-4">{method.description}</p>
                          <div className="flex flex-col items-center gap-2">
                            <div className="font-medium text-center text-primary">
                              {method.info}
                            </div>
                            {method.links ? (
                              <div className="space-y-2">
                                {method.links.map((link, linkIndex) => (
                                  <a 
                                    key={linkIndex}
                                    href={link.href}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                  >
                                    {link.label}
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <a 
                                href={method.link}
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                target={method.external ? "_blank" : undefined}
                                rel={method.external ? "noopener noreferrer" : undefined}
                              >
                                {method.action}
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Card className="bg-primary text-primary-foreground border-none overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-6">Business Hours</h3>
                  <div className="space-y-3">
                    {businessHours.map((item, index) => (
                      <div key={index} className="flex justify-between items-center pb-2 border-b border-primary-foreground/20 last:border-0">
                        <span className="font-medium">{item.day}</span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <PhotoSpotlight 
        src="/lovable-uploads/67c48797-302c-4f90-aef4-ec7da39719c0.png"
        alt="Bathroom window with privacy zebra blinds – recent project"
        caption="From a recent Urban Blinds project"
      />

      <Footer />
    </div>
  );
};

export default Quote;
