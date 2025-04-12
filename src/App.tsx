import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
// Lazy load BoxesScene since it's a heavy 3D component
const BoxesScene = lazy(() => import("./components/scene/BoxesScene"));
import Footer from "./components/pages/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Box, Boxes, Home } from "lucide-react";
import Preloader from "./components/ui/Preloader";

function App() {
  const [showAllBoxes, setShowAllBoxes] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint
    };

    // Check on initial load
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <div className="bg-black min-h-screen">
        {isLoading ? (
          <Preloader
            isLoading={isLoading}
            onLoadingComplete={handleLoadingComplete}
          />
        ) : (
          <>
            <Navbar />

            <div
              className={`fixed top-20 right-4 z-40 transform duration-300 ease-in-out hidden md:block ${
                showButton
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            ></div>

            {showAllBoxes ? (
              <Suspense
                fallback={
                  <div className="h-screen flex items-center justify-center text-white">
                    Loading 3D Scene...
                  </div>
                }
              >
                <BoxesScene />
              </Suspense>
            ) : (
              <AppRoutes />
            )}

            {/* Footer (only shown when not in BoxesScene mode) */}
            {!showAllBoxes && <Footer />}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
