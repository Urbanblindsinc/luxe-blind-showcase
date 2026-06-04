import React, { useState } from "react";

type Props = {
  before: string;
  after: string;
  caption: string;
};

const BeforeAfterSlider: React.FC<Props> = ({ before, after, caption }) => {
  const [pos, setPos] = useState(50);
  return (
    <figure className="w-full overflow-hidden border border-border bg-white">
      <div className="relative aspect-[16/10] select-none">
        <img src={after} alt={`${caption} after installation`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={before} alt={`${caption} before installation`} className="w-full h-full object-cover" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute bottom-3 left-3 right-3 appearance-none h-1 bg-border"
          aria-label="Before after slider"
        />
      </div>
      <figcaption className="p-3 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
};

export default BeforeAfterSlider;
