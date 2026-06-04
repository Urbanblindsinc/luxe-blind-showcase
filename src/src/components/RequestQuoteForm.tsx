
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/hooks/use-region";
import { sendEmail } from "@/utils/sendEmail";

const RequestQuoteForm = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { zone } = useRegion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prefilled = {
      name: params.get("name") || "",
      email: params.get("email") || "",
      phone: params.get("phone") || "",
      address: params.get("address") || "",
      subject: params.get("subject") || "",
      message: params.get("message") || "",
    };
    // If message empty, include region hint
    if (!prefilled.message) {
      prefilled.message = `Region: ${zone}`;
    }
    setFormData((prev) => ({ ...prev, ...prefilled }));
  }, [location.search, zone]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Quote form values being submitted:", formData);
    
    try {
      await sendEmail({
        subject: formData.subject || `Quote Request from ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        phone: formData.phone || "—",
        address: formData.address || "—",
        message: formData.message || "—",
      });

      {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        
        // Show success dialog
        navigate("/thank-you", { replace: true });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again or contact us directly at urban.blinds.inc@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-8 md:p-10">
        <h2 className="text-2xl font-display font-medium mb-6">Contact Us</h2>
        <p className="text-muted-foreground mb-8">
          Have questions about our products or services? Send us a message and we'll get back to you as soon as possible.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name <span className="text-destructive">*</span> <span className="text-xs text-muted-foreground">(required)</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  autoComplete="email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-destructive">*</span> <span className="text-xs text-muted-foreground">(required)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  autoComplete="tel"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  autoComplete="street-address"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-2 space-y-4">
            <h3 className="text-lg font-medium">Message Details</h3>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject <span className="text-destructive">*</span> <span className="text-xs text-muted-foreground">(required)</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message <span className="text-destructive">*</span> <span className="text-xs text-muted-foreground">(required)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Please let us know how we can assist you."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring transition-all"
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-start space-x-2 pt-2">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p>
              By submitting this form, you agree to our <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link> and consent to being contacted regarding your inquiry.
            </p>
          </div>
        </form>
      </div>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Sent Successfully!</DialogTitle>
            <DialogDescription>
              Thank you for reaching out to Urban Blinds. One of our representatives will contact you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="bg-green-100 rounded-full p-3">
              <Check className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestQuoteForm;
