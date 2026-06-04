import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const getEndOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0).getTime();
};

const format = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
};

const UrgencyBanner: React.FC = () => {
  const [remaining, setRemaining] = useState(format(getEndOfMonth() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setRemaining(format(getEndOfMonth() - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-secondary py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="uppercase tracking-wide text-sm text-accent mb-1">This Month Only</p>
          <h3 className="heading-md">Free Installation on Orders Over $1,000</h3>
        </div>
        <div className="flex items-center gap-3 font-mono">
          {([['Days', remaining.days], ['Hours', remaining.hours], ['Minutes', remaining.minutes], ['Seconds', remaining.seconds]] as const).map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-semibold text-accent animate-pulse">{String(value).padStart(2, '0')}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
        <Button asChild variant="secondary">
          <Link to="/consultation" aria-label="Book your consultation">Book Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default UrgencyBanner;
