import { Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactButtonsProps {
  variant?: "stacked" | "inline";
  showEmail?: boolean;
  className?: string;
}

const ContactButtons = ({ 
  variant = "inline", 
  showEmail = false,
  className = ""
}: ContactButtonsProps) => {
  const phoneNumber = "+14255371584"; // Display & Call number
  const whatsappNumber = "16474711057"; // WhatsApp only (hidden)
  const email = "urban.blinds.inc@gmail.com";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your blinds`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const buttonClass = "min-h-[48px] min-w-[48px]";

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col gap-3 w-full ${className}`}>
        <Button
          onClick={handleCall}
          size="lg"
          className={`${buttonClass} bg-primary hover:bg-primary/90 text-primary-foreground justify-start`}
        >
          <Phone className="h-5 w-5 mr-2" />
          Call Us Now
        </Button>
        
        <Button
          onClick={handleWhatsApp}
          size="lg"
          className={`${buttonClass} bg-[#25D366] hover:bg-[#20BA5A] text-white justify-start`}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Chat on WhatsApp
        </Button>

        {showEmail && (
          <Button
            onClick={handleEmail}
            size="lg"
            variant="outline"
            className={`${buttonClass} justify-start`}
          >
            <Mail className="h-5 w-5 mr-2" />
            Email Us
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex gap-3 flex-wrap ${className}`}>
      <Button
        onClick={handleCall}
        size="lg"
        className={`${buttonClass} flex-1 bg-primary hover:bg-primary/90 text-primary-foreground`}
      >
        <Phone className="h-5 w-5 mr-2" />
        Call
      </Button>
      
      <Button
        onClick={handleWhatsApp}
        size="lg"
        className={`${buttonClass} flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white`}
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        WhatsApp
      </Button>
    </div>
  );
};

export default ContactButtons;
