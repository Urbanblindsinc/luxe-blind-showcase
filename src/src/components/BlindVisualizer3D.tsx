
import React from 'react';

export type CassetteColor = 'black' | 'brown' | 'gray' | 'beige' | 'white';
export type CassetteStyle = 'square' | 'curved';

export const CASSETTE_COLORS: Record<CassetteColor, {
  name: string;
  hex: string;
  front: string;
  top: string;
  side: string;
  hl: string;
  gradMid: string;
}> = {
  black: {
    name: 'Black',
    hex: '#1C1C1C',
    front: '#232323',
    top: '#383838',
    side: '#0E0E0E',
    hl: '#505050',
    gradMid: '#2A2A2A',
  },
  brown: {
    name: 'Brown',
    hex: '#8B6E56',
    front: '#8B6E56',
    top: '#A07C62',
    side: '#6A5040',
    hl: '#C09A7A',
    gradMid: '#967860',
  },
  gray: {
    name: 'Gray',
    hex: '#9E9E9E',
    front: '#9E9E9E',
    top: '#BABABA',
    side: '#757575',
    hl: '#D4D4D4',
    gradMid: '#AAAAAA',
  },
  beige: {
    name: 'Beige',
    hex: '#C0B5A4',
    front: '#C0B5A4',
    top: '#D5CAB8',
    side: '#9E9080',
    hl: '#E5DDD0',
    gradMid: '#CCC0AE',
  },
  white: {
    name: 'White',
    hex: '#F0EFEC',
    front: '#F0EFEC',
    top: '#FFFFFF',
    side: '#C5C5C2',
    hl: '#FFFFFF',
    gradMid: '#F5F4F1',
  },
};

export const CASSETTE_STYLES: Record<CassetteStyle, { name: string; description: string }> = {
  square: { name: 'Square', description: 'Clean, angular profile' },
  curved: { name: 'Curved', description: 'Soft, rounded fascia' },
};

interface BlindVisualizer3DProps {
  cassetteStyle: CassetteStyle;
  color: CassetteColor;
  showFabric: boolean;
}

const BlindVisualizer3D: React.FC<BlindVisualizer3DProps> = ({
  cassetteStyle,
  color,
  showFabric,
}) => {
  const c = CASSETTE_COLORS[color];

  // Canvas
  const W = 400;

  // Front face geometry
  const fx = 40;
  const fw = 268;
  const fr = fx + fw; // = 308

  // 3D depth vector (up and to the right)
  const dx = 34;
  const dy = -19;

  // Cassette
  const cassH = cassetteStyle === 'curved' ? 56 : 50;
  const cassTopY = 72;
  const cassBotY = cassTopY + cassH;

  // Fabric
  const fabricH = showFabric ? 320 : 0;
  const fabricBotY = cassBotY + fabricH;

  // Bottom rail (only when fabric shown)
  const railH = 16;
  const railTopY = fabricBotY;

  // SVG height
  const svgH = showFabric ? fabricBotY + railH + 54 : cassBotY + 52;

  // Chain position (left side of blind)
  const chainX = fx + 28;

  // Helper: polygon points string
  const poly = (pts: [number, number][]) =>
    pts.map(([x, y]) => `${x},${y}`).join(' ');

  // Standard box faces (top parallelogram + right side parallelogram)
  const topPoly = (topY: number) =>
    poly([
      [fx, topY],
      [fr, topY],
      [fr + dx, topY + dy],
      [fx + dx, topY + dy],
    ]);

  const sidePoly = (topY: number, botY: number) =>
    poly([
      [fr, topY],
      [fr + dx, topY + dy],
      [fr + dx, botY + dy],
      [fr, botY],
    ]);

  // Curved cassette paths
  const curveRise = 22;
  const curveFront = [
    `M ${fx},${cassBotY}`,
    `L ${fr},${cassBotY}`,
    `L ${fr},${cassTopY + curveRise}`,
    `Q ${fx + fw / 2},${cassTopY - 6} ${fx},${cassTopY + curveRise}`,
    'Z',
  ].join(' ');

  const curvedTop = [
    `M ${fx + dx},${cassTopY + dy + curveRise}`,
    `Q ${fx + fw / 2 + dx},${cassTopY + dy - 6} ${fr + dx},${cassTopY + dy + curveRise}`,
    `L ${fr},${cassTopY + curveRise}`,
    `Q ${fx + fw / 2},${cassTopY - 6} ${fx},${cassTopY + curveRise}`,
    'Z',
  ].join(' ');

  const curvedSide = [
    `M ${fr},${cassTopY + curveRise}`,
    `L ${fr + dx},${cassTopY + dy + curveRise}`,
    `L ${fr + dx},${cassBotY + dy}`,
    `L ${fr},${cassBotY}`,
    'Z',
  ].join(' ');

  // Chain link elements
  const chainLinks: React.ReactNode[] = [];
  if (showFabric) {
    const lw = 4;
    const lh = 7.5;
    const step = 11;
    let y = cassBotY + 10;
    let i = 0;
    while (y < railTopY - 10) {
      const horiz = i % 2 === 0;
      chainLinks.push(
        <ellipse
          key={i}
          cx={chainX}
          cy={y}
          rx={horiz ? lh : lw}
          ry={horiz ? lw : lh}
          fill="none"
          stroke={c.side}
          strokeWidth="1.5"
        />
      );
      y += step * 0.55;
      i++;
    }
  }

  // Unique gradient IDs per color so multiple instances don't conflict
  const fgId = `blind3d-fg-${color}`;
  const tgId = `blind3d-tg-${color}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${svgH}`}
      width="100%"
      className="select-none"
      style={{ display: 'block', maxHeight: showFabric ? 480 : 200 }}
    >
      <defs>
        {/* Front face: hl → front → side top-to-bottom */}
        <linearGradient id={fgId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.hl} />
          <stop offset="25%" stopColor={c.gradMid} />
          <stop offset="100%" stopColor={c.side} />
        </linearGradient>

        {/* Top face: hl at front edge, top towards back */}
        <linearGradient id={tgId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={c.top} />
          <stop offset="100%" stopColor={c.hl} />
        </linearGradient>

        {/* Fabric: subtle horizontal weave stripe */}
        <pattern id="blind3d-weave" x="0" y="0" width={fw} height="11" patternUnits="userSpaceOnUse">
          <rect width={fw} height="11" fill="#DEDAD4" />
          <rect y="10" width={fw} height="1" fill="rgba(0,0,0,0.05)" />
        </pattern>

        {/* Fabric edge shadow overlay */}
        <linearGradient id="blind3d-fabedge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.14)" />
          <stop offset="5%" stopColor="rgba(0,0,0,0.03)" />
          <stop offset="95%" stopColor="rgba(0,0,0,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>

        {/* Drop shadow for cassette */}
        <filter id="blind3d-shadow" x="-15%" y="-15%" width="145%" height="145%">
          <feDropShadow dx="3" dy="7" stdDeviation="9" floodColor="rgba(0,0,0,0.28)" />
        </filter>

        {/* Softer shadow for rail */}
        <filter id="blind3d-railshadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="rgba(0,0,0,0.18)" />
        </filter>
      </defs>

      {/* ── FABRIC ───────────────────────────────── */}
      {showFabric && (
        <g>
          <rect x={fx} y={cassBotY} width={fw} height={fabricH} fill="url(#blind3d-weave)" />
          <rect x={fx} y={cassBotY} width={fw} height={fabricH} fill="url(#blind3d-fabedge)" />
        </g>
      )}

      {/* ── CHAIN (left side) ─────────────────────── */}
      {showFabric && (
        <g>
          <line
            x1={chainX} y1={cassBotY}
            x2={chainX} y2={railTopY}
            stroke={c.side}
            strokeWidth="1.2"
            opacity="0.35"
          />
          {chainLinks}
        </g>
      )}

      {/* ── BOTTOM RAIL ──────────────────────────── */}
      {showFabric && (
        <g filter="url(#blind3d-railshadow)">
          {/* Top face */}
          <polygon points={topPoly(railTopY)} fill={`url(#${tgId})`} />
          {/* Front face */}
          <rect x={fx} y={railTopY} width={fw} height={railH} fill={`url(#${fgId})`} />
          {/* Side face */}
          <polygon points={sidePoly(railTopY, railTopY + railH)} fill={c.side} />
          {/* Highlight line */}
          <line
            x1={fx} y1={railTopY + 1}
            x2={fr} y2={railTopY + 1}
            stroke={c.hl}
            strokeWidth="0.9"
            opacity="0.55"
          />
        </g>
      )}

      {/* ── CASSETTE ─────────────────────────────── */}
      <g filter="url(#blind3d-shadow)">
        {cassetteStyle === 'square' ? (
          <>
            {/* Top face */}
            <polygon points={topPoly(cassTopY)} fill={`url(#${tgId})`} />
            {/* Front face */}
            <rect x={fx} y={cassTopY} width={fw} height={cassH} fill={`url(#${fgId})`} />
            {/* Right side face */}
            <polygon points={sidePoly(cassTopY, cassBotY)} fill={c.side} />
            {/* Top highlight line */}
            <line x1={fx} y1={cassTopY + 1.5} x2={fr} y2={cassTopY + 1.5}
              stroke={c.hl} strokeWidth="1.4" opacity="0.7" />
            {/* Bottom shadow seam */}
            <line x1={fx} y1={cassBotY - 1} x2={fr} y2={cassBotY - 1}
              stroke="rgba(0,0,0,0.22)" strokeWidth="1" />
          </>
        ) : (
          <>
            {/* Curved top face */}
            <path d={curvedTop} fill={`url(#${tgId})`} />
            {/* Curved front face */}
            <path d={curveFront} fill={`url(#${fgId})`} />
            {/* Curved side face */}
            <path d={curvedSide} fill={c.side} />
            {/* Crest highlight on curve */}
            <path
              d={`M ${fx + 22},${cassTopY + curveRise - 3} Q ${fx + fw / 2},${cassTopY - 9} ${fr - 22},${cassTopY + curveRise - 3}`}
              fill="none"
              stroke={c.hl}
              strokeWidth="2.2"
              opacity="0.52"
            />
            {/* Bottom seam */}
            <line x1={fx} y1={cassBotY - 1} x2={fr} y2={cassBotY - 1}
              stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
          </>
        )}
      </g>
    </svg>
  );
};

export default BlindVisualizer3D;
