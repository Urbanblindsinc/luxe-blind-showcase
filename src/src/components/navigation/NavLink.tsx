
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./navData";
import { scrollToSection } from "@/utils/scrollToSection";

interface NavLinkProps {
  link: NavItem;
  isActive: boolean;
  onToggle: () => void;
  onDropdownItemClick?: () => void;
}

export const NavLink = ({ link, isActive, onToggle, onDropdownItemClick }: NavLinkProps) => {
  if (link.hasDropdown) {
    return (
      <div className="relative group">
        <button 
          onClick={onToggle}
          className="flex items-center space-x-2 py-2 font-display font-bold text-xl transition-colors hover:text-primary text-foreground/90"
        >
          <span>{link.title}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
        </button>

        {isActive && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg overflow-hidden animate-fade-in">
            <div className="py-1">
              {link.dropdownItems?.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="block px-6 py-3 text-sm hover:bg-gray-50 transition-colors"
                  onClick={onDropdownItemClick}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="h-4 w-4 mr-2 text-primary" />}
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Handle scroll navigation for hash links
  if (link.path.startsWith('#')) {
    return (
      <button
        onClick={() => scrollToSection(link.path.substring(1))}
        className="py-2 font-display font-bold text-xl transition-colors hover:text-primary text-foreground/90"
      >
        {link.title}
      </button>
    );
  }

  return (
    <Link
      to={link.path}
      className="py-2 font-display font-bold text-xl transition-colors hover:text-primary text-foreground/90"
    >
      {link.title}
    </Link>
  );
};
