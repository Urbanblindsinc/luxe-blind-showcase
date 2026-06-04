import React from "react";
import { Accordion } from "@/components/ui/accordion";
import FAQItem, { FAQItemData } from "./FAQItem";

interface FAQListProps {
  items: FAQItemData[];
  queryTerms: string[];
}

const FAQList: React.FC<FAQListProps> = ({ items, queryTerms }) => {
  return (
    <Accordion type="multiple" className="space-y-3">
      {items.map((item) => (
        <FAQItem key={item.id} item={item} queryTerms={queryTerms} />)
      )}
    </Accordion>
  );
};

export default FAQList;
