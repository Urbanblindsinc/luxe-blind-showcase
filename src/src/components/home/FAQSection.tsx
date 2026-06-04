import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "How long does installation take?",
    answer: "Most installations take 1-3 hours depending on the number of windows. Our professional team ensures quick, clean installation with minimal disruption to your day."
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We provide free in-home consultations where we measure your windows, discuss your needs, and provide detailed quotes with no obligation."
  },
  {
    question: "What's included in the warranty?",
    answer: "All our blinds come with a comprehensive warranty covering materials and workmanship. Specific terms vary by product - we'll explain everything during your consultation."
  },
  {
    question: "Can you install on difficult windows?",
    answer: "Absolutely! Our experienced team handles specialty windows including bay windows, skylights, and oddly-shaped openings. We'll find the perfect solution for any window."
  },
  {
    question: "How do I clean and maintain my blinds?",
    answer: "Most of our blinds require minimal maintenance. We provide detailed care instructions and tips to keep your window treatments looking new for years."
  },
  {
    question: "Do you offer motorized options?",
    answer: "Yes! We offer motorized blinds with remote control and smart home integration for ultimate convenience and modern living."
  }
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-10 text-center font-display">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 bg-white border border-border hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-primary transition-transform",
                    openItems.includes(index) && "rotate-180"
                  )}
                />
              </button>
              {openItems.includes(index) && (
                <div className="p-6 bg-white border-l border-r border-b border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">Have more questions?</p>
          <a 
            href="#contact-us"
            className="inline-block px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;