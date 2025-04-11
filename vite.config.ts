// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@handlers": path.resolve(__dirname, "./handlers"),
      "@utils": path.resolve(__dirname, "./utils"),
    },
  },
  // Make environment variables available to client-side code
  define: {
    "process.env.CF_R2_PUBLIC_URL": JSON.stringify(
      process.env.CF_R2_PUBLIC_URL
    ),
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Adjust this to match your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Added build optimizations
  build: {
    // Target modern browsers for better performance
    target: "es2020",
    // Enable minification and optimize chunks
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        // Aggressive optimizations
        passes: 2,
      },
    },
    // Chunk size optimization
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libraries for better caching
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
  // Reduce dev server verbosity
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
