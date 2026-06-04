
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { NavLink } from "./navigation/NavLink";
import { MobileNav } from "./navigation/MobileNav";
import { navLinks } from "./navigation/navData";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { getTotalItems } = useCart();
  const hasItems = getTotalItems() > 0;

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <header className="fixed top-8 md:top-10 left-0 right-0 z-30 transition-all duration-300 bg-white shadow-sm py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="font-display mr-12"
          aria-label="Urban Blinds Home"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tracking-tight text-black">URBAN</span>
            <span className="text-xs tracking-widest uppercase -mt-1 text-black">BLINDS</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center">
          <div className="flex items-center space-x-12">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                link={link}
                isActive={activeDropdown === link.title}
                onToggle={() => toggleDropdown(link.title)}
                onDropdownItemClick={() => setActiveDropdown(null)}
              />
            ))}
          </div>
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/build-your-blind">
            <Button size="sm" className="gap-1">
              Build Your Blind
            </Button>
          </Link>
          {hasItems && (
            <Cart>
              <Button size="sm" variant="secondary">
                Request Quote
              </Button>
            </Cart>
          )}
          <Cart>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Cart>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          {hasItems && (
            <Cart>
              <Button size="sm" variant="secondary" className="text-xs">
                Request Quote
              </Button>
            </Cart>
          )}
          <button
            className="flex items-center text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Cart>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Cart>
        </div>
      </div>

      <MobileNav
        isOpen={isOpen}
        activeDropdown={activeDropdown}
        navLinks={navLinks}
        onDropdownToggle={toggleDropdown}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
};

export default Navbar;
