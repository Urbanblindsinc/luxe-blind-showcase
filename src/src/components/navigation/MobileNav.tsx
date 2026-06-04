
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./navData";
import { scrollToSection } from "@/utils/scrollToSection";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  activeDropdown: string | null;
  navLinks: NavItem[];
  onDropdownToggle: (title: string) => void;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, activeDropdown, navLinks, onDropdownToggle, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 animate-fade-in">
      <nav className="container px-6 py-8 flex flex-col space-y-6">
        <Link to="/build-your-blind" onClick={onClose}>
          <Button className="w-full" size="lg">Build Your Blind</Button>
        </Link>
        {navLinks.map((link, index) => (
          <div key={index} className="flex flex-col">
            {link.hasDropdown ? (
              <>
                <button 
                  onClick={() => onDropdownToggle(link.title)}
                  className="flex items-center justify-between py-2 text-lg font-medium border-b border-gray-100"
                >
                  <span>{link.title}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === link.title ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === link.title && (
                  <div className="mt-2 ml-4 flex flex-col space-y-3 animate-fade-in">
                    {link.dropdownItems?.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="py-2 text-foreground/80"
                        onClick={() => {
                          onDropdownToggle(link.title);
                          onClose();
                        }}
                      >
                        <div className="flex items-center">
                          {item.icon && <item.icon className="h-4 w-4 mr-2 text-primary" />}
                          {item.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : link.path.startsWith('#') ? (
              <button
                onClick={() => {
                  scrollToSection(link.path.substring(1));
                  onClose();
                }}
                className="py-2 text-lg font-medium border-b border-gray-100 text-left"
              >
                {link.title}
              </button>
            ) : (
              <Link
                to={link.path}
                className="py-2 text-lg font-medium border-b border-gray-100"
                onClick={onClose}
              >
                {link.title}
              </Link>
            )}
          </div>
        ))}
        
      </nav>
    </div>
  );
};
