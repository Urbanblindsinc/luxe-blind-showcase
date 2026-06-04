
import { z } from "zod";

export const blindSchema = z.object({
  width: z.string().min(1, { message: "Width is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  blindType: z.enum(["roller", "zebra", "honeycomb"], {
    required_error: "Blind type is required"
  }),
  operationType: z.enum(["cord", "cordless", "motorized"], {
    required_error: "Operation type is required"
  }),
  motorOption: z.enum(["standard", "zigbee", "matter"]).optional(),
  honeycombCell: z.enum(["25mm", "38mm"]).optional(),
  opacity: z.enum(["BLACKOUT", "SEMI-BLACKOUT", "LIGHT FILTERING"]).optional(),
  style: z.string().optional(),
  roomLocation: z.string().optional(),
  notes: z.string().optional(),
  cassetteStyle: z.enum(["square", "curved"]).optional(),
  cassetteColor: z.enum(["black", "brown", "gray", "beige", "white"]).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  preferredContact: z.enum(["email", "phone"]).default("email"),
  promoCode: z.string().optional(),
});

export const quoteFormSchema = z.object({
  blinds: z.array(blindSchema).min(1, { message: "At least one blind is required" }),
  contact: contactSchema,
});

export type BlindFormValues = z.infer<typeof blindSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const defaultBlind: BlindFormValues = {
  width: "",
  height: "",
  blindType: "roller",
  operationType: "cord",
  motorOption: undefined,
  honeycombCell: "25mm",
  opacity: undefined,
  style: "",
  roomLocation: "",
  notes: "",
  cassetteStyle: "square",
  cassetteColor: "white",
};
