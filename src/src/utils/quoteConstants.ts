
import { LucideIcon, User, Mail, Phone, Truck, Tag } from "lucide-react";

export const blindTypes = [
  { value: "roller", label: "Roller Blinds", image: "/lovable-uploads/cc46ef48-e3b0-4016-b6a8-6e47d013bb08.png" },
  { value: "zebra", label: "Zebra Blinds", image: "/lovable-uploads/559c866a-e1c8-4963-9f6b-cc16c68d4001.png" },
  { value: "honeycomb", label: "Honeycomb Blinds", image: "/lovable-uploads/cc46ef48-e3b0-4016-b6a8-6e47d013bb08.png" },
];

export const motorOptions = [
  { value: "standard", label: "Standard Motor", description: "Basic motor with remote control" },
  { value: "zigbee", label: "Zigbee Motor", description: "Compatible with Zigbee smart home systems" },
  { value: "matter", label: "Matter Motor", description: "Works with all Matter-compatible systems" },
];

export const opacityOptions = [
  { value: "BLACKOUT", label: "Blackout", description: "Blocks most light for complete privacy" },
  { value: "SEMI-BLACKOUT", label: "Semi-Blackout", description: "Reduces light while maintaining some visibility" },
  { value: "LIGHT FILTERING", label: "Light Filtering", description: "Filters light while preserving natural brightness" },
];

export const contactFields = [
  { 
    name: "name",
    label: "Full Name",
    icon: User,
    placeholder: "John Doe",
    required: true
  },
  {
    name: "email",
    label: "Email Address",
    icon: Mail,
    placeholder: "john@example.com",
    type: "email",
    required: true
  },
  {
    name: "phone",
    label: "Phone Number",
    icon: Phone,
    placeholder: "(555) 123-4567",
    optional: true
  },
  {
    name: "address",
    label: "Delivery Address",
    icon: Truck,
    placeholder: "123 Main St, City, State, ZIP",
    optional: true
  }
];
