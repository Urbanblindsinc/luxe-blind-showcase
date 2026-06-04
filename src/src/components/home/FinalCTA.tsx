import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/hooks/use-region";

const FinalCTA: React.FC = () => {
  const { phones, zone } = useRegion();
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="bg-white border border-border p-8 md:p-10 text-center">
          <h2 className="heading-lg mb-4">Your perfect blinds are just a call away.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
              <Link to="/consultation">Book Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent text-accent">
              <a href={`tel:${phones.primary.replace(/[^+\d]/g, "")}`}>Call Us</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {phones.entries.map((p) => (
              <a key={p.display} href={p.href}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                target={p.isWhatsApp ? "_blank" : undefined} rel={p.isWhatsApp ? "noopener noreferrer" : undefined}>
                <span>{p.flag}</span>
                <span>{p.display}</span>
                {p.isWhatsApp && <span className="opacity-60">(WhatsApp)</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
