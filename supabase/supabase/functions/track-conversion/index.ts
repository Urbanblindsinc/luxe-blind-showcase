import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConversionData {
  event_type: string;
  page_url?: string;
  user_agent?: string;
  timestamp?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { event_type, page_url, user_agent }: ConversionData = await req.json();
    
    // Log the conversion for tracking purposes
    console.log("Conversion tracked:", {
      event_type,
      page_url,
      user_agent,
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") || "unknown"
    });

    // You can add additional tracking logic here, such as:
    // - Sending data to Google Analytics 4
    // - Sending conversion data to Google Ads
    // - Storing conversion data in database for analytics

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Conversion tracked successfully",
        timestamp: new Date().toISOString()
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in track-conversion function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);