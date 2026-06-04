import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactButtons from "./ContactButtons";
import UrgencyBanner from "./UrgencyBanner";
import { ArrowRight } from "lucide-react";

interface MobileCTASectionProps {
  title?: string;
  description?: string;
  showUrgency?: boolean;
  urgencyType?: "limited-slots" | "customers" | "guarantee";
  showContactButtons?: boolean;
  className?: string;
}

const MobileCTASection = ({
  title = "Ready to Transform Your Space?",
  description = "Get a free consultation and personalized quote today",
  showUrgency = true,
  urgencyType = "limited-slots",
  showContactButtons = true,
  className = ""
}: MobileCTASectionProps) => {
  return (
    <div className={`bg-gradient-to-br from-background to-muted p-6 rounded-xl border border-border ${className}`}>
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {showUrgency && (
          <UrgencyBanner type={urgencyType} />
        )}

        {showContactButtons && (
          <ContactButtons variant="stacked" />
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gradient-to-br from-background to-muted px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>

        <Link to="/quote-calculator" className="block">
          <Button 
            size="lg" 
            className="w-full min-h-[48px] bg-accent hover:bg-accent/90 text-accent-foreground group"
          >
            Get Free Quote
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileCTASection;
