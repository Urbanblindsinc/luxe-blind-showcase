import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CartItem {
  id: string;
  productType: 'zebra' | 'roller' | 'honeycomb';
  productName: string;
  width: string;
  height: string;
  casing: 'square' | 'curved';
  wrapped: boolean;
  operation: 'cordless' | 'corded';
  motor: 'none' | 'standard' | 'matter';
  quantity: number;
  style?: string;
  productCode?: string;
}

interface QuoteRequestBody {
  email: string;
  phone: string;
  items: CartItem[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, phone, items }: QuoteRequestBody = await req.json();

    console.log("Received quote request:", { email, phone, itemCount: items.length });

    // Plain-text summary lines (used for the formsubmit form fields)
    const itemsText = items.map((item, i) => {
      const lines = [
        `Blind #${i + 1}: ${item.productName}`,
        item.style ? `  Style: ${item.style}` : "",
        item.productCode ? `  Product Code: ${item.productCode}` : "",
        `  Dimensions: ${item.width}" × ${item.height}"`,
        `  Type: ${item.productType}`,
        `  Casing: ${item.casing}${item.wrapped ? " (wrapped)" : ""}`,
        `  Operation: ${item.operation}`,
        `  Motor: ${item.motor === "none" ? "No Motor" : item.motor}`,
        `  Quantity: ${item.quantity}`,
      ].filter(Boolean);
      return lines.join("\n");
    }).join("\n\n");

    // Generate HTML content (kept for any future email-provider use)
    const itemsHtml = items.map(item => `
      <div style="border: 1px solid #e5e7eb; padding: 16px; margin-bottom: 16px; border-radius: 8px;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937;">${item.productName}</h3>
        ${item.style ? `<p style="margin: 0 0 8px 0; color: #6b7280;">Style: ${item.style}</p>` : ''}
        ${item.productCode ? `<p style="margin: 0 0 8px 0; color: #6b7280; font-weight: bold;">Product Code: ${item.productCode}</p>` : ''}
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 8px;">
          <div><strong>Dimensions:</strong> ${item.width}" × ${item.height}"</div>
          <div><strong>Type:</strong> ${item.productType}</div>
          <div><strong>Casing:</strong> ${item.casing}</div>
          <div><strong>Operation:</strong> ${item.operation}</div>
          <div><strong>Motor:</strong> ${item.motor === 'none' ? 'No Motor' : item.motor}</div>
          <div><strong>Quantity:</strong> ${item.quantity}</div>
        </div>
        ${item.wrapped ? '<div style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; display: inline-block;"><small>Wrapped Installation</small></div>' : ''}
      </div>
    `).join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 16px;">New Quote Request</h1>
        
        <div style="margin-bottom: 24px;">
          <h2 style="color: #374151;">Customer Contact Information</h2>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="color: #374151;">Requested Items (${items.length} total)</h2>
          ${itemsHtml}
        </div>

        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 24px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            This quote request was automatically generated from the website cart.
          </p>
        </div>
      </div>
    `;

    // Server-side submission via FormSubmit (no API key required, no client ad-blocker interference)
    const formBody = {
      _subject: `New Quote Request — ${items.length} item(s)`,
      _captcha: "false",
      _template: "table",
      _replyto: email || "",
      email: email || "Not provided",
      phone: phone || "Not provided",
      itemCount: String(items.length),
      totalUnits: String(items.reduce((s, i) => s + (i.quantity || 1), 0)),
      configuration: itemsText,
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

    return new Response(JSON.stringify({ success: true, provider: "formsubmit", result: fsJson }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-request function:", error);
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