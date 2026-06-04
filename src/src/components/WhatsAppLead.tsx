
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const WhatsAppLead = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const businessNumber = "+14255371584"; // Updated to use US number first

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast({
        title: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    const message = encodeURIComponent(
      "Hi! I'm interested in learning more about your smart window treatments. Could you please provide more information?"
    );
    
    window.open(
      `https://wa.me/${businessNumber}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="container mx-auto my-8 max-w-lg text-center">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-display mb-4">Get Smart Window Treatment Solutions</h2>
        <p className="text-muted-foreground mb-6">
          Enter your phone number to connect with our experts on WhatsApp and learn about our smart automation solutions.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-center"
          />
          
          <Button 
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#22BF5B] text-white font-medium"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Connect on WhatsApp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppLead;
