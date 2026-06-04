export interface HoneycombStyle {
  name: string;
  src: string;
  cellSize?: '25mm' | '38mm';
  opacity?: 'BLACKOUT' | 'SEMI-BLACKOUT' | 'LIGHT FILTERING';
  code: string;
  description: string;
}

export const honeycombStyles: HoneycombStyle[] = [
  // 25mm Cell Size (Compact & Versatile)
  { name: "Graphite Gray", code: "2509", src: "/lovable-uploads/0e51b469-5e5d-40e1-a517-45d3ab4077fc.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Deep, sleek gray offering 100% blackout for restful privacy. 25mm cells: slim design for smaller/medium windows, modern minimal appeal." },
  { name: "Caramel Tan", code: "2503", src: "/lovable-uploads/5c934163-7cb0-4d63-8651-9717938e4319.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Rich tan with ~65% light filtration, adding cozy elegance. 25mm cells: softer diffusion of light, perfect for living areas." },
  { name: "Golden Wheat", code: "2502", src: "/lovable-uploads/ca125c75-82ac-46da-91a7-e7950cd9c72f.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Light golden beige filtering 60–70% light, warm sunny tones. 25mm cells: slim style ideal for everyday use." },
  { name: "Sunlit Cream", code: "2501", src: "/lovable-uploads/5ab0433d-ca8d-4685-b77a-abc41598d810.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Soft cream with ~65% filtration, bright yet warm. 25mm cells: clean aesthetic for kitchens and bedrooms." },
  { name: "Royal Teal", code: "2506", src: "/lovable-uploads/895779fd-909a-431f-b806-633c71cdb10a.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Rich teal tone with ~70% light control, sophisticated finish. 25mm cells: stylish accent for statement windows." },
  { name: "Pearl White", code: "2537", src: "/lovable-uploads/bdc7db76-9949-4b61-9dc7-d9ca0e031096.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Crisp reflective white filtering 60–70% light, luminous ambiance. 25mm cells: sleek, airy option for modern interiors." },
  { name: "Pistachio Mist", code: "2508", src: "/lovable-uploads/eb35207d-52a1-4adf-8f86-c36e5747b7ac.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Subtle pistachio hue, filters 65% light for fresh elegance. 25mm cells: compact and clean for bright spaces." },
  { name: "Rosewood", code: "2507", src: "/lovable-uploads/7c81457b-d96e-4a51-93c7-3fdbe50f29a9.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Muted pink tone, 60–70% light filtration for rustic charm. 25mm cells: perfect for color accents on smaller frames." },
  { name: "Mint Frost", code: "2504", src: "/lovable-uploads/e1aa140f-aa9e-40b1-aee3-edf242fbe7eb.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Refreshing mint tone, ~65% filtration, breezy and cool. 25mm cells: neat fit for compact windows." },
  { name: "Sky Blue", code: "2505", src: "/lovable-uploads/3ddbf10a-52b9-4323-9267-b872005fe2f1.png", cellSize: '25mm', opacity: 'LIGHT FILTERING', description: "Airy blue fabric, filters 60–70% light, sky-like brightness. 25mm cells: slim cells enhance crisp and clean looks." },
  { name: "Golden Sand", code: "2511", src: "/lovable-uploads/879e4eda-90e2-4d02-aefd-c373fdf07fa7.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Warm golden tone with 100% blackout, luxurious finish. 25mm cells: stylish coverage for functional privacy." },
  { name: "Mist Blue", code: "2524", src: "/lovable-uploads/e389b667-6d48-40a5-a243-8e2f5a689cf4.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Subtle blue finish with 100% light control, coastal calm. 25mm cells: slim blackout coverage for elegance." },
  { name: "Forest Moss", code: "2517", src: "/lovable-uploads/b16fd859-e7fa-42f7-aacf-9ab30a6da697.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Muted green texture with total blackout privacy. 25mm cells: earthy tone, slim style for calm interiors." },
  { name: "Ash Gray", code: "2516", src: "/lovable-uploads/429ffadc-fb6c-48c3-8535-9eec43a3dcaf.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Cool steel-gray with 100% blackout function. 25mm cells: understated look, compact insulation." },
  { name: "Earthy Brown", code: "2515", src: "/lovable-uploads/3cc5c5dd-5817-406b-b14d-be59cb1e81f0.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Rich earthy brown, 100% blackout coverage, rustic appeal. 25mm cells: warm tone, compact depth." },
  { name: "Blush Velvet", code: "2514", src: "/lovable-uploads/5bcc3a9f-f38a-42be-b024-973fe5801394.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Soft blush pink with total blackout, cozy yet chic. 25mm cells: slim chic option for bedrooms." },
  { name: "Silk Gray", code: "2519", src: "/lovable-uploads/7b942002-8dc3-41dc-89e7-d557b973af85.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Cool matte gray with 100% blackout, sleek finish. 25mm cells: modern choice for small/medium windows." },
  { name: "Champagne Gold", code: "2518", src: "/lovable-uploads/8e3cc396-3bbe-4304-9d58-36bef26827b8.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Elegant golden shimmer with total blackout. 25mm cells: compact luxury for functional use." },
  { name: "Cerulean Blue", code: "2513", src: "/lovable-uploads/f271b014-5d7a-48b7-b7f5-43ae529248f3.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Vibrant blue tone with 100% blackout. 25mm cells: slim dramatic accent for modern interiors." },
  { name: "Emerald Green", code: "2512", src: "/lovable-uploads/f906c6a4-309f-4588-9cad-dbf84167a016.png", cellSize: '25mm', opacity: 'BLACKOUT', description: "Vivid green tone with total blackout control. 25mm cells: striking color with compact light management." },
  
  // 38mm Cell Size (Large & Insulating)
  { name: "Bronzed Oak", code: "3815", src: "/lovable-uploads/297e1551-3c60-4cf0-ba8d-fd044a75f742.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Warm brown with bronze undertones, blocks ~85% light. 38mm cells: excellent insulation for big rustic windows." },
  { name: "Velvet Ebony", code: "3828", src: "/lovable-uploads/f6d98330-f02b-4610-b2b3-01367950f1aa.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Deep black with velvety finish, 80–85% light control. 38mm cells: bold impact, large-window privacy." },
  { name: "Subtle Sage", code: "3827", src: "/lovable-uploads/c6746181-1cb3-4c96-a68b-c437cd75cc92.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Soft sage green filtering ~85% light, natural simplicity. 38mm cells: earthy warmth, insulating larger rooms." },
  { name: "Silver Glow", code: "3817", src: "/lovable-uploads/f82ed974-af8d-4ab8-987b-c364f0546be6.png", cellSize: '38mm', opacity: 'BLACKOUT', description: "Reflective silver tone with 100% blackout. 38mm cells: metallic elegance, energy efficiency." },
  { name: "Ivory Charm", code: "3812", src: "/lovable-uploads/0871b5cb-e84c-483e-9209-123435ea9a93.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Soft ivory weave blocking ~85% light. 38mm cells: understated elegance, great for large frames." },
  { name: "Iron Gray", code: "3815", src: "/lovable-uploads/63788017-ca2a-41f3-9bd7-9169810d4929.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Cool metallic gray filtering 80–85% light. 38mm cells: sleek industrial finish for wide windows." },
  { name: "Golden Taupe", code: "3826", src: "/lovable-uploads/31eb7ae1-e2e2-49b0-999c-93c76517cef1.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Taupe with golden highlights, blocks ~85% light. 38mm cells: luxurious coziness on larger window spans." },
  { name: "Frosted Mist", code: "3816", src: "/lovable-uploads/429b3901-f562-4cb2-bbf2-8b090a03fa85.png", cellSize: '38mm', opacity: 'LIGHT FILTERING', description: "Soft white texture, filters 60–70% light. 38mm cells: airy brightness for spacious interiors." },
  { name: "Soft Cream", code: "3825", src: "/lovable-uploads/f9f423d3-2996-4a12-9f43-c8da1d541135.png", cellSize: '38mm', opacity: 'SEMI-BLACKOUT', description: "Warm cream tone, 80–85% light reduction. 38mm cells: timeless warmth with strong insulation." },
  { name: "Deep Navy", code: "3822", src: "/lovable-uploads/67abc2a8-c35d-4d3c-be52-207e51ad9004.png", cellSize: '38mm', opacity: 'BLACKOUT', description: "Bold navy blue with 100% blackout coverage. 38mm cells: dramatic, insulating statement for large windows." },
  { name: "Cloud State", code: "3827", src: "/lovable-uploads/37c3ce1c-7ab8-4199-82c8-113487633ffb.png", cellSize: '38mm', opacity: 'LIGHT FILTERING', description: "Gray with blue undertone, filters 65% of light. 38mm cells: airy feel, works beautifully on wide windows." },
  { name: "Ivory Glow", code: "3825", src: "/lovable-uploads/8ebc807c-3d2c-4afd-a31b-b56ce7d8ec5d.png", cellSize: '38mm', opacity: 'LIGHT FILTERING', description: "Soft ivory tone filtering ~65% light. 38mm cells: gentle diffusion, elegant for big interiors." },
];

export const honeycombLabels: string[] = honeycombStyles.map((s) => s.name);

export const getHoneycombStyles = (): HoneycombStyle[] => {
  if (typeof window === 'undefined') return honeycombStyles;
  try {
    const raw = localStorage.getItem('honeycombNameMap');
    if (!raw) return honeycombStyles;
    const map: Record<string, string> = JSON.parse(raw);
    return honeycombStyles.map((s) => ({ ...s, name: map[s.src] || s.name }));
  } catch {
    return honeycombStyles;
  }
};