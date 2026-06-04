
import { useEffect, useState } from "react";

interface RegionInfo {
  city?: string;
  region?: string;
  country?: string;
}

export type RegionZone = "SEATTLE" | "OTHER";

export interface PhoneEntry {
  display: string;      // human-readable number
  flag: string;         // country flag emoji
  country: string;      // "US" | "CA"
  isWhatsApp: boolean;  // true = wa.me link, false = tel: link
  href: string;         // ready-to-use href
  label: string;        // e.g. "Call US" or "WhatsApp CA"
}

export interface RegionPhones {
  primary: string;        // US number — used by Call Now buttons
  primaryHref: string;    // tel: href for primary
  all: string[];          // backwards compat (display strings)
  entries: PhoneEntry[];  // full info with flags + correct link type
}

const WA_MSG = encodeURIComponent("Hi! I'm interested in your blinds.");

const ALL_PHONES: PhoneEntry[] = [
  {
    display: "+1 425-537-1584",
    flag: "🇺🇸",
    country: "US",
    isWhatsApp: false,
    href: "tel:+14255371584",
    label: "Call US",
  },
  {
    display: "647-471-1057",
    flag: "🇨🇦",
    country: "CA",
    isWhatsApp: true,
    href: `https://wa.me/16474711057?text=${WA_MSG}`,
    label: "WhatsApp CA",
  },
];

const PHONE_MAP: Record<RegionZone, RegionPhones> = {
  SEATTLE: {
    primary: "+1 425-537-1584",
    primaryHref: "tel:+14255371584",
    all: ALL_PHONES.map(p => p.display),
    entries: ALL_PHONES,
  },
  OTHER: {
    primary: "+1 425-537-1584",
    primaryHref: "tel:+14255371584",
    all: ALL_PHONES.map(p => p.display),
    entries: ALL_PHONES,
  },
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
        const region = data?.region as string | undefined;
        const country = data?.country_name as string | undefined;
        setInfo({ city, region, country });

        let z: RegionZone = "OTHER";
        const text = `${city ?? ""} ${region ?? ""} ${country ?? ""}`.toLowerCase();
        if (
          country?.toLowerCase() === "united states" &&
          (text.includes("seattle") || text.includes("washington") ||
            text.includes("bothell") || text.includes("bellevue") ||
            text.includes("redmond") || text.includes("kirkland") ||
            text.includes("everett"))
        ) {
          z = "SEATTLE";
        }
        setZone(z);
      } catch {
        console.warn("useRegion: geolocation failed, defaulting to OTHER");
        setZone("OTHER");
      }
    })();
    return () => { active = false; };
  }, []);

  const phones = PHONE_MAP[zone];
  return { zone, info, phones };
}
