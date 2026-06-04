import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  product?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, product }: ContactFormRequest = await req.json();

    const formBody = {
      _subject: `New Contact Form Submission from ${name}`,
      _captcha: "false",
      _template: "table",
      _replyto: email || "",
      name: name || "",
      email: email || "",
      phone: phone || "Not provided",
      product: product || "Not specified",
    };

    const fsRes = await fetch(
      "https://formsubmit.co/ajax/urban.blinds.inc@gmail.com",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formBody),
      }
    );
    const fsJson = await fsRes.json().catch(() => ({}));
    console.log("FormSubmit response:", fsRes.status, fsJson);
    if (!fsRes.ok) {
      throw new Error(`FormSubmit failed: ${fsRes.status} ${JSON.stringify(fsJson)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-form function:", error);
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