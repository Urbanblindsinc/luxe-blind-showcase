import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const TO_EMAIL = 'urban.blinds.inc@gmail.com'

function escapeHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderHtml(source: string, data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
      const value = String(v)
      const isMultiline = value.includes('\n')
      return `<tr>
        <td style="padding:8px 12px;background:#f7f5f0;border:1px solid #e5e0d5;font-weight:600;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border:1px solid #e5e0d5;white-space:${isMultiline ? 'pre-wrap' : 'normal'};">${escapeHtml(value)}</td>
      </tr>`
    })
    .join('')

  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;background:#ffffff;color:#222;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;">
    <h2 style="margin:0 0 8px;color:#5a4a2e;">New ${escapeHtml(source)}</h2>
    <p style="margin:0 0 16px;color:#666;font-size:13px;">Submitted from urbanblindsinc.com</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
    <p style="margin-top:24px;color:#999;font-size:12px;">— Urban Blinds website</p>
  </div>
</body></html>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

    const raw = await req.json().catch(() => ({}))
    // Accept both flat payloads and { templateData: {...} } shape used by the forms.
    const data: Record<string, unknown> = {
      ...(raw?.templateData && typeof raw.templateData === 'object' ? raw.templateData : {}),
      ...(raw || {}),
    }
    delete data.templateData
    delete data.templateName
    delete data.recipientEmail
    delete data.idempotencyKey

    const source = typeof data.source === 'string' && data.source
      ? data.source as string
      : (typeof raw?.templateName === 'string' ? raw.templateName : 'Website Submission')
    const replyTo = typeof data.email === 'string' ? data.email as string : undefined

    const html = renderHtml(source, data)
    const subject = `Urban Blinds — ${source}${data.name ? ` from ${data.name}` : ''}`

    const payload: Record<string, unknown> = {
      from: 'Urban Blinds <quotes@urbanblindsinc.com>',
      to: [TO_EMAIL],
      subject,
      html,
    }
    if (replyTo) payload.reply_to = replyTo

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify(payload),
    })

    const result = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      console.error('Resend gateway error', resp.status, result)
      return new Response(JSON.stringify({ error: 'send_failed', status: resp.status, detail: result }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, id: (result as any).id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-email-resend error', err)
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})