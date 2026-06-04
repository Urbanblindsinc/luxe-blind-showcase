
import React from "react";
import { Ruler, Trash2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { blindTypes, motorOptions, opacityOptions } from "@/utils/quoteConstants";
import type { BlindFormValues } from "@/types/quote";
import { ProductCarouselViewer } from "@/components/ProductImageViewer";
import { getZebraStyles } from "@/data/zebraStyles";
import { getRollerStyles } from "@/data/rollerStyles";
import { getHoneycombStyles } from "@/data/honeycombStyles";
import BlindVisualizer3D, { CASSETTE_COLORS, type CassetteColor, type CassetteStyle } from "@/components/BlindVisualizer3D";

interface BlindConfigProps {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  blind: BlindFormValues;
}

const BlindConfig = ({
  index,
  isExpanded,
  onToggle,
  onRemove,
  blind,
}: BlindConfigProps) => {
  const form = useFormContext();

  // Local state for zebra style viewer
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);
  const [showFabricPreview, setShowFabricPreview] = React.useState(true);

  // Watch current values for dynamic header title and preview image
  const selectedType = form.watch(`blinds.${index}.blindType`);
  const cassetteStyle = (form.watch(`blinds.${index}.cassetteStyle`) || 'square') as CassetteStyle;
  const cassetteColor = (form.watch(`blinds.${index}.cassetteColor`) || 'white') as CassetteColor;
  const widthVal = form.watch(`blinds.${index}.width`);
  const heightVal = form.watch(`blinds.${index}.height`);
  const roomVal = form.watch(`blinds.${index}.roomLocation`);

  const currentType = selectedType || blind.blindType;
  const typeLabel = blindTypes.find((t) => t.value === currentType)?.label || 'Blind';
  const titleLabel = typeLabel.replace(/Blinds$/, 'Blind');
  const typeImageMap = {
    roller: "/lovable-uploads/90a4db7a-e7f8-4afc-93e0-504ba1b20744.png",
    zebra: "/lovable-uploads/55fde7ac-d4d8-46a3-b82e-2cef865d72f0.png",
    honeycomb: "/lovable-uploads/0a3633ae-ed89-491c-8d9f-b31c8a204b5a.png",
  } as const;
  const zebraItems = React.useMemo(() => getZebraStyles(), []);
  const rollerItems = React.useMemo(() => getRollerStyles(), []);
  const honeycombItems = React.useMemo(() => getHoneycombStyles(), []);
  const styleVal = form.watch(`blinds.${index}.style`);
  const honeycombCell = form.watch(`blinds.${index}.honeycombCell`) || '25mm';
  const honeycombOpacity = form.watch(`blinds.${index}.opacity`);
  const rollerOpacity = form.watch(`blinds.${index}.opacity`);
  const zebraOpacity = form.watch(`blinds.${index}.opacity`);
  const filteredHoneycomb = React.useMemo(() =>
    honeycombItems.filter((s: any) => {
      const cellMatch = (s.cellSize ?? '25mm') === honeycombCell;
      const opacityMatch = !honeycombOpacity || s.opacity === honeycombOpacity;
      return cellMatch && opacityMatch;
    }),
    [honeycombItems, honeycombCell, honeycombOpacity]
  );
  const filteredRoller = React.useMemo(() =>
    rollerItems.filter((s: any) => {
      const opacityMatch = !rollerOpacity || s.opacity === rollerOpacity;
      return opacityMatch;
    }),
    [rollerItems, rollerOpacity]
  );
  const filteredZebra = React.useMemo(() =>
    zebraItems.filter((s: any) => {
      const opacityMatch = !zebraOpacity || s.opacity === zebraOpacity;
      return opacityMatch;
    }),
    [zebraItems, zebraOpacity]
  );

  // Set default styles when blind type changes or when component mounts
  React.useEffect(() => {
    const currentStyle = form.getValues(`blinds.${index}.style`);
    
    if (currentType === 'zebra') {
      const isValidZebraStyle = filteredZebra.some(item => 
        item.name.toLowerCase() === String(currentStyle || '').toLowerCase()
      );
      if (!isValidZebraStyle && filteredZebra.length > 0) {
        // Default to first zebra style (Graphite Mist)
        form.setValue(`blinds.${index}.style`, filteredZebra[0].name);
      }
    } else if (currentType === 'roller') {
      const isValidRollerStyle = filteredRoller.some(item => 
        item.name.toLowerCase() === String(currentStyle || '').toLowerCase()
      );
      if (!isValidRollerStyle && filteredRoller.length > 0) {
        // Default to first roller style 
        form.setValue(`blinds.${index}.style`, filteredRoller[0].name);
      }
    } else if (currentType === 'honeycomb') {
      const isValidHoneycombStyle = filteredHoneycomb.some(item => 
        item.name.toLowerCase() === String(currentStyle || '').toLowerCase()
      );
      if (!isValidHoneycombStyle && filteredHoneycomb.length > 0) {
        // Default to GRAPHITE GRAY for honeycomb
        const graphiteGray = filteredHoneycomb.find(item => 
          item.name.toLowerCase().includes('graphite gray')
        );
        form.setValue(`blinds.${index}.style`, (graphiteGray || filteredHoneycomb[0]).name);
      }
    }
  }, [currentType, filteredZebra, filteredRoller, filteredHoneycomb, form, index]);

  const selectedZebra = filteredZebra.find((z) => z.name.toLowerCase() === String(styleVal || '').toLowerCase());
  const selectedZebraIndex = filteredZebra.findIndex((z) => z.name.toLowerCase() === String(styleVal || '').toLowerCase());
  const selectedRoller = filteredRoller.find((r) => r.name.toLowerCase() === String(styleVal || '').toLowerCase());
  const selectedRollerIndex = filteredRoller.findIndex((r) => r.name.toLowerCase() === String(styleVal || '').toLowerCase());
  const selectedHoneycombIndex = filteredHoneycomb.findIndex((h) => h.name.toLowerCase() === String(styleVal || '').toLowerCase());
  const viewerItems = currentType === 'zebra' ? filteredZebra : currentType === 'roller' ? filteredRoller : filteredHoneycomb;
  const currentSelectedIndex = currentType === 'zebra'
    ? (selectedZebraIndex >= 0 ? selectedZebraIndex : 0)
    : currentType === 'roller'
    ? (selectedRollerIndex >= 0 ? selectedRollerIndex : 0)
    : (selectedHoneycombIndex >= 0 ? selectedHoneycombIndex : 0);
  
  // Get the current style name based on type
  const getCurrentStyleName = () => {
    const toTitleCase = (str: string) => {
      return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    };
    
    if (currentType === 'zebra' && selectedZebra) {
      return toTitleCase(selectedZebra.name);
    } else if (currentType === 'roller' && selectedRoller) {
      return toTitleCase(selectedRoller.name);
    } else if (currentType === 'honeycomb') {
      const selectedHoneycomb = filteredHoneycomb.find((h) => 
        h.name.toLowerCase() === String(styleVal || '').toLowerCase()
      );
      if (selectedHoneycomb) {
        const cleanName = selectedHoneycomb.name.replace(/\s+(25MM|38MM)\s*-\s*(BLACKOUT|SEMI-BLACKOUT|LIGHT FILTERING)/gi, '');
        return toTitleCase(cleanName);
      }
    }
    return null;
  };

  const currentStyleName = getCurrentStyleName();
  
  const previewImage = currentType === 'zebra' && selectedZebra
    ? selectedZebra.src
    : currentType === 'roller' && selectedRoller
    ? selectedRoller.src
    : currentType === 'honeycomb' && filteredHoneycomb[0]
    ? (filteredHoneycomb.find((h) => h.name.toLowerCase() === String(styleVal || '').toLowerCase())?.src || filteredHoneycomb[0]?.src)
    : (currentType ? typeImageMap[currentType as keyof typeof typeImageMap] : typeImageMap.roller);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${
          isExpanded ? 'bg-primary/10' : 'bg-gray-50'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center text-sm">
            {index + 1}
          </div>
          <span className="font-medium">
            {`${titleLabel} ${index + 1}`}
          </span>
          {widthVal && heightVal && (
            <span className="text-sm text-muted-foreground">
              ({widthVal}″ × {heightVal}″)
            </span>
          )}
          {roomVal && (
            <span className="text-sm text-muted-foreground">
              - {roomVal}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="h-8 w-8 p-0 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - 3D Blind Visualizer */}
            <div className="relative flex flex-col gap-3">
              {/* 3D Visualizer */}
              <div className="rounded-xl border border-border bg-gradient-to-b from-gray-50 to-white p-4 flex flex-col items-center shadow-sm">
                <BlindVisualizer3D
                  cassetteStyle={cassetteStyle}
                  color={cassetteColor}
                  showFabric={showFabricPreview}
                />
                <div className="mt-3 text-center space-y-0.5">
                  <p className="text-xs font-semibold text-foreground tracking-wide uppercase">
                    {cassetteStyle === 'curved' ? 'Curved Fascia' : 'Square Cassette'} · {CASSETTE_COLORS[cassetteColor].name}
                  </p>
                  {currentStyleName && (
                    <p className="text-xs text-muted-foreground">{currentStyleName}</p>
                  )}
                </div>
              </div>

              {/* Fabric style navigation arrows */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const items = currentType === 'zebra' ? filteredZebra :
                      currentType === 'roller' ? filteredRoller : filteredHoneycomb;
                    const currentIndex = items.findIndex((item) =>
                      item.name.toLowerCase() === String(styleVal || '').toLowerCase()
                    );
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                    const prevStyle = items[prevIndex];
                    if (prevStyle) form.setValue(`blinds.${index}.style`, prevStyle.name);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground border rounded-md py-1.5 transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev fabric
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const items = currentType === 'zebra' ? filteredZebra :
                      currentType === 'roller' ? filteredRoller : filteredHoneycomb;
                    const currentIndex = items.findIndex((item) =>
                      item.name.toLowerCase() === String(styleVal || '').toLowerCase()
                    );
                    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                    const nextStyle = items[nextIndex];
                    if (nextStyle) form.setValue(`blinds.${index}.style`, nextStyle.name);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground border rounded-md py-1.5 transition-colors"
                >
                  Next fabric <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Show/hide fabric toggle */}
              <button
                type="button"
                onClick={() => setShowFabricPreview(v => !v)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 text-center transition-colors"
              >
                {showFabricPreview ? 'Hide fabric (show hardware only)' : 'Show fabric in preview'}
              </button>
            </div>
            
            {/* Right Column - Dimensions and Options */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-1.5">
                <Ruler className="h-4 w-4" /> Dimensions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`blinds.${index}.width`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" min="1" placeholder="e.g., 36" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`blinds.${index}.height`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (inches)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" min="1" placeholder="e.g., 72" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name={`blinds.${index}.roomLocation`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Location (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Living Room, Kitchen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* ── Cassette & Hardware ── */}
              <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                <h3 className="font-medium text-sm flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/70" />
                  Cassette &amp; Hardware
                </h3>

                {/* Cassette Style */}
                <FormField
                  control={form.control}
                  name={`blinds.${index}.cassetteStyle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Cassette Style</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-2">
                          {(['square', 'curved'] as CassetteStyle[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => field.onChange(s)}
                              className={`relative rounded-md border-2 py-2.5 px-3 text-xs font-medium transition-all ${
                                (field.value || 'square') === s
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border text-muted-foreground hover:border-primary/50'
                              }`}
                            >
                              {s === 'square' ? (
                                <span className="flex flex-col items-center gap-1">
                                  <svg width="32" height="14" viewBox="0 0 32 14" className="opacity-80">
                                    <rect x="1" y="2" width="30" height="11" rx="1"
                                      fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
                                  </svg>
                                  Square
                                </span>
                              ) : (
                                <span className="flex flex-col items-center gap-1">
                                  <svg width="32" height="14" viewBox="0 0 32 14" className="opacity-80">
                                    <path d="M1 13 L1 7 Q16 1 31 7 L31 13 Z"
                                      fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
                                  </svg>
                                  Curved
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cassette Color */}
                <FormField
                  control={form.control}
                  name={`blinds.${index}.cassetteColor`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Hardware Color</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2 pt-0.5">
                          {(Object.entries(CASSETTE_COLORS) as [CassetteColor, typeof CASSETTE_COLORS[CassetteColor]][]).map(([key, col]) => (
                            <button
                              key={key}
                              type="button"
                              title={col.name}
                              onClick={() => field.onChange(key)}
                              className={`relative w-8 h-8 rounded-full border-2 transition-all shadow-sm ${
                                (field.value || 'white') === key
                                  ? 'border-primary scale-110 shadow-md'
                                  : 'border-border hover:border-primary/60 hover:scale-105'
                              }`}
                              style={{ backgroundColor: col.hex }}
                            >
                              {(field.value || 'white') === key && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <svg width="12" height="12" viewBox="0 0 12 12">
                                    <path d="M2 6 L5 9 L10 3" stroke={key === 'white' || key === 'beige' || key === 'gray' ? '#333' : '#fff'} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                                  </svg>
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <div className="text-xs text-muted-foreground pt-0.5">
                        {CASSETTE_COLORS[cassetteColor].name} — chain &amp; bottom rail match
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="font-medium">Blind Type &amp; Options</h3>

              <FormField
                control={form.control}
                name={`blinds.${index}.blindType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blind Type</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blind type" />
                        </SelectTrigger>
                        <SelectContent>
                          {blindTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {currentType === 'honeycomb' && (
                <>
                  <FormField
                    control={form.control}
                    name={`blinds.${index}.honeycombCell`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cell Size</FormLabel>
                        <FormControl>
                          <Select onValueChange={(v) => { field.onChange(v); }} defaultValue={field.value || '25mm'}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cell size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="25mm">25mm</SelectItem>
                              <SelectItem value="38mm">38mm</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`blinds.${index}.opacity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Light Control</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select opacity type" />
                            </SelectTrigger>
                            <SelectContent>
                              {opacityOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div>
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-sm text-muted-foreground">{option.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentType === 'roller' && (
                <FormField
                  control={form.control}
                  name={`blinds.${index}.opacity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Light Control</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select opacity type" />
                          </SelectTrigger>
                          <SelectContent>
                            {opacityOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div>
                                  <div className="font-medium">{option.label}</div>
                                  <div className="text-sm text-muted-foreground">{option.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentType === 'zebra' && (
                <FormField
                  control={form.control}
                  name={`blinds.${index}.opacity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Light Control</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select opacity type" />
                          </SelectTrigger>
                          <SelectContent>
                            {opacityOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div>
                                  <div className="font-medium">{option.label}</div>
                                  <div className="text-sm text-muted-foreground">{option.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name={`blinds.${index}.operationType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operation Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value !== 'motorized') {
                            form.setValue(`blinds.${index}.motorOption`, undefined);
                          }
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cord" id={`cord-${index}`} />
                          <Label htmlFor={`cord-${index}`}>Corded</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cordless" id={`cordless-${index}`} />
                          <Label htmlFor={`cordless-${index}`}>Cordless</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="motorized" id={`motorized-${index}`} />
                          <Label htmlFor={`motorized-${index}`}>Motorized</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch(`blinds.${index}.operationType`) === "motorized" && (
                <FormField
                  control={form.control}
                  name={`blinds.${index}.motorOption`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motor Type</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select motor type" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            {motorOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex flex-col">
                                  <span>{option.label}</span>
                                  <span className="text-xs text-muted-foreground">{option.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
<FormField
  control={form.control}
  name={`blinds.${index}.style`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Style Preference</FormLabel>
      <FormControl>
        {currentType === 'zebra' ? (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select a Zebra style" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {filteredZebra.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : currentType === 'roller' ? (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select a Roller style" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {filteredRoller.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : currentType === 'honeycomb' ? (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder={`Select a ${honeycombCell} style`} />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {filteredHoneycomb.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input placeholder="Enter catalog code or name" {...field} />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            </div>
          </div>
          
          <div className="mt-4">
            <FormField
              control={form.control}
              name={`blinds.${index}.notes`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Any specific requirements for this blind?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          {/* Product Viewer */}
          <ProductCarouselViewer 
            images={viewerItems}
            open={viewerOpen}
            initialIndex={viewerIndex}
            title={currentType === 'roller' ? 'Select Roller Style' : currentType === 'honeycomb' ? `Select Honeycomb Style (${honeycombCell})` : 'Select Zebra Style'}
            productType={currentType}
            onClose={(i) => { setViewerOpen(false); setViewerIndex(i); }}
            onSelect={(img, i) => {
              form.setValue(`blinds.${index}.style`, img.name, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
              form.setValue(`blinds.${index}.productCode`, img.code || '', { shouldDirty: true, shouldTouch: true, shouldValidate: true });
              setViewerOpen(false);
              setViewerIndex(i);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BlindConfig;
