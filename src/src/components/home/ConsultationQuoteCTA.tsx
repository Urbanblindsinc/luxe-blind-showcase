import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/hooks/use-region";

const ConsultationQuoteCTA: React.FC = () => {
  const { phones } = useRegion();
  const telLinks = phones.all.map((n) => ({ raw: n, href: `tel:${n.replace(/[^+\d]/g, "")}` }));

  return (
    <section className="bg-secondary/50 py-10">
      <div className="container mx-auto px-6">
        <div className="bg-white border border-border p-6 md:p-8 shadow-sm text-center">
          <h2 className="heading-md mb-2">Ready to transform your windows?</h2>
          <p className="text-sm text-muted-foreground mb-6">Choose how you’d like to get started.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
              <Link to="/quote-calculator" aria-label="Request a Quote">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/consultation" aria-label="Book an In-Home Consultation">Book In-Home Consultation</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefer to talk? {telLinks.map((t, idx) => (
              <span key={t.href}>
                <a href={t.href} className="underline hover:no-underline">{t.raw}</a>
                {idx < telLinks.length - 1 && <span className="mx-2">•</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsultationQuoteCTA;
