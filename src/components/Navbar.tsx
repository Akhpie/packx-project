import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Define navigation items
interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "Innovation Lab", path: "/innovation-lab" },
  { name: "Sustainability", path: "/sustainability" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  // Handle scroll event to add transparency
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Get the current active path
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          PackX
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu - Pill shaped */}
        <div className="hidden md:block">
          <div className="bg-black/50 backdrop-blur-md rounded-full px-2 py-2 border border-white/10">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-full transition-colors duration-300 text-sm ${
                      isActive(item.path)
                        ? "bg-emerald-600 text-white"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 backdrop-blur-md mt-4 rounded-lg overflow-hidden"
        >
          <ul className="py-2">
            {navItems.map((item) => (
              <li key={item.path} className="px-4 py-2">
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg ${
                    isActive(item.path)
                      ? "bg-emerald-600 text-white"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
