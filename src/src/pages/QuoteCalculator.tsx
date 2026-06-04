
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import BlindConfig from "@/components/quote/BlindConfig";
import ContactForm from "@/components/quote/ContactForm";
import { quoteFormSchema, defaultBlind } from "@/types/quote";
import type { BlindFormValues, QuoteFormValues } from "@/types/quote";
import { supabase } from "@/integrations/supabase/client";

import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const QuoteCalculator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blinds, setBlinds] = useState<BlindFormValues[]>([defaultBlind]);
  const [expandedBlind, setExpandedBlind] = useState<number | null>(0);
  const [showActivationAlert, setShowActivationAlert] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isValidPromo, setIsValidPromo] = useState<boolean | null>(null);
  const formSubmitEmail = "urban.blinds.inc@gmail.com";
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validatePromoCode = (code: string) => {
    const currentDate = new Date();
    const startDate = new Date('2025-10-01');
    const endDate = new Date('2025-11-30');
    
    const isDateValid = currentDate >= startDate && currentDate <= endDate;
    const isCodeValid = code.toUpperCase() === "FALLMOTOR30";
    const isValid = isCodeValid && isDateValid;
    
    setIsValidPromo(code.length > 0 ? isValid : null);
    return isValid;
  };

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      blinds: [defaultBlind],
      contact: {
        name: "",
        email: "",
        phone: "",
        address: "",
        preferredContact: "email",
        promoCode: "",
      },
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Submitting quote request:", data);
      
      // Track the form submission
      const { trackInteraction } = await import("@/utils/trackInteraction");
      await trackInteraction("Quote Calculator Form Submission", {
        name: data.contact.name,
        email: data.contact.email,
        phone: data.contact.phone,
        numberOfBlinds: data.blinds.length,
        promoCode: data.contact.promoCode || 'None'
      });
      
      const formattedBlinds = data.blinds.map((blind, index) => `
        Blind #${index + 1}:
        - Type: ${blind.blindType}
        - Dimensions: ${blind.width}" × ${blind.height}"
        - Operation: ${blind.operationType}${blind.motorOption ? ` (Motor: ${blind.motorOption})` : ''}
        - Honeycomb Cell: ${blind.honeycombCell || 'Not applicable'}
        - Opacity: ${blind.opacity || 'Not specified'}
        - Style: ${blind.style || 'Not specified'}
        - Room: ${blind.roomLocation || 'Not specified'}
        - Notes: ${blind.notes || 'None'}
      `).join('\n\n');

      const promoCodeInfo = data.contact.promoCode && validatePromoCode(data.contact.promoCode) 
        ? `\n\nPromo Code Applied: ${data.contact.promoCode.toUpperCase()} (30% OFF MOTORIZED BLINDS - Fall Sale)`
        : '\n\nNo Promo Code Applied';
      
      const idempotencyKey = `calc-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const { error: invokeError } = await supabase.functions.invoke("send-email-resend", {
        body: {
          templateName: "contact-message",
          recipientEmail: "urban.blinds.inc@gmail.com",
          idempotencyKey,
          templateData: {
            source: "Quote Calculator",
            name: data.contact.name,
            email: data.contact.email,
            phone: data.contact.phone || 'Not provided',
            address: data.contact.address || 'Not provided',
            preferredContact: data.contact.preferredContact,
            promoCode: data.contact.promoCode || 'None',
            numberOfBlinds: data.blinds.length.toString(),
            configuration: formattedBlinds + promoCodeInfo,
          },
        },
      });
      
      // Submit to Google Form (non-blocking)
      const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse';
      const googleFormData = new FormData();
      googleFormData.append('entry.NAME_FIELD_ID', data.contact.name);
      googleFormData.append('entry.EMAIL_FIELD_ID', data.contact.email);
      googleFormData.append('entry.PHONE_FIELD_ID', data.contact.phone || 'Not provided');
      googleFormData.append('entry.ADDRESS_FIELD_ID', data.contact.address || 'Not provided');
      googleFormData.append('entry.BLINDS_FIELD_ID', formattedBlinds + promoCodeInfo);
      
      // Submit to Google Form (fire and forget - don't wait for response)
      fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      }).catch(err => console.log('Google Form submission attempted'));
      
      if (!invokeError) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-17008834849/P_IsCLSj9YwZEOWG1Zw',
          });
          console.log('Conversion tracked successfully');
        }
        
        navigate('/thank-you', { replace: true });
        form.reset({
          blinds: [defaultBlind],
          contact: {
            name: "",
            email: "",
            phone: "",
            address: "",
            preferredContact: "email",
            promoCode: "",
          },
        });
        setBlinds([defaultBlind]);
        setExpandedBlind(0);
        setPromoCode("");
        setIsValidPromo(null);
      } else {
        throw invokeError;
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setShowActivationAlert(true);
      toast.error("There was an error submitting your quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBlind = () => {
    if (blinds.length < 25) {
      const newBlinds = [...blinds, defaultBlind];
      setBlinds(newBlinds);
      form.setValue("blinds", newBlinds);
      setExpandedBlind(blinds.length);
    } else {
      toast.error("Maximum of 25 blinds allowed per quote request.");
    }
  };

  const removeBlind = (index: number) => {
    if (blinds.length > 1) {
      const newBlinds = blinds.filter((_, i) => i !== index);
      setBlinds(newBlinds);
      form.setValue("blinds", newBlinds);
      
      if (expandedBlind === index) {
        setExpandedBlind(Math.max(0, index - 1));
      } else if (expandedBlind !== null && expandedBlind > index) {
        setExpandedBlind(expandedBlind - 1);
      }
    } else {
      toast.error("At least one blind is required.");
    }
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setPromoCode(code);
    form.setValue("contact.promoCode", code);
    if (code.length > 0) {
      validatePromoCode(code);
    } else {
      setIsValidPromo(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-3">Request Your Custom Quote</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tell us what you need for your windows. Provide the specifications for each blind,
                and we'll prepare a personalized quote for you.
              </p>
            </div>
            
            {showActivationAlert && (
              <Alert variant="default" className="mb-8 bg-amber-50 border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-800">Important: Check Your Email</AlertTitle>
                <AlertDescription className="text-amber-700">
                  If this is your first form submission, FormSubmit has sent a confirmation email to {formSubmitEmail}. 
                  <strong> You must activate the form by clicking the link in that email</strong> before any submissions will be processed. 
                  Check your spam folder if you don't see it. After activation, future submissions will be sent automatically.
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Your Blinds ({blinds.length})</span>
                      <Button 
                        type="button" 
                        onClick={addBlind} 
                        variant="outline" 
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" /> Add Blind
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Add up to 25 blinds with different specifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {blinds.map((blind, index) => (
                        <BlindConfig
                          key={index}
                          index={index}
                          isExpanded={expandedBlind === index}
                          onToggle={() => setExpandedBlind(expandedBlind === index ? null : index)}
                          onRemove={() => removeBlind(index)}
                          blind={blind}
                        />
                      ))}
                    </div>
                    
                    <Button 
                      type="button" 
                      onClick={addBlind} 
                      variant="outline" 
                      className="w-full mt-4 border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Another Blind
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Contact Information</CardTitle>
                    <CardDescription>
                      Tell us how to reach you with your quote
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm
                      promoCode={promoCode}
                      isValidPromo={isValidPromo}
                      onPromoCodeChange={handlePromoCodeChange}
                    />
                  </CardContent>
                </Card>
                
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="px-8 py-6 text-lg" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : "Request Quote"}
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground max-w-md mx-auto">
                  By submitting this form, you'll receive a custom quote based on your specifications.
                  Our team will contact you within 1-2 business days.
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quote Request Received!</DialogTitle>
            <DialogDescription>
              Thank you for requesting a quote from Urban Blinds. Our team will review your specifications and contact you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default QuoteCalculator;
