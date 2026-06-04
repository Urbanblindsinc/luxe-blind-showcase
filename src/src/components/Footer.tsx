
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Globe } from "lucide-react";
import { useRegion } from "@/hooks/use-region";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { phones } = useRegion();

  const footerLinks = [
    {
      title: "Products",
      links: [
        { label: "Roller Blinds", href: "/products/roller" },
        { label: "Zebra Blinds", href: "/products/zebra" },
        { label: "Honeycomb Blinds", href: "/products/honeycomb" },
        { label: "View All", href: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about-us" },
        { label: "Why Choose Us", href: "#why-choose-us" },
        { label: "Contact Us", href: "#contact-us" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQs", href: "#faq" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Fall Sale", href: "/fall-sale" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-padded">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block text-2xl font-display font-bold mb-6">
              Urban Blinds
            </Link>
            <p className="text-primary-foreground/80 mb-8 max-w-md">
              Luxury window treatments meticulously crafted with premium materials and attention to detail for the most discerning clients.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80 text-sm">Call Us</p>
                  <div className="space-y-1">
                    <div className="space-y-1">
                      {phones.entries.map((p) => (
                        <a key={p.display} href={p.href} className="hover:underline flex items-center gap-1.5"
                          target={p.isWhatsApp ? "_blank" : undefined} rel={p.isWhatsApp ? "noopener noreferrer" : undefined}>
                          <span>{p.flag}</span>
                          <span>{p.display}</span>
                          {p.isWhatsApp && <span className="text-xs opacity-70">(WhatsApp)</span>}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80 text-sm">Email</p>
                  <a href="mailto:urban.blinds.inc@gmail.com" className="hover:underline break-words">urban.blinds.inc@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80 text-sm">Showroom</p>
                  <p className="hover:underline">By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-primary-foreground/20 my-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-foreground/70 text-sm mb-4 md:mb-0">
            © {currentYear} Urban Blinds. All rights reserved. | <a href="https://urbanblindsinc.com" className="hover:underline" target="_blank" rel="noopener noreferrer">urbanblindsinc.com</a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://www.instagram.com/urbanblinds_inc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.facebook.com/people/Urban-Blinds/61563059780368/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://g.co/kgs/tE25xar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Google"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
