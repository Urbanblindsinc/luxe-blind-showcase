import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);
    const {
      path,
      referrer,
      userAgent,
      ts,
    }: { path?: string; referrer?: string | null; userAgent?: string; ts?: string } =
      (await req.json().catch(() => ({}))) || {};

    const xff = req.headers.get("x-forwarded-for") || "";
    const ip = (xff.split(",")[0] || "").trim() || req.headers.get("cf-connecting-ip") || "unknown";

    // Geo lookup (no key) using ipwho.is
    let geo: any = null;
    if (ip !== "unknown") {
      try {
        const geoRes = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`);
        if (geoRes.ok) {
          geo = await geoRes.json();
        }
      } catch (e) {
        console.log("geo lookup error", e);
      }
    }

    const locParts: string[] = [];
    if (geo?.city) locParts.push(geo.city);
    if (geo?.region) locParts.push(geo.region);
    if (geo?.country_code) locParts.push(geo.country_code);
    const postal = geo?.postal;
    const locationStr = locParts.length ? locParts.join(", ") : "(unknown)";

    const {
      interactionType,
      formData,
    }: { interactionType?: string; formData?: any } = await req.json().catch(() => ({})) || {};

    const subject = `User Interaction Alert: ${interactionType || "Unknown"} - ${locationStr}`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 16px;">User Interaction Alert</h2>
        
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px 0; color: #374151;">Interaction Type</h3>
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1f2937;">${interactionType || "Unknown"}</p>
        </div>

        <div style="margin-bottom: 16px;">
          <h3 style="color: #374151;">Location Information</h3>
          <p><strong>Location:</strong> ${locationStr}</p>
          ${postal ? `<p><strong>Postal Code:</strong> ${postal}</p>` : ""}
          <p><strong>IP Address:</strong> ${ip}</p>
        </div>

        <div style="margin-bottom: 16px;">
          <h3 style="color: #374151;">Visit Details</h3>
          <p><strong>Time:</strong> ${ts || new Date().toISOString()}</p>
          <p><strong>Page:</strong> ${path || "/"}</p>
          <p><strong>Referrer:</strong> ${referrer || "(direct)"}</p>
          <p><strong>User-Agent:</strong> ${userAgent || "(unknown)"}</p>
        </div>

        ${formData ? `
        <div style="margin-bottom: 16px; background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin: 0 0 8px 0;">Form Data</h3>
          <pre style="background: white; padding: 12px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(formData, null, 2)}</pre>
        </div>
        ` : ""}

        <div style="background: #f9fafb; padding: 12px; border-radius: 8px; margin-top: 16px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            This alert was triggered by a user interaction on Urban Blinds website.
          </p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Urban Blinds Alerts <onboarding@resend.dev>",
      to: ["urban.blinds.inc@gmail.com"],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ ok: false, error }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("visit-email function error:", err);
    return new Response(JSON.stringify({ ok: false, message: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
