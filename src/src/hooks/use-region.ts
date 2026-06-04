import { useEffect, useState } from "react";

interface RegionInfo {
  city?: string;
  region?: string;
  country?: string;
}

export type RegionZone = "SEATTLE" | "OTHER";

export interface RegionPhones {
  primary: string; // for "Call Now" button
  all: string[];   // for listing all numbers
}

const PHONE_MAP: Record<RegionZone, RegionPhones> = {
  SEATTLE: { primary: "+1 425-537-1584", all: ["+1 425-537-1584"] },
  OTHER: { primary: "+1 425-537-1584", all: ["+1 425-537-1584"] },
};

export function useRegion() {
  const [zone, setZone] = useState<RegionZone>("OTHER");
  const [info, setInfo] = useState<RegionInfo>({});

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (!active) return;
        const city = data?.city as string | undefined;
        const region = data?.region as string | undefined; // State/Province
        const country = data?.country_name as string | undefined;
        setInfo({ city, region, country });

        let z: RegionZone = "OTHER";
        const text = `${city ?? ""} ${region ?? ""} ${country ?? ""}`.toLowerCase();
        if (country?.toLowerCase() === "united states" && (text.includes("seattle") || text.includes("washington") || text.includes("bothell") || text.includes("bellevue") || text.includes("redmond") || text.includes("kirkland") || text.includes("everett"))) {
          z = "SEATTLE";
        }
        setZone(z);
      } catch (e) {
        console.warn("useRegion: geolocation failed, defaulting to OTHER");
        setZone("OTHER");
      }
    })();
    return () => { active = false; };
  }, []);

  const phones = PHONE_MAP[zone];
  return { zone, info, phones };
}
