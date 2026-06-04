
import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/faq/SearchBar";
import FilterChips, { CATEGORIES } from "@/components/faq/FilterChips";
import FAQList from "@/components/faq/FAQList";
import { FAQ_DATA } from "@/data/faqs";
import { Shield, Eye, Brush, Sun, Ruler, Palette } from "lucide-react";
import PhotoSpotlight from "@/components/PhotoSpotlight";

const FAQs = () => {
  // SEO
  useEffect(() => {
    document.title = "FAQs | Urban Blinds – Searchable Help Center";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Find answers fast. Search and filter 50+ FAQs on privacy, safety, cleaning, energy savings, measurements, and smart compatibility.");
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Find answers fast. Search and filter 50+ FAQs on privacy, safety, cleaning, energy savings, measurements, and smart compatibility.";
      document.head.appendChild(m);
    }
    window.scrollTo(0, 0);
  }, []);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  // Debounce search 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const queryTerms = useMemo(() => debouncedQuery.toLowerCase().split(/\s+/).filter(Boolean), [debouncedQuery]);

  const filtered = useMemo(() => {
    const cats = new Set(selectedCats);
    return FAQ_DATA.filter((f) => {
      const inCats = cats.size ? cats.has(f.category) : true;
      if (!inCats) return false;
      if (!queryTerms.length) return true;
      const q = debouncedQuery.toLowerCase();
      const hay = `${f.question} ${f.answer} ${f.tags.join(" ")}`.toLowerCase();
      return queryTerms.every((t) => hay.includes(t));
    });
  }, [selectedCats, debouncedQuery, queryTerms]);

  const toggleCat = (c: string) =>
    setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const icons = {
    "Privacy & Light Control": <Eye className="h-4 w-4" aria-hidden />,
    "Safety": <Shield className="h-4 w-4" aria-hidden />,
    "Maintenance & Durability": <Brush className="h-4 w-4" aria-hidden />,
    "Energy & Comfort": <Sun className="h-4 w-4" aria-hidden />,
    "Measurements & Fit": <Ruler className="h-4 w-4" aria-hidden />,
    "Design & Compatibility": <Palette className="h-4 w-4" aria-hidden />,
  } as const;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="pt-28 flex-grow">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-secondary/50">
          <div className="container mx-auto px-6">
            <h1 className="heading-lg mb-3">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl">Search, filter, and explore answers about privacy, safety, cleaning, energy savings, measurements, and smart compatibility.</p>
          </div>
        </section>

        {/* Search & Filters (sticky on mobile) */}
        <section className="sticky top-[72px] z-20 bg-background border-b">
          <div className="container mx-auto px-6 py-4 space-y-3">
            <SearchBar value={query} onChange={setQuery} onClear={() => setQuery("")} />
            <FilterChips selected={selectedCats} onToggle={toggleCat} icons={icons as any} />
          </div>
        </section>

        {/* Results */}
        <section className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p>
            {selectedCats.length > 0 && (
              <button className="text-sm underline" onClick={() => setSelectedCats([])}>Clear filters</button>
            )}
          </div>
          <FAQList items={filtered} queryTerms={queryTerms} />

          {/* Visual highlight from a recent project */}
          <PhotoSpotlight 
            src="/lovable-uploads/5a32c6a7-918a-47f0-b58a-dc7655cc4943.png"
            alt="Living room with zebra blinds and fireplace – recent Urban Blinds installation"
            caption="From a recent Urban Blinds project"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQs;
