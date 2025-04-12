import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "./magicui/globe";
import { Meteors } from "./magicui/meteors";

// Mobile notification interface
interface MobileNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

// Mobile notification component (same as in Navbar)
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

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileNotificationVisible, setIsMobileNotificationVisible] =
    useState<boolean>(false);
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

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle the "Take a Virtual Tour" button click
  const handleVirtualTourClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      e.preventDefault();
      setIsMobileNotificationVisible(true);
    } else {
      navigate("/experience");
    }
  };

  return (
    <div
      className="relative h-screen max-full bg-black overflow-hidden"
      ref={containerRef}
    >
      <Meteors
        number={25}
        color="#00ff88"
        tailLength={120}
        sizeMin={0.8}
        sizeMax={2}
        minDuration={4}
        maxDuration={12}
      />
      {/* 3D background canvas */}
      <Globe className="top-60 opacity-85 w-full max-w-[1200px]" />

      {/* Main hero content with parallax effect */}
      <div
        className="relative z-10 flex h-full items-center justify-center px-4"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="text-center">
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-block"
            >
              <div className="text-white font-bold px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-800 mb-6 inline-block">
                INNOVATE · PROTECT · SUSTAIN
              </div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            The Future of <br />
            <div className="text-5xl font-extrabold tracking-tighter md:text-5xl lg:text-7xl z-auto">
              <div className="bg-gradient-to-b from-blue-400 via-blue-400 to-purple-600 text-transparent bg-clip-text inline-block pb-4 pt-4">
                Packaging
              </div>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white max-w-2xl mx-auto mb-10 font-medium text-shadow-md"
          >
            Innovative sustainable solutions engineered for tomorrow's world,
            delivering premium protection with minimal environmental impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/solutions"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-center font-medium shadow-lg"
            >
              Explore Solutions
            </Link>
            {/* Modified to use onClick handler instead of direct Link navigation */}
            <button
              onClick={handleVirtualTourClick}
              className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/40 rounded-lg transition-colors text-center font-medium shadow-lg"
            >
              Take a Virtual Tour
            </button>
          </motion.div>

          {/* Call to action buttons */}
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5L12 19M12 19L18 13M12 19L6 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile notification for Experience page */}
      <MobileNotification
        isVisible={isMobileNotificationVisible}
        onClose={() => setIsMobileNotificationVisible(false)}
      />
    </div>
  );
};

export default Hero;
