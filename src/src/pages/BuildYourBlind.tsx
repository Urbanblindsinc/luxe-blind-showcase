import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Layers,
  Palette,
  Settings2,
  Zap,
  ShoppingBag,
  Send,
  Sparkles,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import BlindVisualizer3D, { type CassetteColor } from "@/components/BlindVisualizer3D";

// Map BuildYourBlind hardware IDs → BlindVisualizer3D color keys
const HW_TO_COLOR: Record<HardwareColor, CassetteColor> = {
  black: "black",
  bronze: "brown",
  gray: "gray",
  beige: "beige",
  white: "white",
};

type ProductId = "roller" | "zebra" | "honeycomb";
type CassetteShape = "square" | "round";
type HardwareColor = "black" | "bronze" | "gray" | "beige" | "white";
type Operation = "cordless" | "corded" | "motor-standard" | "motor-smart";

const PRODUCTS: { id: ProductId; name: string; tagline: string; emoji: string }[] = [
  { id: "roller", name: "Roller Blinds", tagline: "Sleek, modern, single fabric panel", emoji: "▤" },
  { id: "zebra", name: "Zebra Blinds", tagline: "Alternating sheer & solid bands", emoji: "▦" },
  { id: "honeycomb", name: "Honeycomb Blinds", tagline: "Insulating cellular structure", emoji: "▥" },
];

const FABRICS: { id: string; name: string; opacity: "Light Filtering" | "Semi-Blackout" | "Blackout"; color: string }[] = [
  { id: "ivory-mist", name: "Ivory Mist", opacity: "Light Filtering", color: "#f1ebd9" },
  { id: "linen-sand", name: "Linen Sand", opacity: "Light Filtering", color: "#d9c9a8" },
  { id: "warm-taupe", name: "Warm Taupe", opacity: "Semi-Blackout", color: "#a8927a" },
  { id: "fog-gray", name: "Fog Gray", opacity: "Semi-Blackout", color: "#9aa1a3" },
  { id: "graphite", name: "Graphite", opacity: "Blackout", color: "#3d3f44" },
  { id: "deep-navy", name: "Deep Navy", opacity: "Blackout", color: "#1f2a44" },
  { id: "espresso", name: "Espresso", opacity: "Blackout", color: "#3a2a20" },
  { id: "pearl-white", name: "Pearl White", opacity: "Semi-Blackout", color: "#f5f4ef" },
];

const HARDWARE: { id: HardwareColor; name: string; swatch: string }[] = [
  { id: "black", name: "Matte Black", swatch: "#1a1a1a" },
  { id: "bronze", name: "Brushed Bronze", swatch: "#8a6a4b" },
  { id: "gray", name: "Silver Gray", swatch: "#b6b8bb" },
  { id: "beige", name: "Warm Beige", swatch: "#e1d6c2" },
  { id: "white", name: "Pure White", swatch: "#f7f7f5" },
];

const CassetteSVG = ({
  color,
  shape,
  className,
  style,
  fabricColor,
}: {
  color: string;
  shape: CassetteShape;
  className?: string;
  style?: React.CSSProperties;
  fabricColor?: string;
}) => {
  const isRound = shape === "round";
  const safe = color.replace(/[^a-zA-Z0-9]/g, "");
  const gid = `cas-grad-${safe}-${shape}`;
  const sid = `cas-sheen-${safe}-${shape}`;
  const rx = isRound ? 22 : 3;
  return (
    <svg
      viewBox="0 0 200 44"
      preserveAspectRatio="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={sid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Base body */}
      <rect
        x="1"
        y="1"
        width="198"
        height="42"
        rx={rx}
        ry={rx}
        fill={color}
        stroke="rgba(0,0,0,0.28)"
        strokeWidth="1"
      />
      {/* Vertical light gradient for depth */}
      <rect x="1" y="1" width="198" height="42" rx={rx} ry={rx} fill={`url(#${gid})`} />
      {/* Top sheen strip */}
      <rect
        x="6"
        y={isRound ? 5 : 3}
        width="188"
        height={isRound ? 8 : 5}
        rx={isRound ? 4 : 1}
        fill={`url(#${sid})`}
      />
      {/* End caps for square shape */}
      {!isRound && (
        <>
          <rect x="1" y="1" width="6" height="42" fill="#000" opacity="0.18" />
          <rect x="193" y="1" width="6" height="42" fill="#000" opacity="0.18" />
        </>
      )}
      {/* Bottom shadow lip */}
      <rect
        x="2"
        y={isRound ? 34 : 36}
        width="196"
        height="6"
        rx={isRound ? 3 : 1}
        fill="#000"
        opacity="0.22"
      />
      {/* Fabric insert: fabric-colored panel framed on all 4 sides by hardware color */}
      {fabricColor && (
        <>
          <rect
            x="10"
            y={isRound ? 11 : 9}
            width="180"
            height={isRound ? 22 : 26}
            rx={isRound ? 8 : 1}
            fill={fabricColor}
            stroke={color}
            strokeWidth="3"
          />
          {/* subtle fabric shading */}
          <rect
            x="10"
            y={isRound ? 11 : 9}
            width="180"
            height={isRound ? 22 : 26}
            rx={isRound ? 8 : 1}
            fill={`url(#${gid})`}
            opacity="0.5"
          />
        </>
      )}
    </svg>
  );
};

const OPERATIONS: { id: Operation; name: string; desc: string }[] = [
  { id: "cordless", name: "Cordless Lift", desc: "Child-safe, clean look" },
  { id: "corded", name: "Continuous Chain", desc: "Classic, reliable" },
  { id: "motor-standard", name: "Standard Motor", desc: "Remote controlled" },
  { id: "motor-smart", name: "Smart Motor (Matter)", desc: "App + voice control" },
];

const STEPS = [
  { key: "product", label: "Blind Type", icon: Layers },
  { key: "size", label: "Dimensions", icon: Ruler },
  { key: "fabric", label: "Fabric", icon: Palette },
  { key: "cassette", label: "Cassette", icon: Settings2 },
  { key: "hardware", label: "Hardware Color", icon: Sparkles },
  { key: "operation", label: "Lift Style", icon: Zap },
  { key: "review", label: "Review", icon: ShoppingBag },
  { key: "contact", label: "Get Quote", icon: Send },
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
  product: "roller",
  width: 36,
  height: 60,
  fabric: "linen-sand",
  cassette: "square",
  hardware: "white",
  operation: "cordless",
  quantity: 1,
  fabricInsert: false,
};

const FORM_EMAIL = "urban.blinds.inc@gmail.com";

const BuildYourBlind = () => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [savedBlinds, setSavedBlinds] = useState<Config[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", zip: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => window.scrollTo(0, 0), []);

  const fabric = FABRICS.find((f) => f.id === config.fabric)!;
  const product = PRODUCTS.find((p) => p.id === config.product)!;
  const operation = OPERATIONS.find((o) => o.id === config.operation)!;
  const hardware = HARDWARE.find((h) => h.id === config.hardware)!;

  const update = <K extends keyof Config>(k: K, v: Config[K]) => setConfig((c) => ({ ...c, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleAddToCart = () => {
    const all = [...savedBlinds, config];
    all.forEach((b) => {
      const f = FABRICS.find((x) => x.id === b.fabric)!;
      const p = PRODUCTS.find((x) => x.id === b.product)!;
      const h = HARDWARE.find((x) => x.id === b.hardware)!;
      addItem({
        productType: b.product as any,
        productName: `${p.name} — ${f.name}`,
        width: String(b.width),
        height: String(b.height),
        casing: b.cassette as any,
        wrapped: false,
        operation: b.operation.startsWith("motor") ? "cordless" : (b.operation as any),
        motor: b.operation === "motor-smart" ? "matter" : b.operation === "motor-standard" ? "standard" : "none",
        quantity: b.quantity,
        style: `${h.name} ${b.cassette}`,
      });
    });
    toast.success(`Added ${all.length} blind${all.length > 1 ? "s" : ""} to cart!`);
  };

  const addAnotherBlind = () => {
    setSavedBlinds((s) => [...s, config]);
    setConfig({ ...defaultConfig });
    setStep(0);
    toast.success("Blind saved. Configure your next one.");
  };

  const removeSavedBlind = (idx: number) => {
    setSavedBlinds((s) => s.filter((_, i) => i !== idx));
  };

  const blindSummary = (b: Config) => {
    const f = FABRICS.find((x) => x.id === b.fabric)!;
    const p = PRODUCTS.find((x) => x.id === b.product)!;
    const h = HARDWARE.find((x) => x.id === b.hardware)!;
    const o = OPERATIONS.find((x) => x.id === b.operation)!;
    return `- ${p.name} | ${b.width}"W × ${b.height}"H | Qty: ${b.quantity} | Fabric: ${f.name} (${f.opacity}) | Cassette: ${b.cassette} (${h.name})${b.fabricInsert ? " + fabric insert" : ""} | Lift: ${o.name}`;
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) {
      toast.error("Please provide your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      const all = [...savedBlinds, config];
      const summary = all
        .map((b, i) => `Blind #${i + 1}:\n${blindSummary(b)}`)
        .join("\n\n");

      const formBody = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "Not provided",
        zip: contact.zip || "Not provided",
        numberOfBlinds: String(all.length),
        totalQuantity: String(all.reduce((s, b) => s + b.quantity, 0)),
        configuration: summary,
        _subject: `Build Your Blind Quote — ${contact.name}`,
        _captcha: "false",
        _template: "table",
        _replyto: contact.email,
      };

      // Primary: Lovable Cloud edge function (reliable, server-side via Resend)
      const items = all.map((b) => {
        const f = FABRICS.find((x) => x.id === b.fabric)!;
        const p = PRODUCTS.find((x) => x.id === b.product)!;
        const h = HARDWARE.find((x) => x.id === b.hardware)!;
        const o = OPERATIONS.find((x) => x.id === b.operation)!;
        return {
          id: `${b.product}-${b.fabric}-${b.cassette}-${b.hardware}`,
          productType: (b.product === "honeycomb" ? "honeycomb" : b.product === "zebra" ? "zebra" : "roller") as
            | "zebra"
            | "roller"
            | "honeycomb",
          productName: `${p.name} — ${f.name}`,
          width: String(b.width),
          height: String(b.height),
          casing: (b.cassette === "round" ? "curved" : "square") as "square" | "curved",
          wrapped: false,
          operation: (b.operation.startsWith("motor") ? "cordless" : b.operation) as "cordless" | "corded",
          motor: (b.operation === "motor-smart"
            ? "matter"
            : b.operation === "motor-standard"
            ? "standard"
            : "none") as "none" | "standard" | "matter",
          quantity: b.quantity,
          style: `${h.name} ${b.cassette}${b.fabricInsert ? " + fabric insert" : ""} | Lift: ${o.name}`,
        };
      });

      const idempotencyKey = `quote-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const { error } = await supabase.functions.invoke("send-email-resend", {
        body: {
          templateName: "quote-request",
          recipientEmail: "urban.blinds.inc@gmail.com",
          idempotencyKey,
          templateData: {
            name: contact.name,
            email: contact.email,
            phone: contact.phone || "Not provided",
            zip: contact.zip || "Not provided",
            numberOfBlinds: String(all.length),
            totalQuantity: String(all.reduce((s, b) => s + b.quantity, 0)),
            configuration: summary,
          },
        },
      });
      if (error) throw error;

      navigate("/thank-you", { replace: true });
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again or call 425-537-1584.");
    } finally {
      setSubmitting(false);
    }
  };

  // Preview rendering scale — proportional to chosen W×H
  const ratio = config.width / config.height;
  const previewW = Math.min(340, Math.max(180, ratio * 300));
  const previewH = Math.min(380, Math.max(200, 300));

  // Soft inner-shadow for fabric depth
  const fabricShadow =
    "inset 0 6px 14px rgba(0,0,0,0.18), inset 0 -10px 18px rgba(0,0,0,0.22), inset 6px 0 12px rgba(0,0,0,0.12), inset -6px 0 12px rgba(0,0,0,0.12)";

  const renderFabric = () => {
    const base = fabric.color;
    if (config.product === "zebra") {
      // Alternating opaque/sheer horizontal bands with soft shading
      const bandCount = Math.max(14, Math.round(previewH / 18));
      return (
        <div
          className="flex flex-col h-full w-full overflow-hidden"
          style={{ boxShadow: fabricShadow, background: base }}
        >
          {Array.from({ length: bandCount }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                background:
                  i % 2 === 0
                    ? `linear-gradient(180deg, ${base}, ${base}ee)`
                    : `linear-gradient(180deg, ${base}33, ${base}55)`,
                borderBottom: i % 2 === 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
              }}
            />
          ))}
        </div>
      );
    }
    if (config.product === "honeycomb") {
      // Stacked cell rows with curved shading to imply cells
      const cellCount = Math.max(14, Math.round(previewH / 22));
      return (
        <div
          className="flex flex-col h-full w-full overflow-hidden"
          style={{ background: base, boxShadow: fabricShadow }}
        >
          {Array.from({ length: cellCount }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                background: `linear-gradient(180deg, ${base} 0%, rgba(0,0,0,0.18) 50%, ${base} 100%)`,
                borderBottom: "1px solid rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>
      );
    }
    // Roller: smooth fabric with subtle vertical weave + bottom hem bar
    return (
      <div
        className="h-full w-full relative"
        style={{
          background: `linear-gradient(180deg, ${base} 0%, ${base} 92%, rgba(0,0,0,0.18) 100%)`,
          boxShadow: fabricShadow,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 4px)",
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-stone-50 to-stone-100">
      <Navbar />

      <div className="pt-28 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-3">Interactive Designer</Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Build Your Blind</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Design your custom blind in minutes. Watch it come to life as you choose.
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto gap-2 px-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                const done = i < step;
                return (
                  <button
                    key={s.key}
                    onClick={() => i <= step && setStep(i)}
                    className={cn(
                      "flex flex-col items-center gap-1 px-2 py-2 rounded-lg min-w-[72px] transition-all",
                      active && "bg-primary text-primary-foreground",
                      done && !active && "text-primary",
                      !active && !done && "text-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center border-2",
                      active ? "border-primary-foreground bg-primary-foreground/20" : done ? "border-primary bg-primary/10" : "border-muted"
                    )}>
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-medium">{s.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
              {/* Live Preview */}
              <Card className="p-6 lg:sticky lg:top-32 lg:self-start overflow-hidden">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Live Preview</div>
                <div className="relative rounded-xl overflow-hidden min-h-[500px] flex items-end justify-center" style={{
                  background: "linear-gradient(180deg, #efe8de 0%, #e6ddd0 55%, #d9cfc0 100%)",
                }}>
                  {/* Wall lighting */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at 30% 15%, rgba(255,250,235,0.7), transparent 55%)",
                  }} />
                  {/* Floor */}
                  <div className="absolute left-0 right-0 bottom-0 h-20" style={{
                    background: "linear-gradient(180deg, #c4b59f 0%, #a89478 100%)",
                    boxShadow: "inset 0 4px 8px rgba(0,0,0,0.15)",
                  }} />
                  {/* Baseboard */}
                  <div className="absolute left-0 right-0 h-3" style={{
                    bottom: 80,
                    background: "#f3ede2",
                    boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
                  }} />

                  {/* Window assembly */}
                  <div className="relative mb-24" style={{ width: previewW + 56, height: previewH + 80 }}>
                    {/* Outer trim / casing */}
                    <div className="absolute inset-0 rounded-sm" style={{
                      background: "linear-gradient(180deg, #fbf7ef 0%, #ece4d3 100%)",
                      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)",
                    }} />
                    {/* Inner recess (sky behind blind) */}
                    <div className="absolute" style={{
                      left: 14, right: 14, top: 14, bottom: 14,
                      background: "linear-gradient(180deg, #b9d8ec 0%, #d6e7f3 60%, #f0e3c8 100%)",
                      boxShadow: "inset 0 0 30px rgba(0,0,0,0.15)",
                    }} />
                    {/* Subtle window mullion behind blind */}
                    <div className="absolute" style={{
                      left: "50%", top: 14, bottom: 14, width: 2,
                      background: "rgba(255,255,255,0.4)",
                      transform: "translateX(-50%)",
                    }} />

                    {/* Cassette (headrail) */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{
                      top: 6, width: previewW + 36, height: 52,
                    }}>
                      <CassetteSVG
                        color={hardware.swatch}
                        shape={config.cassette}
                        className="w-full h-full"
                        style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.35))" }}
                        fabricColor={config.fabricInsert ? fabric.color : undefined}
                      />
                    </div>

                    {/* Fabric */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 z-10 transition-all duration-500"
                      style={{ width: previewW, height: previewH, top: 48 }}
                    >
                      {renderFabric()}
                      {/* Bottom rail: fabric fill, hardware-colored left/right side caps */}
                      <div
                        className="absolute left-0 right-0 bottom-0 flex items-stretch"
                        style={{ height: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                      >
                        <div style={{ width: 6, background: hardware.swatch }} />
                        <div
                          className="flex-1"
                          style={{
                            background: `linear-gradient(180deg, ${fabric.color} 0%, rgba(0,0,0,0.18) 100%)`,
                          }}
                        />
                        <div style={{ width: 6, background: hardware.swatch }} />
                      </div>
                    </div>

                    {/* Bead chain for corded */}
                    {config.operation === "corded" && (
                      <div className="absolute z-30" style={{
                        right: 6, top: 56, width: 4, height: previewH * 0.8,
                        background: `repeating-linear-gradient(180deg, ${hardware.swatch} 0 4px, transparent 4px 7px)`,
                      }} />
                    )}
                    {/* Remote indicator for motor */}
                    {config.operation.startsWith("motor") && (
                      <div className="absolute z-30 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 text-white text-[10px]" style={{
                        right: 8, top: 64,
                      }}>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {config.operation === "motor-smart" ? "Smart" : "Motor"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spec summary (no prices) */}
                <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-2 text-xs">
                  <Spec label="Blind" value={product.name} />
                  <Spec label="Size" value={`${config.width}" × ${config.height}"`} />
                  <Spec label="Fabric" value={fabric.name} />
                  <Spec label="Opacity" value={fabric.opacity} />
                  <Spec label="Cassette" value={`${config.cassette === "round" ? "Round" : "Square"}`} />
                  <Spec label="Hardware" value={hardware.name} />
                  <Spec label="Insert" value={config.fabricInsert ? "Fabric insert" : "No insert"} />
                  <Spec label="Lift" value={operation.name} />
                </div>
              </Card>

              {/* Step content */}
              <Card className="p-6 md:p-8">
                {step === 0 && (
                  <StepWrap title="Choose your blind type" subtitle="Pick the silhouette that fits your space.">
                    <div className="grid sm:grid-cols-3 gap-4">
                       {PRODUCTS.map((p) => (
                        <OptionCard key={p.id} active={config.product === p.id} onClick={() => update("product", p.id)}>
                          <div className="text-5xl mb-2">{p.emoji}</div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{p.tagline}</div>
                        </OptionCard>
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === 1 && (
                  <StepWrap title="Enter dimensions" subtitle="Measure inside the window frame, width first.">
                    <div className="space-y-6">
                      <DimField label="Width" unit="inches" value={config.width} min={12} max={120} onChange={(v) => update("width", v)} />
                      <DimField label="Height" unit="inches" value={config.height} min={12} max={120} onChange={(v) => update("height", v)} />
                      <div className="text-sm text-muted-foreground bg-muted/40 rounded-md p-3">
                        Window area: <strong>{((config.width * config.height) / 144).toFixed(1)} sqft</strong>
                      </div>
                    </div>
                  </StepWrap>
                )}

                {step === 2 && (
                  <StepWrap title="Pick your fabric" subtitle="Color & opacity determine light and mood.">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {FABRICS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => update("fabric", f.id)}
                          className={cn(
                            "group rounded-lg border-2 overflow-hidden text-left transition-all",
                            config.fabric === f.id ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-muted"
                          )}
                        >
                          <div className="h-20 w-full" style={{ background: f.color }} />
                          <div className="p-2">
                            <div className="text-xs font-semibold">{f.name}</div>
                            <div className="text-[10px] text-muted-foreground">{f.opacity}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === 3 && (
                  <StepWrap title="Cassette style" subtitle="The headrail housing — finishes off the top.">
                    <div className="grid grid-cols-2 gap-4">
                      {(["square", "round"] as CassetteShape[]).map((shape) => (
                        <OptionCard key={shape} active={config.cassette === shape} onClick={() => update("cassette", shape)}>
                          <div className="w-full mb-2 bg-gradient-to-b from-stone-50 to-white rounded-lg overflow-hidden">
                            <BlindVisualizer3D
                              cassetteStyle={shape === "round" ? "curved" : "square"}
                              color={HW_TO_COLOR[config.hardware]}
                              showFabric={false}
                            />
                          </div>
                          <div className="font-semibold capitalize">{shape === "round" ? "Curved" : "Square"} Cassette</div>
                          <div className="text-xs text-muted-foreground">
                            {shape === "square" ? "Clean modern edges" : "Soft rounded profile"}
                          </div>
                        </OptionCard>
                      ))}
                    </div>

                    {/* Fabric insert toggle */}
                    <div className="mt-6 rounded-lg border p-4">
                      <div className="mb-3">
                        <div className="text-sm font-semibold">Insert Fabric?</div>
                        <div className="text-xs text-muted-foreground">
                          Show the fabric roll inside the cassette window.
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <OptionCard active={config.fabricInsert} onClick={() => update("fabricInsert", true)}>
                          <div className="w-full mb-2 bg-gradient-to-b from-stone-50 to-white rounded-lg overflow-hidden">
                            <BlindVisualizer3D
                              cassetteStyle={config.cassette === "round" ? "curved" : "square"}
                              color={HW_TO_COLOR[config.hardware]}
                              showFabric={true}
                            />
                          </div>
                          <div className="text-sm font-semibold">Yes, show fabric</div>
                          <div className="text-xs text-muted-foreground">With hanging panel</div>
                        </OptionCard>
                        <OptionCard active={!config.fabricInsert} onClick={() => update("fabricInsert", false)}>
                          <div className="w-full mb-2 bg-gradient-to-b from-stone-50 to-white rounded-lg overflow-hidden">
                            <BlindVisualizer3D
                              cassetteStyle={config.cassette === "round" ? "curved" : "square"}
                              color={HW_TO_COLOR[config.hardware]}
                              showFabric={false}
                            />
                          </div>
                          <div className="text-sm font-semibold">Cassette only</div>
                          <div className="text-xs text-muted-foreground">Hardware close-up</div>
                        </OptionCard>
                      </div>
                    </div>
                  </StepWrap>
                )}

                {step === 4 && (
                  <StepWrap title="Hardware color" subtitle="Match your cassette to trim or make it pop.">
                    <div className="grid grid-cols-5 gap-3">
                      {HARDWARE.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => update("hardware", h.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all",
                            config.hardware === h.id ? "border-primary" : "border-transparent hover:border-muted"
                          )}
                        >
                          <div
                            className="h-14 w-14 rounded-full border border-stone-200 shadow-inner"
                            style={{ background: h.swatch }}
                          />
                          <div className="text-[11px] text-center font-medium">{h.name}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 rounded-xl overflow-hidden border bg-gradient-to-b from-stone-50 to-white p-4 flex items-center justify-center">
                      <BlindVisualizer3D
                        cassetteStyle={config.cassette === "round" ? "curved" : "square"}
                        color={HW_TO_COLOR[config.hardware]}
                        showFabric={config.fabricInsert}
                      />
                    </div>
                  </StepWrap>
                )}

                {step === 5 && (
                  <StepWrap title="Lift style" subtitle="How you raise and lower the blind.">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {OPERATIONS.map((o) => (
                        <OptionCard key={o.id} active={config.operation === o.id} onClick={() => update("operation", o.id)}>
                          <div>
                            <div className="font-semibold">{o.name}</div>
                            <div className="text-xs text-muted-foreground">{o.desc}</div>
                          </div>
                        </OptionCard>
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === 6 && (
                  <StepWrap title="Review your design" subtitle="Make sure everything looks right.">
                    <div className="space-y-2 text-sm">
                      <Row label="Blind type" value={product.name} />
                      <Row label="Dimensions" value={`${config.width}" W × ${config.height}" H`} />
                      <Row label="Fabric" value={`${fabric.name} (${fabric.opacity})`} />
                      <Row label="Cassette" value={`${config.cassette === "round" ? "Round" : "Square"} — ${hardware.name}`} />
                      <Row label="Fabric insert" value={config.fabricInsert ? "Yes" : "No"} />
                      <Row label="Lift" value={operation.name} />
                    </div>

                    {/* Quantity stepper */}
                    <div className="mt-6 flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <div className="text-sm font-semibold">Quantity</div>
                        <div className="text-xs text-muted-foreground">Identical blinds for this window setup</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => update("quantity", Math.max(1, config.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center font-semibold text-lg">{config.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => update("quantity", Math.min(25, config.quantity + 1))}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Saved blinds list */}
                    {savedBlinds.length > 0 && (
                      <div className="mt-6">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                          Other blinds in this quote ({savedBlinds.length})
                        </div>
                        <div className="space-y-2">
                          {savedBlinds.map((b, i) => {
                            const p = PRODUCTS.find((x) => x.id === b.product)!;
                            const f = FABRICS.find((x) => x.id === b.fabric)!;
                            return (
                              <div key={i} className="flex items-center justify-between rounded-md border p-2 text-sm">
                                <div>
                                  <div className="font-medium">{p.name} — {f.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {b.width}" × {b.height}" • Qty {b.quantity}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeSavedBlind(i)}
                                  aria-label="Remove blind"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                      <Button variant="outline" onClick={addAnotherBlind}>
                        <Plus className="h-4 w-4 mr-2" /> Add another blind
                      </Button>
                      <Button variant="outline" onClick={handleAddToCart}>
                        <ShoppingBag className="h-4 w-4 mr-2" /> Add all to Cart
                      </Button>
                    </div>
                  </StepWrap>
                )}

                {step === 7 && (
                  <StepWrap title="Get your custom quote" subtitle="We'll confirm pricing & schedule install. Seattle area only.">
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted/40 p-3 text-sm">
                        <strong>{savedBlinds.length + 1}</strong> blind{savedBlinds.length ? "s" : ""} in this quote ·{" "}
                        <strong>{savedBlinds.reduce((s, b) => s + b.quantity, 0) + config.quantity}</strong> total units
                      </div>
                      <div>
                        <Label>Full Name *</Label>
                        <Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Jane Doe" />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="jane@example.com" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Phone</Label>
                          <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="(425) 555-0100" />
                        </div>
                        <div>
                          <Label>ZIP Code</Label>
                          <Input value={contact.zip} onChange={(e) => setContact({ ...contact, zip: e.target.value })} placeholder="98101" />
                        </div>
                      </div>
                      <Button className="w-full" size="lg" disabled={submitting} onClick={handleSubmit}>
                        {submitting ? "Sending..." : "Send My Quote Request"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Or call us directly at <strong>425-537-1584</strong>
                      </p>
                    </div>
                  </StepWrap>
                )}

                {/* Nav buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button variant="ghost" onClick={prev} disabled={step === 0}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  {step < STEPS.length - 1 && (
                    <Button onClick={next}>
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const StepWrap = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-2xl font-bold">{title}</h2>
    {subtitle && <p className="text-sm text-muted-foreground mt-1 mb-6">{subtitle}</p>}
    <div className="mt-4">{children}</div>
  </div>
);

const OptionCard = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={cn(
      "text-left p-4 rounded-lg border-2 transition-all hover:shadow-md w-full",
      active ? "border-primary bg-primary/5 shadow-md" : "border-muted bg-card"
    )}
  >
    {children}
  </button>
);

const DimField = ({
  label, unit, value, min, max, onChange,
}: { label: string; unit: string; value: number; min: number; max: number; onChange: (v: number) => void }) => (
  <div>
    <div className="flex items-baseline justify-between mb-2">
      <Label className="text-base">{label}</Label>
      <div className="text-2xl font-bold">{value}<span className="text-sm text-muted-foreground ml-1">{unit}</span></div>
    </div>
    <Slider value={[value]} min={min} max={max} step={1} onValueChange={([v]) => onChange(v)} />
    <div className="flex justify-between text-xs text-muted-foreground mt-1">
      <span>{min}"</span><span>{max}"</span>
    </div>
  </div>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const Spec = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between gap-2">
    <span className="text-muted-foreground uppercase tracking-wider">{label}</span>
    <span className="font-medium text-right truncate">{value}</span>
  </div>
);

export default BuildYourBlind;