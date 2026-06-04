
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Check, ChevronLeft, ChevronRight,
  Ruler, Layers, Palette, Settings2, Zap,
  ShoppingBag, Send, Sparkles, Plus, Minus, Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { sendEmail } from "@/utils/sendEmail";
import BlindVisualizer3D, { type CassetteColor } from "@/components/BlindVisualizer3D";

// Three.js preview — disabled pending bundler fix; using luxury CSS scene
// const BlindPreview3D = lazy(() => import("@/components/BlindPreview3D"));

// ─── Types ────────────────────────────────────────────────────────────────────
type ProductId = "roller" | "zebra" | "honeycomb";
type CassetteShape = "square" | "round";
type HardwareColor = "black" | "bronze" | "gray" | "beige" | "white";
type Operation = "cordless" | "corded" | "motor-standard" | "motor-smart";

const HW_TO_COLOR: Record<HardwareColor, CassetteColor> = {
  black: "black", bronze: "brown", gray: "gray", beige: "beige", white: "white",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: { id: ProductId; name: string; tagline: string; icon: string }[] = [
  { id: "roller",    name: "Roller Blinds",    tagline: "Sleek, modern, single fabric panel", icon: "▤" },
  { id: "zebra",     name: "Zebra Blinds",     tagline: "Alternating sheer & solid bands",    icon: "▦" },
  { id: "honeycomb", name: "Honeycomb Blinds", tagline: "Insulating cellular structure",       icon: "▥" },
];

const FABRICS: { id: string; name: string; opacity: string; color: string }[] = [
  { id: "ivory-mist",   name: "Ivory Mist",   opacity: "Light Filtering", color: "#f1ebd9" },
  { id: "linen-sand",   name: "Linen Sand",   opacity: "Light Filtering", color: "#d9c9a8" },
  { id: "warm-taupe",   name: "Warm Taupe",   opacity: "Semi-Blackout",   color: "#a8927a" },
  { id: "fog-gray",     name: "Fog Gray",     opacity: "Semi-Blackout",   color: "#9aa1a3" },
  { id: "graphite",     name: "Graphite",     opacity: "Blackout",        color: "#3d3f44" },
  { id: "deep-navy",    name: "Deep Navy",    opacity: "Blackout",        color: "#1f2a44" },
  { id: "espresso",     name: "Espresso",     opacity: "Blackout",        color: "#3a2a20" },
  { id: "pearl-white",  name: "Pearl White",  opacity: "Semi-Blackout",   color: "#f5f4ef" },
];

const HARDWARE: { id: HardwareColor; name: string; swatch: string }[] = [
  { id: "black",  name: "Matte Black",    swatch: "#1a1a1a" },
  { id: "bronze", name: "Brushed Bronze", swatch: "#8a6a4b" },
  { id: "gray",   name: "Silver Gray",    swatch: "#b6b8bb" },
  { id: "beige",  name: "Warm Beige",     swatch: "#e1d6c2" },
  { id: "white",  name: "Pure White",     swatch: "#f7f7f5" },
];

const OPERATIONS: { id: Operation; name: string; desc: string; badge?: string }[] = [
  { id: "cordless",     name: "Cordless Lift",          desc: "Child-safe, clean look",        badge: "Popular" },
  { id: "corded",       name: "Continuous Chain",       desc: "Classic, reliable" },
  { id: "motor-standard", name: "Standard Motor",       desc: "Remote controlled",              badge: "Upgrade" },
  { id: "motor-smart",  name: "Smart Motor (Matter)",   desc: "App + voice control",            badge: "Premium" },
];

const STEPS = [
  { key: "product",   label: "Blind Type",      icon: Layers },
  { key: "size",      label: "Dimensions",      icon: Ruler },
  { key: "fabric",    label: "Fabric",          icon: Palette },
  { key: "cassette",  label: "Cassette",        icon: Settings2 },
  { key: "hardware",  label: "Hardware",        icon: Sparkles },
  { key: "operation", label: "Lift Style",      icon: Zap },
  { key: "review",    label: "Review",          icon: ShoppingBag },
  { key: "contact",   label: "Get Quote",       icon: Send },
] as const;

interface Config {
  product: ProductId;
  width: number;
  height: number;
  fabric: string;
  cassette: CassetteShape;
  hardware: HardwareColor;
  operation: Operation;
  quantity: number;
  fabricInsert: boolean;
}

const defaultConfig: Config = {
  product: "roller", width: 36, height: 60,
  fabric: "linen-sand", cassette: "square", hardware: "white",
  operation: "cordless", quantity: 1, fabricInsert: false,
};

const GOLD = "#C9A96E";
const GOLD_DIM = "rgba(201,169,110,0.18)";
const SURFACE = "#1C1914";
const SURFACE2 = "#231F1A";
const BORDER = "rgba(201,169,110,0.15)";
const CREAM = "#F5F0E8";
const MUTED = "#7A7060";

// ─── Main component ───────────────────────────────────────────────────────────
const BuildYourBlind = () => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [savedBlinds, setSavedBlinds] = useState<Config[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", zip: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fabric   = FABRICS.find(f => f.id === config.fabric)!;
  const product  = PRODUCTS.find(p => p.id === config.product)!;
  const operation = OPERATIONS.find(o => o.id === config.operation)!;
  const hardware = HARDWARE.find(h => h.id === config.hardware)!;

  const update = <K extends keyof Config>(k: K, v: Config[K]) =>
    setConfig(c => ({ ...c, [k]: v }));

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));
  const progress = ((step) / (STEPS.length - 1)) * 100;

  const handleAddToCart = () => {
    const all = [...savedBlinds, config];
    all.forEach(b => {
      const f = FABRICS.find(x => x.id === b.fabric)!;
      const p = PRODUCTS.find(x => x.id === b.product)!;
      const h = HARDWARE.find(x => x.id === b.hardware)!;
      addItem({
        productType: b.product as any, productName: `${p.name} — ${f.name}`,
        width: String(b.width), height: String(b.height),
        casing: b.cassette as any, wrapped: false,
        operation: b.operation.startsWith("motor") ? "cordless" : (b.operation as any),
        motor: b.operation === "motor-smart" ? "matter" : b.operation === "motor-standard" ? "standard" : "none",
        quantity: b.quantity, style: `${h.name} ${b.cassette}`,
      });
    });
    toast.success(`Added ${all.length} blind${all.length > 1 ? "s" : ""} to cart!`);
  };

  const addAnotherBlind = () => {
    setSavedBlinds(s => [...s, config]);
    setConfig({ ...defaultConfig });
    setStep(0);
    toast.success("Blind saved. Configure your next one.");
  };

  const removeSavedBlind = (idx: number) =>
    setSavedBlinds(s => s.filter((_, i) => i !== idx));

  const blindSummary = (b: Config) => {
    const f = FABRICS.find(x => x.id === b.fabric)!;
    const p = PRODUCTS.find(x => x.id === b.product)!;
    const h = HARDWARE.find(x => x.id === b.hardware)!;
    const o = OPERATIONS.find(x => x.id === b.operation)!;
    return `- ${p.name} | ${b.width}"W × ${b.height}"H | Qty: ${b.quantity} | ${f.name} (${f.opacity}) | ${b.cassette} (${h.name}) | ${o.name}`;
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) { toast.error("Name and email required."); return; }
    setSubmitting(true);
    try {
      const all = [...savedBlinds, config];
      const summary = all.map((b, i) => `Blind #${i + 1}:\n${blindSummary(b)}`).join("\n\n");
      await sendEmail({
        subject: `Build Your Blind Quote from ${contact.name}`,
        from_name: contact.name,
        email: contact.email,
        phone: contact.phone || "—",
        zip: contact.zip || "—",
        number_of_blinds: String(all.length),
        total_quantity: String(all.reduce((s, b) => s + b.quantity, 0)),
        configuration: summary,
      });
      navigate("/thank-you", { replace: true });
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again or call 425-537-1584.");
    } finally { setSubmitting(false); }
  };

  return (
    <div style={{ background: "#0C0B09", minHeight: "100vh", color: CREAM }} className="flex flex-col">
      <Navbar />

      {/* Gold progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ background: "rgba(201,169,110,0.15)" }}>
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${GOLD}, #E8D5A8)`, originX: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="pt-20 flex-grow">
        {/* Header */}
        <div className="text-center py-8 px-4">
          <p style={{ color: GOLD, letterSpacing: "0.2em", fontSize: "0.7rem" }} className="uppercase font-medium mb-2">
            Interactive Designer
          </p>
          <h1 style={{ fontFamily: "Playfair Display, serif", color: CREAM }}
            className="text-4xl md:text-6xl font-bold tracking-tight">
            Build Your Blind
          </h1>
          <p style={{ color: MUTED }} className="mt-3 text-sm max-w-lg mx-auto">
            Design your custom blind. Watch it come to life as you choose.
          </p>
        </div>

        {/* Step tabs */}
        <div className="flex items-center justify-center gap-1 mb-8 px-4 overflow-x-auto">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.key}
                onClick={() => i <= step && setStep(i)}
                className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg min-w-[60px] transition-all"
                style={{ opacity: done || active ? 1 : 0.35 }}
              >
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: active ? GOLD : done ? GOLD_DIM : "rgba(255,255,255,0.05)",
                    border: `1.5px solid ${active ? GOLD : done ? "rgba(201,169,110,0.4)" : BORDER}`,
                  }}
                >
                  {done
                    ? <Check style={{ color: GOLD }} className="h-3.5 w-3.5" />
                    : <Icon style={{ color: active ? "#0C0B09" : MUTED }} className="h-3.5 w-3.5" />
                  }
                </div>
                <span
                  className="text-[9px] uppercase tracking-wider font-semibold hidden sm:block"
                  style={{ color: active ? GOLD : done ? "rgba(201,169,110,0.6)" : MUTED }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main split layout */}
        <div className="container mx-auto px-4 pb-16 max-w-7xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">

            {/* ── Left: 3D Live Preview ── */}
            <div
              className="lg:sticky lg:top-24 rounded-2xl overflow-hidden"
              style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
            >
              <div className="px-5 pt-5 flex items-center justify-between">
                <span style={{ color: GOLD, fontSize: "0.65rem", letterSpacing: "0.2em" }} className="uppercase font-semibold">
                  Live Preview
                </span>
                <span style={{ color: MUTED, fontSize: "0.7rem" }}>
                  {product.name} · {config.width}" × {config.height}"
                </span>
              </div>

              {/* Luxury CSS room preview */}
              <LuxRoomPreview config={config} fabric={fabric} hardware={hardware} />

              {/* Spec grid */}
              <div
                className="grid grid-cols-4 gap-px text-center"
                style={{ borderTop: `1px solid ${BORDER}`, background: BORDER }}
              >
                {[
                  { label: "Blind", value: product.name.replace(" Blinds", "") },
                  { label: "Fabric", value: fabric.name },
                  { label: "Cassette", value: config.cassette === "round" ? "Curved" : "Square" },
                  { label: "Hardware", value: hardware.name.split(" ")[0] },
                ].map(s => (
                  <div key={s.label} className="py-3 px-2" style={{ background: SURFACE }}>
                    <div style={{ color: MUTED, fontSize: "0.6rem", letterSpacing: "0.15em" }} className="uppercase mb-0.5">{s.label}</div>
                    <div style={{ color: CREAM, fontSize: "0.75rem" }} className="font-medium truncate">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Step content ── */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="p-6 md:p-8"
                >
                  {/* ── Step 0: Blind Type ── */}
                  {step === 0 && (
                    <LuxStep title="Choose Your Blind Type" subtitle="Select the silhouette that defines your space.">
                      <div className="grid gap-3">
                        {PRODUCTS.map(p => (
                          <LuxOptionCard key={p.id} active={config.product === p.id} onClick={() => update("product", p.id)}>
                            <div className="flex items-center gap-4">
                              <div
                                className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                                style={{ background: config.product === p.id ? GOLD_DIM : "rgba(255,255,255,0.04)", color: config.product === p.id ? GOLD : MUTED }}
                              >
                                {p.icon}
                              </div>
                              <div>
                                <div style={{ color: CREAM }} className="font-semibold text-sm">{p.name}</div>
                                <div style={{ color: MUTED }} className="text-xs mt-0.5">{p.tagline}</div>
                              </div>
                              {config.product === p.id && (
                                <div className="ml-auto">
                                  <Check style={{ color: GOLD }} className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          </LuxOptionCard>
                        ))}
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 1: Dimensions ── */}
                  {step === 1 && (
                    <LuxStep title="Set Your Dimensions" subtitle="Measure inside the window frame, width first.">
                      <div className="space-y-8">
                        <LuxDimField label="Width" unit="inches" value={config.width} min={12} max={120}
                          onChange={v => update("width", v)} />
                        <LuxDimField label="Height" unit="inches" value={config.height} min={12} max={120}
                          onChange={v => update("height", v)} />
                        <div
                          className="rounded-xl p-4 flex items-center justify-between"
                          style={{ background: "rgba(201,169,110,0.08)", border: `1px solid ${GOLD_DIM}` }}
                        >
                          <span style={{ color: MUTED }} className="text-xs uppercase tracking-wider">Window Area</span>
                          <span style={{ color: GOLD }} className="font-semibold">
                            {((config.width * config.height) / 144).toFixed(1)} sqft
                          </span>
                        </div>
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 2: Fabric ── */}
                  {step === 2 && (
                    <LuxStep title="Select Your Fabric" subtitle="Color and opacity shape the light and mood.">
                      <div className="grid grid-cols-2 gap-3">
                        {FABRICS.map(f => (
                          <button
                            key={f.id}
                            onClick={() => update("fabric", f.id)}
                            className="group rounded-xl overflow-hidden text-left transition-all"
                            style={{
                              border: `2px solid ${config.fabric === f.id ? GOLD : BORDER}`,
                              background: config.fabric === f.id ? GOLD_DIM : "rgba(255,255,255,0.02)",
                            }}
                          >
                            <div className="h-16 w-full relative" style={{ background: f.color }}>
                              {config.fabric === f.id && (
                                <div className="absolute inset-0 flex items-center justify-center"
                                  style={{ background: "rgba(0,0,0,0.3)" }}>
                                  <Check style={{ color: "#fff" }} className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                            <div className="p-2.5">
                              <div style={{ color: CREAM }} className="text-xs font-semibold">{f.name}</div>
                              <div style={{ color: MUTED }} className="text-[10px] mt-0.5">{f.opacity}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 3: Cassette ── */}
                  {step === 3 && (
                    <LuxStep title="Choose Cassette Style" subtitle="The headrail — the finishing detail at the top.">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {(["square", "round"] as CassetteShape[]).map(shape => (
                          <LuxOptionCard key={shape} active={config.cassette === shape} onClick={() => update("cassette", shape)}>
                            <div
                              className="w-full rounded-lg overflow-hidden mb-3"
                              style={{ background: "rgba(0,0,0,0.3)" }}
                            >
                              <BlindVisualizer3D
                                cassetteStyle={shape === "round" ? "curved" : "square"}
                                color={HW_TO_COLOR[config.hardware]}
                                showFabric={false}
                              />
                            </div>
                            <div style={{ color: CREAM }} className="font-semibold text-sm capitalize">
                              {shape === "round" ? "Curved Fascia" : "Square Cassette"}
                            </div>
                            <div style={{ color: MUTED }} className="text-xs mt-0.5">
                              {shape === "square" ? "Clean angular profile" : "Soft rounded finish"}
                            </div>
                          </LuxOptionCard>
                        ))}
                      </div>

                      {/* Fabric insert */}
                      <div style={{ borderTop: `1px solid ${BORDER}` }} className="pt-5">
                        <div style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase mb-3">
                          Fabric Insert
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {[true, false].map(ins => (
                            <LuxOptionCard key={String(ins)} active={config.fabricInsert === ins} onClick={() => update("fabricInsert", ins)}>
                              <div className="w-full rounded-md overflow-hidden mb-2" style={{ background: "rgba(0,0,0,0.3)" }}>
                                <BlindVisualizer3D
                                  cassetteStyle={config.cassette === "round" ? "curved" : "square"}
                                  color={HW_TO_COLOR[config.hardware]}
                                  showFabric={ins}
                                />
                              </div>
                              <div style={{ color: CREAM }} className="text-xs font-semibold">
                                {ins ? "With Fabric" : "Cassette Only"}
                              </div>
                            </LuxOptionCard>
                          ))}
                        </div>
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 4: Hardware Color ── */}
                  {step === 4 && (
                    <LuxStep title="Hardware Color" subtitle="Chain, cassette, and bottom rail all match.">
                      <div className="grid grid-cols-5 gap-3 mb-6">
                        {HARDWARE.map(h => (
                          <button
                            key={h.id}
                            onClick={() => update("hardware", h.id)}
                            className="flex flex-col items-center gap-2 p-2 rounded-xl transition-all"
                            style={{
                              border: `2px solid ${config.hardware === h.id ? GOLD : BORDER}`,
                              background: config.hardware === h.id ? GOLD_DIM : "rgba(255,255,255,0.02)",
                            }}
                          >
                            <div
                              className="h-12 w-12 rounded-full border"
                              style={{ background: h.swatch, borderColor: "rgba(255,255,255,0.12)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)" }}
                            />
                            <div style={{ color: config.hardware === h.id ? GOLD : MUTED, fontSize: "0.65rem" }}
                              className="text-center font-medium leading-tight">{h.name}</div>
                          </button>
                        ))}
                      </div>
                      <div className="rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
                        <BlindVisualizer3D
                          cassetteStyle={config.cassette === "round" ? "curved" : "square"}
                          color={HW_TO_COLOR[config.hardware]}
                          showFabric={config.fabricInsert}
                        />
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 5: Lift Style ── */}
                  {step === 5 && (
                    <LuxStep title="Lift Style" subtitle="How you raise and lower your blind.">
                      <div className="space-y-3">
                        {OPERATIONS.map(o => (
                          <LuxOptionCard key={o.id} active={config.operation === o.id} onClick={() => update("operation", o.id)}>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span style={{ color: CREAM }} className="font-semibold text-sm">{o.name}</span>
                                  {o.badge && (
                                    <span
                                      className="text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wide font-bold"
                                      style={{ background: GOLD_DIM, color: GOLD }}
                                    >{o.badge}</span>
                                  )}
                                </div>
                                <div style={{ color: MUTED }} className="text-xs mt-0.5">{o.desc}</div>
                              </div>
                              {config.operation === o.id && (
                                <Check style={{ color: GOLD }} className="h-4 w-4 ml-auto flex-shrink-0" />
                              )}
                            </div>
                          </LuxOptionCard>
                        ))}
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 6: Review ── */}
                  {step === 6 && (
                    <LuxStep title="Review Your Design" subtitle="Confirm everything is perfect.">
                      <div className="space-y-2 mb-6">
                        {[
                          { label: "Blind Type", value: product.name },
                          { label: "Dimensions", value: `${config.width}" W × ${config.height}" H` },
                          { label: "Fabric", value: `${fabric.name} · ${fabric.opacity}` },
                          { label: "Cassette", value: `${config.cassette === "round" ? "Curved" : "Square"} · ${hardware.name}` },
                          { label: "Insert", value: config.fabricInsert ? "Yes" : "None" },
                          { label: "Lift", value: operation.name },
                        ].map(r => (
                          <div key={r.label} className="flex justify-between items-center py-2.5"
                            style={{ borderBottom: `1px solid ${BORDER}` }}>
                            <span style={{ color: MUTED }} className="text-xs uppercase tracking-wider">{r.label}</span>
                            <span style={{ color: CREAM }} className="text-sm font-medium">{r.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between rounded-xl p-4 mb-6"
                        style={{ background: SURFACE2, border: `1px solid ${BORDER}` }}>
                        <div>
                          <div style={{ color: CREAM }} className="text-sm font-semibold">Quantity</div>
                          <div style={{ color: MUTED }} className="text-xs mt-0.5">Identical blinds for this configuration</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => update("quantity", Math.max(1, config.quantity - 1))}
                            className="h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                            style={{ border: `1px solid ${BORDER}`, color: CREAM, background: "rgba(255,255,255,0.04)" }}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span style={{ color: GOLD }} className="w-8 text-center font-bold text-lg">{config.quantity}</span>
                          <button onClick={() => update("quantity", Math.min(25, config.quantity + 1))}
                            className="h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                            style={{ border: `1px solid ${BORDER}`, color: CREAM, background: "rgba(255,255,255,0.04)" }}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {savedBlinds.length > 0 && (
                        <div className="mb-4">
                          <div style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase mb-2">
                            Other Blinds ({savedBlinds.length})
                          </div>
                          <div className="space-y-2">
                            {savedBlinds.map((b, i) => {
                              const p = PRODUCTS.find(x => x.id === b.product)!;
                              const f = FABRICS.find(x => x.id === b.fabric)!;
                              return (
                                <div key={i} className="flex items-center justify-between rounded-lg p-3"
                                  style={{ background: SURFACE2, border: `1px solid ${BORDER}` }}>
                                  <div>
                                    <div style={{ color: CREAM }} className="text-xs font-medium">{p.name} — {f.name}</div>
                                    <div style={{ color: MUTED }} className="text-[10px] mt-0.5">
                                      {b.width}" × {b.height}" · Qty {b.quantity}
                                    </div>
                                  </div>
                                  <button onClick={() => removeSavedBlind(i)}
                                    style={{ color: MUTED }} className="hover:opacity-70 transition-opacity p-1">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={addAnotherBlind}
                          className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all"
                          style={{ border: `1px solid ${BORDER}`, color: CREAM, background: "rgba(255,255,255,0.03)" }}>
                          <Plus className="h-3.5 w-3.5" /> Add another
                        </button>
                        <button onClick={handleAddToCart}
                          className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all"
                          style={{ border: `1px solid ${GOLD}`, color: GOLD, background: GOLD_DIM }}>
                          <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                        </button>
                      </div>
                    </LuxStep>
                  )}

                  {/* ── Step 7: Contact / Quote ── */}
                  {step === 7 && (
                    <LuxStep title="Get Your Quote" subtitle="We'll confirm pricing and schedule installation. Seattle area only.">
                      <div className="rounded-xl p-4 mb-6 flex items-center justify-between"
                        style={{ background: GOLD_DIM, border: `1px solid ${GOLD}` }}>
                        <span style={{ color: GOLD }} className="text-xs uppercase tracking-wider font-semibold">
                          {savedBlinds.length + 1} blind{savedBlinds.length ? "s" : ""} in this quote
                        </span>
                        <span style={{ color: GOLD }} className="text-xs font-bold">
                          {savedBlinds.reduce((s, b) => s + b.quantity, 0) + config.quantity} total units
                        </span>
                      </div>
                      <div className="space-y-4">
                        {[
                          { key: "name", label: "Full Name", placeholder: "Jane Doe", type: "text", required: true },
                          { key: "email", label: "Email Address", placeholder: "jane@example.com", type: "email", required: true },
                          { key: "phone", label: "Phone Number", placeholder: "(425) 555-0100", type: "tel", required: false },
                          { key: "zip", label: "ZIP Code", placeholder: "98101", type: "text", required: false },
                        ].map(field => (
                          <div key={field.key}>
                            <label style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }}
                              className="uppercase block mb-1.5 font-medium">
                              {field.label} {field.required && <span style={{ color: GOLD }}>*</span>}
                            </label>
                            <input
                              type={field.type}
                              value={contact[field.key as keyof typeof contact]}
                              onChange={e => setContact({ ...contact, [field.key]: e.target.value })}
                              placeholder={field.placeholder}
                              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                              style={{
                                background: SURFACE2, border: `1px solid ${BORDER}`,
                                color: CREAM, fontFamily: "inherit",
                              }}
                              onFocus={e => (e.target.style.borderColor = GOLD)}
                              onBlur={e => (e.target.style.borderColor = BORDER)}
                            />
                          </div>
                        ))}
                        <button
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="w-full rounded-xl py-4 font-semibold text-sm transition-all mt-2"
                          style={{
                            background: submitting ? GOLD_DIM : `linear-gradient(135deg, ${GOLD}, #E8D5A8)`,
                            color: "#0C0B09",
                            opacity: submitting ? 0.7 : 1,
                          }}
                        >
                          {submitting ? "Sending your quote…" : "Send My Quote Request →"}
                        </button>
                        <p className="text-center text-xs" style={{ color: MUTED }}>
                          Or call us at{" "}
                          <a href="tel:+14255371584" style={{ color: GOLD }} className="font-medium">
                            🇺🇸 425-537-1584
                          </a>
                        </p>
                      </div>
                    </LuxStep>
                  )}

                  {/* Nav buttons */}
                  <div className="flex justify-between mt-8 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                    <button
                      onClick={prev}
                      disabled={step === 0}
                      className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-medium transition-all"
                      style={{
                        border: `1px solid ${BORDER}`, color: step === 0 ? MUTED : CREAM,
                        background: "rgba(255,255,255,0.03)", opacity: step === 0 ? 0.4 : 1,
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    {step < STEPS.length - 1 && (
                      <button
                        onClick={next}
                        className="flex items-center gap-1.5 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all"
                        style={{ background: `linear-gradient(135deg, ${GOLD}, #E8D5A8)`, color: "#0C0B09" }}
                      >
                        Continue <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ─── Luxury CSS Room Preview ──────────────────────────────────────────────────
const CassetteSVG = ({ color, shape, w }: { color: string; shape: CassetteShape; w: number }) => {
  const id = `cg-${color.replace('#','')}-${shape}`;
  const rx = shape === "round" ? 20 : 2;
  return (
    <svg viewBox="0 0 200 44" preserveAspectRatio="none" style={{ width: w, height: 42 }} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="198" height="42" rx={rx} ry={rx} fill={color} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <rect x="1" y="1" width="198" height="42" rx={rx} ry={rx} fill={`url(#${id})`} />
      <rect x="6" y={shape === "round" ? 5 : 3} width="188" height={shape === "round" ? 8 : 5} rx={shape === "round" ? 4 : 1}
        fill="rgba(255,255,255,0.45)" />
      {shape === "square" && (
        <>
          <rect x="1" y="1" width="5" height="42" fill="rgba(0,0,0,0.2)" />
          <rect x="194" y="1" width="5" height="42" fill="rgba(0,0,0,0.2)" />
        </>
      )}
      <rect x="2" y={shape === "round" ? 34 : 36} width="196" height="6" rx="1" fill="rgba(0,0,0,0.22)" />
    </svg>
  );
};

function renderFabricCSS(fabricColor: string, productType: ProductId, h: number) {
  const base = fabricColor;
  const shadow = "inset 0 8px 16px rgba(0,0,0,0.25), inset 0 -12px 20px rgba(0,0,0,0.28), inset 6px 0 14px rgba(0,0,0,0.15), inset -6px 0 14px rgba(0,0,0,0.15)";
  if (productType === "zebra") {
    const bands = Math.max(12, Math.round(h / 20));
    return (
      <div className="flex flex-col h-full w-full overflow-hidden" style={{ boxShadow: shadow, background: base }}>
        {Array.from({ length: bands }).map((_, i) => (
          <div key={i} className="flex-1" style={{
            background: i % 2 === 0
              ? `linear-gradient(180deg, ${base}, ${base}ee)`
              : `linear-gradient(180deg, ${base}22, ${base}44)`,
            borderBottom: i % 2 === 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
          }} />
        ))}
      </div>
    );
  }
  if (productType === "honeycomb") {
    const cells = Math.max(12, Math.round(h / 24));
    return (
      <div className="flex flex-col h-full w-full overflow-hidden" style={{ background: base, boxShadow: shadow }}>
        {Array.from({ length: cells }).map((_, i) => (
          <div key={i} className="flex-1" style={{
            background: `linear-gradient(180deg, ${base} 0%, rgba(0,0,0,0.18) 50%, ${base} 100%)`,
            borderBottom: "1px solid rgba(0,0,0,0.13)",
          }} />
        ))}
      </div>
    );
  }
  return (
    <div className="h-full w-full relative" style={{
      background: `linear-gradient(180deg, ${base} 0%, ${base} 90%, rgba(0,0,0,0.2) 100%)`,
      boxShadow: shadow,
    }}>
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 4px)",
      }} />
    </div>
  );
}

const LuxRoomPreview = ({ config, fabric, hardware }: {
  config: Config;
  fabric: typeof FABRICS[0];
  hardware: typeof HARDWARE[0];
}) => {
  const ratio = config.width / config.height;
  const previewW = Math.min(300, Math.max(160, ratio * 260));
  const previewH = Math.min(340, Math.max(180, 270));

  return (
    <div className="relative overflow-hidden" style={{ height: 420 }}>
      {/* Dark luxury room */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, #1A1612 0%, #0F0D0A 50%, #0A0908 100%)",
      }} />
      {/* Subtle light from upper left — like a lamp */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 20% 15%, rgba(201,169,110,0.08), transparent 55%)",
      }} />
      {/* Window light glow from behind blind */}
      <div className="absolute pointer-events-none" style={{
        left: "50%", top: "50%", transform: "translate(-50%, -58%)",
        width: previewW + 60, height: previewH + 60,
        background: "radial-gradient(ellipse, rgba(180,210,230,0.12), transparent 70%)",
        filter: "blur(20px)",
      }} />
      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: 80,
        background: "linear-gradient(180deg, #181410 0%, #0E0C0A 100%)",
        boxShadow: "inset 0 4px 12px rgba(0,0,0,0.4)",
      }} />
      {/* Baseboard */}
      <div className="absolute left-0 right-0" style={{
        bottom: 80, height: 3,
        background: "linear-gradient(90deg, #2A2520, #3A3028, #2A2520)",
      }} />

      {/* Window assembly */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{
        bottom: 88, width: previewW + 52, height: previewH + 72,
      }}>
        {/* Outer trim */}
        <div className="absolute inset-0 rounded-sm" style={{
          background: "linear-gradient(180deg, #2A2520 0%, #1E1A16 100%)",
          boxShadow: "0 24px 48px -8px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
        }} />
        {/* Sky / daylight */}
        <div className="absolute" style={{
          left: 14, right: 14, top: 14, bottom: 14,
          background: "linear-gradient(180deg, #8AAEC4 0%, #A8C4D6 40%, #C4D4DE 70%, #D8C8A8 100%)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.25)",
        }} />
        {/* Window mullion */}
        <div className="absolute" style={{
          left: "50%", top: 14, bottom: 14, width: 1,
          background: "rgba(255,255,255,0.35)",
          transform: "translateX(-50%)",
        }} />

        {/* Cassette */}
        <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{ top: 6, width: previewW + 32 }}>
          <CassetteSVG color={hardware.swatch} shape={config.cassette} w={previewW + 32} />
        </div>

        {/* Fabric */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 transition-all duration-700"
          style={{ width: previewW, height: previewH, top: 46 }}>
          {renderFabricCSS(fabric.color, config.product, previewH)}
          {/* Bottom rail */}
          <div className="absolute left-0 right-0 bottom-0 flex items-stretch"
            style={{ height: 11, boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }}>
            <div style={{ width: 7, background: hardware.swatch, opacity: 0.9 }} />
            <div className="flex-1" style={{
              background: `linear-gradient(180deg, ${fabric.color} 0%, rgba(0,0,0,0.25) 100%)`,
            }} />
            <div style={{ width: 7, background: hardware.swatch, opacity: 0.9 }} />
          </div>
        </div>

        {/* Chain */}
        {config.operation === "corded" && (
          <div className="absolute z-30" style={{
            right: 8, top: 50, width: 4, height: previewH * 0.8,
            background: `repeating-linear-gradient(180deg, ${hardware.swatch}CC 0 4px, transparent 4px 8px)`,
          }} />
        )}
        {config.operation.startsWith("motor") && (
          <div className="absolute z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ right: 10, top: 58, background: "rgba(0,0,0,0.75)", border: "1px solid rgba(201,169,110,0.3)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span style={{ color: "#C9A96E", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em" }}>
              {config.operation === "motor-smart" ? "SMART" : "MOTOR"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const LuxStep = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div>
    <h2 style={{ fontFamily: "Playfair Display, serif", color: CREAM }} className="text-2xl font-bold leading-tight">
      {title}
    </h2>
    {subtitle && <p style={{ color: MUTED }} className="text-sm mt-1.5 mb-6">{subtitle}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const LuxOptionCard = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="w-full text-left rounded-xl p-4 transition-all"
    style={{
      border: `2px solid ${active ? GOLD : BORDER}`,
      background: active ? GOLD_DIM : "rgba(255,255,255,0.02)",
    }}
  >
    {children}
  </button>
);

const LuxDimField = ({ label, unit, value, min, max, onChange }: {
  label: string; unit: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-3">
      <span style={{ color: MUTED, fontSize: "0.65rem", letterSpacing: "0.15em" }} className="uppercase font-medium">{label}</span>
      <div>
        <span style={{ color: GOLD, fontFamily: "Playfair Display, serif" }} className="text-3xl font-bold">{value}</span>
        <span style={{ color: MUTED }} className="text-sm ml-1">{unit}</span>
      </div>
    </div>
    <Slider value={[value]} min={min} max={max} step={1} onValueChange={([v]) => onChange(v)}
      className="[&_.slider-track]:bg-white/10 [&_.slider-range]:bg-amber-400 [&_.slider-thumb]:bg-amber-400 [&_.slider-thumb]:border-0" />
    <div className="flex justify-between mt-1.5">
      <span style={{ color: MUTED, fontSize: "0.7rem" }}>{min}"</span>
      <span style={{ color: MUTED, fontSize: "0.7rem" }}>{max}"</span>
    </div>
  </div>
);

export default BuildYourBlind;
