export interface RollerStyle {
  name: string;
  src: string;
  opacity: 'BLACKOUT' | 'SEMI-BLACKOUT' | 'LIGHT FILTERING';
  code: string;
  description: string;
}

export const rollerStyles: RollerStyle[] = [
  { name: "Winter Ice", code: "A821", src: "/lovable-uploads/6e20503f-6b5d-444b-95cf-f231183dec25.png", opacity: "LIGHT FILTERING", description: "Crisp white fabric with delicate texture, filters ~65% light for airy, bright interiors." },
  { name: "Sunlit Pearl", code: "A822", src: "/lovable-uploads/fabe7416-7611-4e4e-9cbf-bbc7efa9548d.png", opacity: "LIGHT FILTERING", description: "Pale yellow with pearlescent sheen, filters 60–70% light for luminous warmth." },
  { name: "Golden Dawn", code: "A823", src: "/lovable-uploads/ea380de7-5e6e-4252-be64-d319134f0a5b.png", opacity: "LIGHT FILTERING", description: "Light gold finish, filters ~65% light, adds sophistication with soft glow." },
  { name: "Silver Cloud", code: "A824", src: "/lovable-uploads/5e4b9b65-b3af-498a-b38c-84ea52b25ad9.png", opacity: "LIGHT FILTERING", description: "Soft silver marbled tone, filters 65–70% light, perfect for modern interiors." },
  { name: "Ocean Frost", code: "A825", src: "/lovable-uploads/e7334a36-6f87-4ba7-bd98-d8b86c03f717.png", opacity: "LIGHT FILTERING", description: "Cool frosted blue, filters ~65% light, evokes calm and tranquility." },
  { name: "Midnight Black", code: "A518", src: "/lovable-uploads/a2ecaaf7-ba88-4e16-8b5c-c9b56b0ea4ea.png", opacity: "BLACKOUT", description: "Deep bold black fabric with 100% light blockage, dramatic privacy for modern settings." },
  { name: "Slate Cool", code: "A516", src: "/lovable-uploads/5e11e48a-07da-4de0-8dde-7db6e6d5d1b9.png", opacity: "BLACKOUT", description: "Cool gray tone, 100% blackout coverage, refined contemporary feel with full privacy." },
  { name: "Mocha Stone", code: "A517", src: "/lovable-uploads/c22ac756-0f3a-4f0b-a3e9-73cd42cdcecc.png", opacity: "BLACKOUT", description: "Rich matte brown providing 100% light blockage, grounded interiors with warmth." },
  { name: "Ocean Sky", code: "A514", src: "/lovable-uploads/5a7b09ca-e779-4e38-a31c-0aeb67ce5458.png", opacity: "BLACKOUT", description: "Vibrant serene blue, 100% blackout finish, ideal for tranquil, restful rooms." },
  { name: "Sand Dune", code: "A513", src: "/lovable-uploads/90863a1b-13c8-4e82-8618-55c24e99ff81.png", opacity: "BLACKOUT", description: "Light beige tone, blocks 100% of sunlight, smooth elegance with maximum privacy." },
  { name: "Mist Green", code: "A801", src: "/lovable-uploads/05e3bf88-e6fc-4ea7-9f1a-1a7dc65b9ad6.png", opacity: "BLACKOUT", description: "Soft green hue offering 100% light control, calming design with complete privacy." },
  { name: "Sandstone Weave", code: "A202", src: "/lovable-uploads/6c7db607-b2f4-42e7-b6db-85fa27b8b1df.png", opacity: "SEMI-BLACKOUT", description: "Light beige woven texture blocking ~80–85% light, warmth with soft daylight diffusion." },
  { name: "Mint Mist", code: "A345", src: "/lovable-uploads/1c0ab47f-3da6-4e0c-9b86-b3ddaf8e5736.png", opacity: "BLACKOUT", description: "Soft mint green tone with 100% blackout, fresh and calming with full privacy." },
  { name: "Cream Linen", code: "A344", src: "/lovable-uploads/6b632a4a-5b79-4e36-af6d-8e9c5aa8d41c.png", opacity: "BLACKOUT", description: "Light cream linen weave with 100% light blockage, timeless sophistication with privacy." },
  { name: "Beige Canvas", code: "A342", src: "/lovable-uploads/bb7b4024-6ca6-4dd8-87b1-a1bbebcb9969.png", opacity: "SEMI-BLACKOUT", description: "Neutral beige canvas weave, blocks ~80% light, sturdy texture with balanced brightness." },
  { name: "Lime Silk", code: "A341", src: "/lovable-uploads/4b82e8f0-d628-4df8-8e30-e0b49e3b8647.png", opacity: "SEMI-BLACKOUT", description: "Soft lime green silk finish blocking 80–85% light, fresh and stylish control." },
  { name: "Powder White", code: "A805", src: "/lovable-uploads/c2b88d63-77a9-4b38-86d4-f7cefd72c2a1.png", opacity: "BLACKOUT", description: "Clean bright white, 100% blackout performance, pure minimalist look with privacy." },
  { name: "Ivory Breeze", code: "A804", src: "/lovable-uploads/bb9f95d2-8c3c-478b-b39b-6d6c56fe7e1c.png", opacity: "BLACKOUT", description: "Soft ivory finish, complete blackout, understated elegance with maximum control." },
  { name: "Cream Whisper", code: "A803", src: "/lovable-uploads/cfd60acc-0c4e-4476-b2bb-d07b6a0b8b13.png", opacity: "BLACKOUT", description: "Subtle cream with 100% blackout, smooth neutral design for restful spaces." },
  { name: "White Luxe", code: "A201", src: "/lovable-uploads/e99f7651-e99b-47bf-8797-fe7d0e7bf6a7.png", opacity: "SEMI-BLACKOUT", description: "Pristine white finish blocking ~80% light, minimalist elegance with soft brightness." },
  { name: "Dove Gray", code: "A203", src: "/lovable-uploads/54096c3c-b6ae-4dc8-9616-a3f40b055ca7.png", opacity: "SEMI-BLACKOUT", description: "Calm gray tone filtering ~80% light, understated luxury with softened daylight." },
  { name: "Slate Mist", code: "A204", src: "/lovable-uploads/4b8094d4-50ce-4a82-a8af-eb8ea71b8fd9.png", opacity: "SEMI-BLACKOUT", description: "Muted gray reducing ~85% light, cool undertone for sleek modern spaces." },
  { name: "Snow Drift", code: "A511", src: "/lovable-uploads/b9db4e5d-5cf6-4aac-9426-b847f9528e9b.png", opacity: "BLACKOUT", description: "Pure white with 100% blackout coverage, airy design with complete privacy." },
  { name: "Silk Gray", code: "A503", src: "/lovable-uploads/d4f87b8b-3e9d-4c0c-88c1-53c5d1db26b8.png", opacity: "SEMI-BLACKOUT", description: "Soft striped gray filtering ~80% light, modern sophistication with balanced brightness." },
  { name: "Cream Classic", code: "A001", src: "/lovable-uploads/d0c4a9f4-24ba-4b3a-8cfa-d5b8c542ff26.png", opacity: "SEMI-BLACKOUT", description: "Rich cream weave filtering ~80% light, refined look with softened illumination." },
  { name: "Woven Linen", code: "A502", src: "/lovable-uploads/a6e2beca-9c23-4b30-b4ee-eb66b6f4c9d3.png", opacity: "SEMI-BLACKOUT", description: "Warm ivory woven texture, blocks 80–85% light, timeless elegance with partial brightness." },
  { name: "Pearl White", code: "A501", src: "/lovable-uploads/4f4bb424-26fc-470c-900e-9a14e7d1d44b.png", opacity: "SEMI-BLACKOUT", description: "Smooth reflective pearl white, reduces ~80% light, sleek luminous finish with privacy." },
  { name: "Lemon Cream", code: "A512", src: "/lovable-uploads/e8ad4381-b2f8-4bdf-ab5b-b6306b2476ad.png", opacity: "BLACKOUT", description: "Soft yellow hue with 100% light blockage, cheerful warmth with total control." },
];

export const rollerLabels: string[] = rollerStyles.map((s) => s.name);

export const getRollerStyles = (): RollerStyle[] => {
  if (typeof window === 'undefined') return rollerStyles;
  try {
    const raw = localStorage.getItem('rollerNameMap');
    if (!raw) return rollerStyles;
    const map: Record<string, string> = JSON.parse(raw);
    return rollerStyles.map((s) => ({ ...s, name: map[s.src] || s.name }));
  } catch {
    return rollerStyles;
  }
};