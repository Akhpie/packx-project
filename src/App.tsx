import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import BoxesScene from "./components/scene/BoxesScene";
import Footer from "./components/pages/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [showAllBoxes, setShowAllBoxes] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll event to hide/show the button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide button when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Router>
      <div className="bg-black min-h-screen">
        {/* Navbar will be present on all pages */}
        <Navbar />

        {/* Enhanced demo button with show/hide functionality */}
        <div
          className={`fixed top-20 right-4 z-40 transform duration-300 ease-in-out ${
            showButton
              ? "translate-x-0 opacity-100"
              : "translate-x-20 opacity-0"
          }`}
        >
          <button
            onClick={() => setShowAllBoxes(!showAllBoxes)}
            className="group relative overflow-hidden px-6 py-3 rounded-lg font-medium duration-300"
          >
            {/* Button background with gradient and glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 shadow-lg group-hover:shadow-emerald-500/50"></span>

            {/* Subtle animated shine effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-30 duration-500 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] translate-x-[-100%] group-hover:translate-x-[200%]"></span>

            {/* Button content with icon */}
            <span className="relative flex items-center text-white">
              {showAllBoxes ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1v-7m-10 1h4"
                    ></path>
                  </svg>
                  Back to Main Site
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                  Show All Boxes Demo
                </>
              )}
            </span>

            {/* Button border glow */}
            <span className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-white/40 duration-300"></span>
          </button>
        </div>

        {showAllBoxes ? <BoxesScene /> : <AppRoutes />}

        {/* Footer (only shown when not in BoxesScene mode) */}
        {!showAllBoxes && <Footer />}
      </div>
    </Router>
  );
}

export default App;
