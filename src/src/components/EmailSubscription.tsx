
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EmailSubscriptionProps {
  className?: string;
}

const EmailSubscription = ({ className = "" }: EmailSubscriptionProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const idempotencyKey = `subscribe-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const { error } = await supabase.functions.invoke("send-email-resend", {
        body: {
          templateName: "contact-message",
          recipientEmail: "urban.blinds.inc@gmail.com",
          idempotencyKey,
          templateData: {
            name: "Newsletter Subscriber",
            email,
            phone: "—",
            product: "Newsletter subscription",
          },
        },
      });

      if (error) throw error;

      toast.success("Thank you for subscribing! We'll be in touch.");
      setEmail("");
    } catch (error) {
      console.error("Email subscription error:", error);
      toast.error("There was an error subscribing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-slate-50 to-gray-50 py-16 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display font-medium mb-4 tracking-tight">
            Subscribe to our emails
          </h3>
          <p className="text-muted-foreground mb-8">
            Get the first look at new products, collaborations, events, sales and more
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing communications from us.
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSubscription;
