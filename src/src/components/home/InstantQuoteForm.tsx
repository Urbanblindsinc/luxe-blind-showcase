import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegion } from "@/hooks/use-region";

const products = [
  { value: "zebra", label: "Zebra Blinds" },
  { value: "roller", label: "Roller Shades" },
  { value: "blackout", label: "Blackout Blinds" },
  { value: "honeycomb", label: "Honeycomb Shades" },
  { value: "drapery", label: "Drapery" },
];

const InstantQuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const { zone, phones } = useRegion();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    product: "zebra",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Instant Quote – ${products.find(p => p.value === form.product)?.label || "Window Coverings"}`;
    const message = `I'm interested in ${products.find(p => p.value === form.product)?.label} in ${form.city}.\nRegion: ${zone}.`;
    const params = new URLSearchParams({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.city,
      subject,
      message,
    }).toString();
    navigate(`/quote-calculator?${params}`);
  };

  return (
    <section className="bg-secondary/50 py-10">
      <div className="container mx-auto px-6">
        <div className="bg-white border border-border p-6 md:p-8 shadow-sm">
          <h2 className="heading-md mb-2">Get Your 60‑Second Quote</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Prefer to talk? Call {phones.primary}
          </p>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="md:col-span-1"
            />
            <Input
              type="tel"
              required
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="md:col-span-1"
            />
            <Input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="md:col-span-1"
            />
            <Input
              placeholder="City"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="md:col-span-1"
            />
            <div className="md:col-span-1">
              <Select value={form.product} onValueChange={(v) => setForm({ ...form, product: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Product interest" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-5 flex justify-end">
              <Button type="submit" size="lg" className="bg-primary text-primary-foreground">
                Get My Quote
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InstantQuoteForm;
