import React, { useEffect } from "react";
import { useRegion } from "@/hooks/use-region";

const RegionSEO: React.FC = () => {
  const { zone } = useRegion();

  useEffect(() => {
    // Update page title - always Seattle Area
    const getTitle = () => "Urban Blinds | Custom Blinds Seattle Area";

    // Update meta description - always Seattle Area
    const getDescription = () => "Luxury window coverings and custom blinds in Seattle and surrounding areas. Zebra, roller, blackout, honeycomb, drapery. Book a free consultation.";

    // Update page title
    document.title = getTitle();

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', getDescription());
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', getTitle());
    }

    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', getDescription());
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', getTitle());
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', getDescription());
    }
  }, [zone]);

  return null; // This component doesn't render anything
};

export default RegionSEO;