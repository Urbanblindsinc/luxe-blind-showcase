
// Web3Forms — free email service, no backend required
// Get a free access key at https://web3forms.com (enter your email, instant key)
// Add it to Vercel env vars as: VITE_WEB3FORMS_KEY=your_key_here

const ACCESS_KEY = (import.meta as any).env?.VITE_WEB3FORMS_KEY || "";

export interface EmailPayload {
  subject: string;
  from_name?: string;
  email?: string;
  [key: string]: string | number | undefined;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  if (!ACCESS_KEY) {
    console.warn("VITE_WEB3FORMS_KEY not set — email not sent");
    return;
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      botcheck: "",           // honeypot
      redirect: false,
      ...payload,
    }),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Email send failed");
}
