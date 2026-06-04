
import { Leaf, Shield, Sun } from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  hasDropdown: boolean;
  dropdownItems?: {
    title: string;
    path: string;
    icon?: any;
  }[];
}

export const navLinks: NavItem[] = [
  { 
    title: "About Us", 
    path: "/#about-us", 
    hasDropdown: false
  },
  { 
    title: "Contact Us", 
    path: "/#contact-us", 
    hasDropdown: false
  },
  { 
    title: "FAQ", 
    path: "/#faq", 
    hasDropdown: false
  },
];
