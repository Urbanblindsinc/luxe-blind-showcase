import React, { useState } from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export interface FAQItemData {
  id: number;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, terms: string[]): React.ReactNode {
  const filtered = terms.map(t => t.trim()).filter(Boolean);
  if (!filtered.length) return text;
  const pattern = filtered.map(escapeRegExp).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <mark key={i} className="bg-primary/15 text-foreground px-0.5 rounded-sm">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </>
  );
}

interface Props {
  item: FAQItemData;
  queryTerms: string[];
}

const FAQItem: React.FC<Props> = ({ item, queryTerms }) => {
  const [open, setOpen] = useState(false);
  return (
    <AccordionItem value={`faq-${item.id}`} className="border rounded-md">
      <AccordionTrigger className="px-4 py-2 text-left" onClick={() => setOpen(!open)}>
        <div className="text-left">
          <p className="font-medium">{highlight(item.question, queryTerms)}</p>
          <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        {open && (
          <div className="text-sm leading-relaxed">
            {highlight(item.answer, queryTerms)}
            <div className="mt-3 text-xs text-muted-foreground">
              Tags: {item.tags.join(", ")}
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
