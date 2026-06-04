import { Phone, MessageCircle, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MobileBottomCTA = () => {
  const phoneNumber = "+14255371584"; // Display & Call number
  const whatsappNumber = "16474711057"; // WhatsApp only (hidden)

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your blinds`;
  };

  return (
    <div className="hidden">
      <div className="grid grid-cols-3 gap-2 p-3">
        {/* Call Button */}
        <Button
          onClick={handleCall}
          className="flex flex-col items-center justify-center gap-1 h-auto py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-semibold">Call Now</span>
        </Button>

        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center gap-1 h-auto py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white"
          aria-label="Message on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </Button>

        {/* Get Quote Button */}
        <Link to="/quote-calculator">
          <Button
            className="w-full flex flex-col items-center justify-center gap-1 h-auto py-3 bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label="Get free quote"
          >
            <Calculator className="h-5 w-5" />
            <span className="text-xs font-semibold">Free Quote</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomCTA;
