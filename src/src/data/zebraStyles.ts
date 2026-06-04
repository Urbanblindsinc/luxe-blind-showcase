export interface ZebraStyle {
  name: string;
  src: string;
  opacity: "BLACKOUT" | "SEMI-BLACKOUT" | "LIGHT FILTERING";
  code: string;
  description: string;
}

export const zebraStyles: ZebraStyle[] = [
  { name: "Graphite Mist", code: "DAG6000", src: "/lovable-uploads/3f295eeb-70b5-452f-bd3f-55c9263c47e3.png", opacity: "BLACKOUT", description: "Deep graphite tone with 100% light blockage, ensuring restful sleep and total privacy." },
  { name: "Golden Olive", code: "YM05", src: "/lovable-uploads/63e906e2-f7ee-4e3c-8b38-a6c18195460e.png", opacity: "LIGHT FILTERING", description: "Warm golden blend filtering ~65% sunlight, earthy comfort with a naturally lit atmosphere." },
  { name: "Glacier White", code: "YM01", src: "/lovable-uploads/1ffcd81f-74f7-49ab-975f-868fc21f1473.png", opacity: "LIGHT FILTERING", description: "Crisp white blinds filtering ~60% light, brightens interiors while reducing harsh glare." },
  { name: "Espresso Grain", code: "DAG32003", src: "/lovable-uploads/f380c747-fe31-4a98-b334-1bdfdf97e364.png", opacity: "SEMI-BLACKOUT", description: "Rich espresso finish blocking ~85% of light, warmth with soft illumination." },
  { name: "Sandy Breeze", code: "DAG6002", src: "/lovable-uploads/d0b2d576-c8a2-4127-a995-21d5f6f7a517.png", opacity: "BLACKOUT", description: "Warm sandy tones with 100% blackout finish, perfect for cozy, calming retreats." },
  { name: "Morning Dew", code: "DAG6001", src: "/lovable-uploads/f1564e19-100a-42e7-aead-89af967e452b.png", opacity: "BLACKOUT", description: "Soft refreshing hue with 100% light blockage, great for serene bedrooms." },
  { name: "Crystal Snow", code: "YM02", src: "/lovable-uploads/277edf44-a5f0-4623-96f4-977d72784024.png", opacity: "LIGHT FILTERING", description: "Shimmering snow-like tone filtering 65–70% light, adds sparkle while softening daylight." },
  { name: "Amethyst Twilight", code: "YM06", src: "/lovable-uploads/f0d35256-8903-4bea-8b2b-2b69454459ea.png", opacity: "LIGHT FILTERING", description: "Deep amethyst tone filtering ~65% light, calm twilight ambiance with gentle illumination." },
  { name: "Charcoal Black", code: "YM10", src: "/lovable-uploads/16e3f0bc-7c17-4f58-8110-18bfee13c663.png", opacity: "SEMI-BLACKOUT", description: "Sleek, modern tone blocking ~85% light, bold accent with soft daylight balance." },
  { name: "Champagne Cream", code: "DAG8002", src: "/lovable-uploads/1ef316ac-2be2-448e-9bc9-7ac962fa7e5b.png", opacity: "BLACKOUT", description: "Luxurious beige delivering 100% light blockage, elegance with complete privacy." },
  { name: "Skyline Blue", code: "DAG5001", src: "/lovable-uploads/6c05a784-dd5f-4bfe-af19-7a73530b2875.png", opacity: "BLACKOUT", description: "Serene blue with total blackout effect, excellent for tranquil, cool-toned rooms." },
  { name: "Platinum Mist", code: "RRT2107", src: "/lovable-uploads/8c96c18b-6a09-40d2-959f-f3a20ce69e36.png", opacity: "SEMI-BLACKOUT", description: "Sleek metallic sheen with ~80% light reduction, privacy without full darkness." },
  { name: "Ivory Sand", code: "RRT2106", src: "/lovable-uploads/36d7d5ef-f209-45b3-9bcf-4eba8376faca.png", opacity: "SEMI-BLACKOUT", description: "Warm ivory tone filtering 80–85% light, cozy glow with privacy." },
  { name: "Golden Dune", code: "RRT2108", src: "/lovable-uploads/026fe8cb-32b4-4f95-aae1-623406cef04a.png", opacity: "SEMI-BLACKOUT", description: "Natural dune-inspired blinds blocking ~80% of sunlight, warm ambiance with softened brightness." },
  { name: "Espresso Velvet", code: "DAG8004", src: "/lovable-uploads/7dc43fe2-0ca1-47da-b55c-87a5cf621c72.png", opacity: "BLACKOUT", description: "Rich espresso brown providing 100% blackout, luxurious warmth and comfort." },
  { name: "Sand Dunes", code: "DAG32002", src: "/lovable-uploads/c0e97933-5ff8-4519-a906-15bab7e76bb8.png", opacity: "SEMI-BLACKOUT", description: "Sandy textured blinds blocking ~85% light, earthy style with soft diffusion." },
  { name: "Porcelain Veil", code: "DAG32001", src: "/lovable-uploads/9b8b0d3f-41ef-4fc9-a829-bfd630620445.png", opacity: "SEMI-BLACKOUT", description: "Delicate porcelain tone filtering ~80% light, airy design with privacy." },
  { name: "Pewter Stream", code: "YM04", src: "/lovable-uploads/b232704f-5547-4d8c-bdb1-024d5c238c8d.png", opacity: "LIGHT FILTERING", description: "Smooth pewter tone filtering ~65% sunlight, metallic touch with calming brightness." },
  { name: "Onyx Lava", code: "YM03", src: "/lovable-uploads/70031c67-61ce-4109-ba7e-b65dfc569375.png", opacity: "LIGHT FILTERING", description: "Bold onyx tone filtering ~60% sunlight, dramatic finish with softened daylight." },
  { name: "Ivory Lace", code: "DAG32004", src: "/lovable-uploads/19c5273f-ff32-43b8-a86a-9d643814b37d.png", opacity: "SEMI-BLACKOUT", description: "Lace-like ivory texture filtering 80–85% light, elegant design with privacy." },
  { name: "Mint Whisper", code: "DAG5004", src: "/lovable-uploads/a68a5ed6-e597-44d2-b778-b17f3cf1ec9c.png", opacity: "BLACKOUT", description: "Refreshing mint tone with 100% blackout coverage, modern freshness with full privacy." },
  { name: "Amber Dust", code: "DAG4001", src: "/lovable-uploads/e6910978-5d2e-4c18-9d3d-a825e0a4fc72.png", opacity: "LIGHT FILTERING", description: "Warm amber glow filtering ~65% light, radiant ambiance without darkening the space." },
  { name: "Sandstorm", code: "DAG4002", src: "/lovable-uploads/2138fbf1-93bb-4c4a-8959-971864cff1c4.png", opacity: "LIGHT FILTERING", description: "Sandy textured blinds blocking ~70% of daylight, dynamic style with breezy illumination." },
  { name: "Aqua Breeze", code: "DAG4003", src: "/lovable-uploads/7f226971-5bc8-4c32-9a3e-23a8010043b6.png", opacity: "LIGHT FILTERING", description: "Light aqua tone filtering ~65% sunlight, refreshing interiors with soft sea-breeze glow." },
  { name: "Coral Glow", code: "DAG4004", src: "/lovable-uploads/9f18248c-3c59-4018-a322-4d961adb52de.png", opacity: "LIGHT FILTERING", description: "Vibrant coral blinds filtering ~60% light, cheerful and radiant with softened daylight." },
  { name: "Snow Veil", code: "DAG4005", src: "/lovable-uploads/001c2fc7-a2e6-411a-b447-78f10238c5bd.png", opacity: "LIGHT FILTERING", description: "Crisp white veil-like finish filtering ~65% light, bright elegance with privacy." },
  { name: "Buttermilk Satin", code: "DAG4006", src: "/lovable-uploads/3a7dda9c-8f6c-44f6-a0bb-bb4319378ad1.png", opacity: "LIGHT FILTERING", description: "Creamy buttermilk tone filtering 60–70% light, glowing ambiance with soft privacy." },
  { name: "Silk Slate", code: "DAG8003", src: "/lovable-uploads/82f3eb2c-51e5-4e14-a811-e711d5946652.png", opacity: "BLACKOUT", description: "Sleek slate grey with 100% blackout coverage, timeless look and maximum privacy." },
  { name: "Moonlit Silver", code: "DAG8001", src: "/lovable-uploads/3407d015-ec92-4666-a35d-03ad1731e11e.png", opacity: "BLACKOUT", description: "Soft silver tone with total blackout effect, modern elegance and restful comfort." },
  { name: "Frosted Pearl", code: "RRT2105", src: "/lovable-uploads/870385c1-3381-4d4a-87f5-9c95204bcf06.png", opacity: "SEMI-BLACKOUT", description: "Pearlescent frosted blinds filtering ~80% light, refined elegance with softened brightness." },
  { name: "Stoneweave", code: "DAG5002", src: "/lovable-uploads/016f5575-580f-4ffd-bf9c-d7cc88d1736e.png", opacity: "BLACKOUT", description: "Earthy stone-inspired blinds offering 100% blackout, natural depth and complete privacy." },
  { name: "Sage Horizon", code: "DAG5003", src: "/lovable-uploads/c33770e5-baaf-48a0-88cf-94869cf02fe3.png", opacity: "BLACKOUT", description: "Gentle sage green tone with 100% blackout control, calming design with privacy." },
];

export const zebraLabels = [
  "Graphite Mist","Golden Olive","Glacier White","Espresso Grain","Sandy Breeze","Morning Dew","Crystal Snow","Amethyst Twilight","Charcoal Black","Champagne Cream","Skyline Blue","Platinum Mist","Ivory Sand","Golden Dune","Espresso Velvet","Sand Dunes","Porcelain Veil","Pewter Stream","Onyx Lava","Ivory Lace","Mint Whisper","Amber Dust","Sandstorm","Aqua Breeze","Coral Glow","Snow Veil","Buttermilk Satin","Silk Slate","Moonlit Silver","Frosted Pearl","Stoneweave","Sage Horizon"
] as const;

export const getZebraStyles = (): ZebraStyle[] => {
  if (typeof window === 'undefined') return zebraStyles;
  try {
    const raw = localStorage.getItem('zebraNameMap');
    if (!raw) return zebraStyles;
    const map: Record<string, string> = JSON.parse(raw);
    return zebraStyles.map((s) => ({ ...s, name: map[s.src] || s.name }));
  } catch {
    return zebraStyles;
  }
};
