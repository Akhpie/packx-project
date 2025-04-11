import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Add scrolling detection for scrollbar effects
let scrollTimer: number | null = null;

const handleScroll = () => {
  document.documentElement.classList.add("is-scrolling");

  // Clear previous timer
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  // Remove class after scrolling stops
  scrollTimer = window.setTimeout(() => {
    document.documentElement.classList.remove("is-scrolling");
  }, 1000) as unknown as number;
};

// Add scroll event listener
window.addEventListener("scroll", handleScroll, { passive: true });
