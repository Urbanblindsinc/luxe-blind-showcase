import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const VisitTracker = () => {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("has_visited");
    
    if (!hasVisited) {
      sessionStorage.setItem("has_visited", "true");
      
      const trackVisit = async () => {
        try {
          await supabase.functions.invoke('visit-email', {
            body: {
              path: window.location.pathname,
              referrer: document.referrer || null,
              userAgent: navigator.userAgent,
              ts: new Date().toISOString(),
              interactionType: "Initial Website Visit",
            },
          });
        } catch (err) {
          console.error('Failed to track visit:', err);
        }
      };

      trackVisit();
    }
  }, []);

  return null;
};

export default VisitTracker;
