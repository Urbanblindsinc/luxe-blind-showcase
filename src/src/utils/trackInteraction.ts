import { supabase } from "@/integrations/supabase/client";

export const trackInteraction = async (
  interactionType: string,
  formData?: any
) => {
  try {
    await supabase.functions.invoke('visit-email', {
      body: {
        path: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        ts: new Date().toISOString(),
        interactionType,
        formData,
      },
    });
  } catch (err) {
    console.error('Failed to track interaction:', err);
  }
};
