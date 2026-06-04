import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCarouselViewer } from "@/components/ProductImageViewer";
import { getZebraStyles } from "@/data/zebraStyles";
import { getHoneycombStyles } from "@/data/honeycombStyles";
import { getRollerStyles } from "@/data/rollerStyles";
const products = [
  {
    name: "Zebra Blinds",
    desc: "Perfect light control with modern finish.",
    href: "/products/zebra",
    image: "/lovable-uploads/55fde7ac-d4d8-46a3-b82e-2cef865d72f0.png",
  },
  {
    name: "Roller Blinds",
    desc: "Streamlined elegance for any space.",
    href: "/products/roller",
    image: "/lovable-uploads/90a4db7a-e7f8-4afc-93e0-504ba1b20744.png",
  },
  {
    name: "Honeycomb Blinds",
    desc: "Style with energy efficiency.",
    href: "/products/honeycomb",
    image: "/lovable-uploads/0a3633ae-ed89-491c-8d9f-b31c8a204b5a.png",
  },
];

const FeaturedProductsGrid: React.FC = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerKind, setViewerKind] = useState<'zebra' | 'honeycomb' | 'roller'>('zebra');

  const openZebraViewer = (idx = 0) => {
    setViewerKind('zebra');
    setViewerIndex(idx);
    setViewerOpen(true);
  };
  const openHoneycombViewer = (idx = 0) => {
    setViewerKind('honeycomb');
    setViewerIndex(idx);
    setViewerOpen(true);
  };
  const openRollerViewer = (idx = 0) => {
    setViewerKind('roller');
    setViewerIndex(idx);
    setViewerOpen(true);
  };
  const zebraItems = React.useMemo(() => getZebraStyles(), []);
  const honeycombItems = React.useMemo(() => getHoneycombStyles(), []);
  const rollerItems = React.useMemo(() => getRollerStyles(), []);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="heading-lg mb-10 text-center font-display">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((p) => {
            const isZebra = p.name === 'Zebra Blinds';
            const isHoneycomb = p.name === 'Honeycomb Blinds';
            const isRoller = p.name === 'Roller Blinds';
            if (isZebra || isHoneycomb || isRoller) {
              return (
                <div
                  key={p.name}
                  className="group block overflow-hidden border border-border bg-white cursor-pointer"
                  onClick={() => (isZebra ? openZebraViewer(0) : isHoneycomb ? openHoneycombViewer(0) : openRollerViewer(0))}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={`${p.name} - Urban Blinds`} 
                      loading="lazy"
                      fetchPriority="high"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                    <Link 
                      to={p.href}
                      className="inline-block mt-3 px-4 py-2 bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
                    >
                      Catalog
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <Link key={p.name} to={p.href} className="group block overflow-hidden border border-border bg-white">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={`${p.name} - Urban Blinds`} 
                    loading="lazy"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Product Viewer */}
        <ProductCarouselViewer 
          images={viewerKind === 'zebra' ? zebraItems : viewerKind === 'honeycomb' ? honeycombItems : rollerItems}
          open={viewerOpen}
          initialIndex={viewerIndex}
          title={viewerKind === 'zebra' ? 'Zebra Blinds' : viewerKind === 'honeycomb' ? 'Honeycomb Blinds' : 'Roller Blinds'}
          productType={viewerKind}
          onClose={(i) => { setViewerOpen(false); setViewerIndex(i); }}
        />
      </div>
    </section>
  );
};

export default FeaturedProductsGrid;
