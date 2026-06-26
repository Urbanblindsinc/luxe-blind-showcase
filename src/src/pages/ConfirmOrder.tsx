
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendEmail } from "@/utils/sendEmail";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────
type CassetteStyle = "square" | "curved";
type HardwareColor = "black" | "brown" | "gray" | "beige" | "white";
type BlindType = "roller" | "zebra" | "honeycomb";
type Opacity = "Blackout" | "Semi-Blackout" | "Light Filtering";
type Operation = "Cordless" | "Corded" | "Motorized (Standard)" | "Motorized (Smart)";

interface WindowSelection {
  room: string;
  width: string;
  height: string;
  blindType: BlindType;
  cassetteStyle: CassetteStyle;
  hardwareColor: HardwareColor;
  opacity: Opacity;
  operation: Operation;
  notes: string;
}

// ── Color data ─────────────────────────────────────────────────────────────
const HW_SWATCHES: Record<HardwareColor, { label: string; hex: string }> = {
  black:  { label: "Matte Black",    hex: "#1a1a1a" },
  brown:  { label: "Brushed Bronze", hex: "#8a6a4b" },
  gray:   { label: "Silver Gray",    hex: "#b6b8bb" },
  beige:  { label: "Warm Beige",     hex: "#e1d6c2" },
  white:  { label: "Pure White",     hex: "#f7f7f5" },
};

const GOLD = "#C9A96E";
const SURFACE = "#1C1914";
const BORDER = "rgba(201,169,110,0.15)";
const GOLD_DIM = "rgba(201,169,110,0.12)";
const CREAM = "#F5F0E8";
const MUTED = "#7A7060";

// ── Sub-components ─────────────────────────────────────────────────────────
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        border: `1.5px solid ${active ? GOLD : BORDER}`,
        background: active ? GOLD_DIM : "rgba(255,255,255,0.02)",
        color: active ? GOLD : MUTED,
      }}
    >
      {children}
    </button>
  );
}

function WindowCard({
  index,
  sel,
  onChange,
}: {
  index: number;
  sel: WindowSelection;
  onChange: (s: WindowSelection) => void;
}) {
  const [open, setOpen] = useState(index === 0);
  const u = (k: keyof WindowSelection, v: string) => onChange({ ...sel, [k]: v });

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, background: SURFACE }}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4"
        style={{ borderBottom: open ? `1px solid ${BORDER}` : "none" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: GOLD_DIM, color: GOLD }}>{index + 1}</div>
          <span style={{ color: CREAM }} className="font-medium">
            {sel.room || `Window ${index + 1}`}
            {sel.width && sel.height ? ` · ${sel.width}" × ${sel.height}"` : ""}
          </span>
        </div>
        {open ? <ChevronUp size={16} color={MUTED} /> : <ChevronDown size={16} color={MUTED} />}
      </button>

      {open && (
        <div className="p-5 space-y-5">
          {/* Dimensions (read-only if provided) */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Room", key: "room" as const, placeholder: "e.g. Living Room" },
              { label: "Width (in)", key: "width" as const, placeholder: "36" },
              { label: "Height (in)", key: "height" as const, placeholder: "72" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-1">{f.label}</label>
                <input
                  value={sel[f.key]}
                  onChange={e => u(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${BORDER}`, color: CREAM }}
                />
              </div>
            ))}
          </div>

          {/* Blind type */}
          <div>
            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-2">Blind Type</label>
            <div className="flex flex-wrap gap-2">
              {(["roller", "zebra", "honeycomb"] as BlindType[]).map(t => (
                <Chip key={t} active={sel.blindType === t} onClick={() => u("blindType", t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Chip>
              ))}
            </div>
          </div>

          {/* Cassette style */}
          <div>
            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-2">Cassette Style</label>
            <div className="flex gap-2">
              <Chip active={sel.cassetteStyle === "square"} onClick={() => u("cassetteStyle", "square")}>■ Square</Chip>
              <Chip active={sel.cassetteStyle === "curved"} onClick={() => u("cassetteStyle", "curved")}>⌒ Curved</Chip>
            </div>
          </div>

          {/* Hardware color */}
          <div>
            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-2">
              Hardware Color · Chain & Rail Match
            </label>
            <div className="flex gap-3 flex-wrap">
              {(Object.entries(HW_SWATCHES) as [HardwareColor, { label: string; hex: string }][]).map(([id, c]) => (
                <button
                  key={id}
                  type="button"
                  title={c.label}
                  onClick={() => u("hardwareColor", id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="h-10 w-10 rounded-full transition-all"
                    style={{
                      background: c.hex,
                      border: `3px solid ${sel.hardwareColor === id ? GOLD : "rgba(255,255,255,0.1)"}`,
                      boxShadow: sel.hardwareColor === id ? `0 0 0 2px ${GOLD}44` : "none",
                    }}
                  />
                  <span style={{ color: sel.hardwareColor === id ? GOLD : MUTED, fontSize: "0.6rem" }}>{c.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Opacity */}
          <div>
            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-2">Light Control</label>
            <div className="flex flex-wrap gap-2">
              {(["Light Filtering", "Semi-Blackout", "Blackout"] as Opacity[]).map(o => (
                <Chip key={o} active={sel.opacity === o} onClick={() => u("opacity", o)}>{o}</Chip>
              ))}
            </div>
          </div>

          {/* Operation */}
          <div>
            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-2">Operation</label>
            <div className="flex flex-wrap gap-2">
              {(["Cordless", "Corded", "Motorized (Standard)", "Motorized (Smart)"] as Operation[]).map(o => (
                <Chip key={o} active={sel.operation === o} onClick={() => u("operation", o)}>{o}</Chip>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-1">Notes</label>
            <input
              value={sel.notes}
              onChange={e => u("notes", e.target.value)}
              placeholder="Any special requirements for this window…"
              className="w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${BORDER}`, color: CREAM }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Default window ─────────────────────────────────────────────────────────
const defaultWindow = (room = "", width = "", height = ""): WindowSelection => ({
  room, width, height,
  blindType: "roller",
  cassetteStyle: "square",
  hardwareColor: "white",
  opacity: "Light Filtering",
  operation: "Cordless",
  notes: "",
});

// ── Main page ──────────────────────────────────────────────────────────────
const ConfirmOrder = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const quoteRef  = params.get("ref") || "";
  const custName  = params.get("name") || "";
  const custEmail = params.get("email") || "";
  const windowCount = parseInt(params.get("windows") || "1", 10);

  // Parse pre-filled windows from URL: w1=Room,Width,Height&w2=...
  const initialWindows: WindowSelection[] = Array.from({ length: Math.max(1, Math.min(windowCount, 10)) }, (_, i) => {
    const raw = params.get(`w${i + 1}`) || "";
    const [room = "", width = "", height = ""] = raw.split(",");
    return defaultWindow(room, width, height);
  });

  const [windows, setWindows] = useState<WindowSelection[]>(initialWindows);
  const [name, setName]   = useState(custName);
  const [email, setEmail] = useState(custEmail);
  const [submitting, setSubmitting] = useState(false);

  const updateWindow = (i: number, s: WindowSelection) =>
    setWindows(ws => ws.map((w, idx) => idx === i ? s : w));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) { toast.error("Please enter your name and email."); return; }
    setSubmitting(true);
    try {
      const config = windows.map((w, i) =>
        `Window ${i + 1} — ${w.room || "?"}: ${w.width}"×${w.height}" | ${w.blindType} | ${w.cassetteStyle} cassette | ${HW_SWATCHES[w.hardwareColor].label} | ${w.opacity} | ${w.operation}${w.notes ? ` | Notes: ${w.notes}` : ""}`
      ).join("\n");

      await sendEmail({
        subject: `Order Selections Confirmed — ${name}${quoteRef ? ` (${quoteRef})` : ""}`,
        from_name: name,
        email,
        quote_reference: quoteRef || "—",
        number_of_windows: String(windows.length),
        configuration: config,
      });

      navigate("/thank-you", { replace: true });
    } catch {
      toast.error("Something went wrong. Please try again or call us at 425-537-1584.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "#0C0B09", minHeight: "100vh", color: CREAM }} className="flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            {quoteRef && (
              <p style={{ color: GOLD, fontSize: "0.7rem", letterSpacing: "0.2em" }} className="uppercase mb-2">
                Quote {quoteRef}
              </p>
            )}
            <h1 style={{ fontFamily: "Playfair Display, serif" }} className="text-4xl font-bold mb-2">
              Confirm Your Selections
            </h1>
            <p style={{ color: MUTED }} className="text-sm">
              Choose the style options for each window. We'll finalise your quote and invoice once confirmed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact */}
            <div className="rounded-xl p-5 space-y-3" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <h2 style={{ color: GOLD, fontSize: "0.65rem", letterSpacing: "0.2em" }} className="uppercase font-semibold">Your Details</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Full Name", val: name, set: setName, type: "text" },
                  { label: "Email",     val: email, set: setEmail, type: "email" },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase block mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      value={f.val}
                      onChange={e => f.set(e.target.value)}
                      className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                      style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${BORDER}`, color: CREAM }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Windows */}
            <AnimatePresence>
              {windows.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <WindowCard index={i} sel={w} onChange={s => updateWindow(i, s)} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add window */}
            {windows.length < 10 && (
              <button
                type="button"
                onClick={() => setWindows(ws => [...ws, defaultWindow()])}
                className="w-full rounded-xl py-3 text-sm transition-all"
                style={{ border: `1px dashed ${BORDER}`, color: MUTED }}
              >
                + Add another window
              </button>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl py-4 font-semibold text-sm flex items-center justify-center gap-2"
              style={{
                background: submitting ? GOLD_DIM : `linear-gradient(135deg, ${GOLD}, #E8D5A8)`,
                color: "#0C0B09",
              }}
            >
              <Send size={16} />
              {submitting ? "Sending your selections…" : "Confirm My Selections →"}
            </button>

            <p style={{ color: MUTED }} className="text-xs text-center">
              We'll send you a finalised quote & invoice within 24 hours.
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConfirmOrder;
