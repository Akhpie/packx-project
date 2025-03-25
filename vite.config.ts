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
});
