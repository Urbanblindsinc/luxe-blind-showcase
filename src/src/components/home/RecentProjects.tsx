import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const items = [
  {
    src: "/lovable-uploads/b869103e-6569-4a1a-83c5-17b1218ae932.png",
    alt: "Kitchen blinds installation – recent Urban Blinds project",
    caption: "Kitchen Blinds Install",
  },
  {
    src: "/lovable-uploads/67c48797-302c-4f90-aef4-ec7da39719c0.png",
    alt: "Washroom privacy blinds – recent Urban Blinds project",
    caption: "Washroom Privacy Blinds",
  },
  {
    src: "/lovable-uploads/0dd32c30-2a25-4809-9cad-cc18faa90f3c.png",
    alt: "Light filtering blinds by picture window – recent Urban Blinds project",
    caption: "Light Filtering Blinds",
  },
];

const RecentProjects: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<typeof items[number] | null>(null);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-10 text-center">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <figure key={idx} className="overflow-hidden border border-border bg-white">
              <button
                type="button"
                onClick={() => {
                  setActive(item);
                  setOpen(true);
                }}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Enlarge ${item.caption}`}
              >
                <div className="aspect-[16/10]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    fetchPriority={idx < 3 ? "high" : "auto"}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
              <figcaption className="p-4 text-base font-display font-semibold text-center text-foreground">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0">
          {active && (
            <div className="bg-background">
              <img
                src={active.src}
                alt={active.alt ?? "Project image enlarged"}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-3 text-center text-sm text-muted-foreground">{active.caption}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RecentProjects;
