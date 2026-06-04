import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";
import ChatSuggestions from "./chat/ChatSuggestions";
import { useRegion } from "@/hooks/use-region";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const { zone } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to help you find the perfect window treatments. What can I assist you with today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input.trim());
      setInput("");
    }
  };

  const suggestedQuestions = [
    {
      text: "What are roller blinds?",
      onClick: () => handleSendMessage("What are roller blinds?")
    },
    {
      text: "Get a quote",
      onClick: () => handleSendMessage("I'd like to get a quote")
    },
    {
      text: "Smart options",
      onClick: () => handleSendMessage("Tell me about smart motorized options")
    }
  ];

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("quote")) {
      return "I'd be happy to help you with pricing! Our window treatments are custom-made to fit your specific needs. For an accurate quote, I recommend scheduling a free consultation where we can discuss your requirements in detail. Would you like me to help you book one?";
    }
    
    if (lowerText.includes("roller") || lowerText.includes("blind")) {
      return "Our roller blinds are one of our most popular products! They offer excellent light control, privacy, and come in a wide variety of fabrics and colors. We also offer smart motorized options for added convenience. Would you like to know more about our roller blind collections?";
    }
    
    if (lowerText.includes("zebra") || lowerText.includes("dual")) {
      return "Zebra blinds (also known as dual shades) are perfect for versatile light control! They feature alternating sheer and opaque fabric bands that you can align to filter light beautifully or provide complete privacy. They're very popular for living rooms and bedrooms. Would you like to see our zebra blind options?";
    }
    
    if (lowerText.includes("honeycomb") || lowerText.includes("cellular")) {
      return "Honeycomb (cellular) shades are excellent for energy efficiency! Their unique cellular structure provides superior insulation, helping to keep your home comfortable year-round while reducing energy costs. They're available in single, double, or triple cell options. Would you like to learn more about our honeycomb collection?";
    }
    
    if (lowerText.includes("smart") || lowerText.includes("motorized") || lowerText.includes("automation")) {
      return "Our smart window treatments can be controlled via smartphone app, voice commands (Alexa, Google), or automated schedules! We offer integration with popular smart home systems and our motors are whisper-quiet. Perfect for hard-to-reach windows or creating the ultimate convenience. Would you like to know more about our smart technology options?";
    }
    
    if (lowerText.includes("consultation") || lowerText.includes("appointment") || lowerText.includes("visit")) {
      const serviceArea = zone === "SEATTLE" ? "Seattle, Bothell, Bellevue, Redmond, Kirkland, Everett, and surrounding areas" : "your area";
      return `Absolutely! We offer free in-home consultations where our design experts will assess your space, show you samples, take precise measurements, and provide personalized recommendations. We serve ${serviceArea}. Would you like to schedule your free consultation?`;
    }
    
    if (lowerText.includes("installation") || lowerText.includes("install")) {
      return "All our window treatments come with professional installation included! Our certified installers will ensure perfect mounting and operation. We also provide a satisfaction guarantee on both products and installation. The installation is typically completed within 1-2 hours depending on the number of windows.";
    }
    
    if (lowerText.includes("warranty") || lowerText.includes("guarantee")) {
      return "We stand behind our products with comprehensive warranties! Our window treatments come with manufacturer warranties ranging from 2-10 years depending on the product line. We also offer a 100% satisfaction guarantee - if you're not completely happy, we'll make it right.";
    }
    
    if (lowerText.includes("material") || lowerText.includes("fabric") || lowerText.includes("color")) {
      return "We offer an extensive selection of premium materials and colors! From light-filtering sheers to room-darkening fabrics, natural textures to bold patterns - we have options to match any décor style. During your consultation, we'll bring samples so you can see exactly how they'll look in your space.";
    }
    
    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
      return "Hello! Great to meet you. I'm here to help you discover the perfect window treatments for your home. Are you looking for something specific, or would you like me to tell you about our most popular products?";
    }
    
    if (lowerText.includes("thank")) {
      return "You're very welcome! I'm here whenever you need assistance. Feel free to ask me anything about our window treatments, or if you're ready to take the next step, I can help you schedule a free consultation!";
    }
    
    return "That's a great question! For detailed information about that topic, I'd recommend speaking with one of our design experts who can provide personalized guidance. Would you like to schedule a free consultation, or is there something specific about our window treatments I can help you with right now?";
  };

  return (
    <>
      {/* Chat Button - positioned closer to WhatsApp button */}
      <div className="fixed bottom-6 right-24 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full w-14 h-14 shadow-lg transition-all duration-300 hover:shadow-xl"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-xl border w-80 h-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Urban Blinds Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-6 w-6"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ChatMessages messages={messages} isTyping={isTyping} />
          </div>

          {/* Suggestions */}
          <ChatSuggestions questions={suggestedQuestions} />

          {/* Input */}
          <ChatInput 
            input={input}
            isTyping={isTyping}
            onChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
