import { Clock, Users, CheckCircle } from "lucide-react";

interface UrgencyBannerProps {
  type: "limited-slots" | "customers" | "guarantee";
  className?: string;
}

const UrgencyBanner = ({ type, className = "" }: UrgencyBannerProps) => {
  const bannerContent = {
    "limited-slots": {
      icon: <Clock className="h-5 w-5" />,
      text: "Limited Slots This Week - Book Your Free Consultation Now!",
      bgClass: "bg-orange-50 border-orange-200 text-orange-900"
    },
    "customers": {
      icon: <Users className="h-5 w-5" />,
      text: "Join 500+ Happy Customers - Transform Your Space Today",
      bgClass: "bg-blue-50 border-blue-200 text-blue-900"
    },
    "guarantee": {
      icon: <CheckCircle className="h-5 w-5" />,
      text: "24-Hour Response Guarantee - We're Here to Help",
      bgClass: "bg-green-50 border-green-200 text-green-900"
    }
  };

  const content = bannerContent[type];

  return (
    <div className={`${content.bgClass} border rounded-lg p-4 flex items-center gap-3 animate-fade-in ${className}`}>
      <div className="flex-shrink-0">
        {content.icon}
      </div>
      <p className="text-sm font-medium leading-tight">
        {content.text}
      </p>
    </div>
  );
};

export default UrgencyBanner;
