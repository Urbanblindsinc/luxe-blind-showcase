import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "done" | "submitting" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      setMessage("Missing unsubscribe token.");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setState("invalid");
          setMessage(data?.error || "Invalid or expired link.");
          return;
        }
        if (data?.alreadyUnsubscribed || data?.already_unsubscribed) {
          setState("already");
          if (data?.email) setEmail(data.email);
          return;
        }
        if (data?.email) setEmail(data.email);
        setState("valid");
      } catch (e: any) {
        setState("error");
        setMessage(e?.message || "Network error.");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      setState("done");
      if ((data as any)?.email) setEmail((data as any).email);
    } catch (e: any) {
      setState("error");
      setMessage(e?.message || "Could not complete unsubscribe.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-display font-semibold">Urban Blinds — Unsubscribe</h1>

        {state === "loading" && <p className="text-muted-foreground">Checking your link…</p>}

        {state === "valid" && (
          <>
            <p>Click below to unsubscribe{email ? ` ${email}` : ""} from Urban Blinds emails.</p>
            <Button onClick={confirm} size="lg">Confirm Unsubscribe</Button>
          </>
        )}

        {state === "submitting" && <p className="text-muted-foreground">Processing…</p>}

        {state === "done" && (
          <p className="text-foreground">
            You've been unsubscribed{email ? ` (${email})` : ""}. You will no longer receive these emails.
          </p>
        )}

        {state === "already" && (
          <p className="text-muted-foreground">
            {email ? `${email} is already unsubscribed.` : "This address is already unsubscribed."}
          </p>
        )}

        {(state === "invalid" || state === "error") && (
          <p className="text-destructive">{message || "Something went wrong."}</p>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;