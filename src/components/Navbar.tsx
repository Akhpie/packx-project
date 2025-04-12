import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Define navigation items
interface NavItem {
  name: string;
  path: string;
}

// Mobile notification interface
interface MobileNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name: "Innovation Lab", path: "/innovation-lab" },
  { name: "Sustainability", path: "/sustainability" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

// Mobile notification component
const MobileNotification: React.FC<MobileNotificationProps> = ({
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-emerald-500/30 shadow-xl max-w-sm w-full"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Desktop Experience Only
              </h3>
              <p className="text-gray-300 mb-4">
                Our 3D experience is optimized for desktop devices with keyboard
                controls. Please visit on a desktop browser for the full
                immersive experience.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileNotificationVisible, setIsMobileNotificationVisible] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Custom navigation handler that scrolls to top
  const handleNavigation = (path: string) => {
    // Show notification for Experience page on mobile
    if (path === "/experience" && isMobile) {
      setIsMobileNotificationVisible(true);
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      return;
    }

    navigate(path);
    // Ensure page scrolls to top on navigation
    window.scrollTo(0, 0);
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
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
          <button
            onClick={() => handleNavigation("/")}
            className="text-white text-2xl font-bold"
          >
            PackX
          </button>

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
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`px-4 py-2 rounded-full transition-colors duration-300 text-sm ${
                        isActive(item.path)
                          ? "bg-emerald-600 text-white"
                          : item.name === "Experience"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </button>
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
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`block px-3 py-2 rounded-lg w-full text-left ${
                      isActive(item.path)
                        ? "bg-emerald-600 text-white"
                        : item.name === "Experience"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.nav>

      {/* Mobile notification for Experience page */}
      <MobileNotification
        isVisible={isMobileNotificationVisible}
        onClose={() => setIsMobileNotificationVisible(false)}
      />
    </>
  );
};

export default Navbar;
