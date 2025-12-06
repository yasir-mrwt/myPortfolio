/**
 * Vite Configuration - Optimized for Production Deployment
 *
 * Vite is a fast build tool for modern web applications.
 *
 * How it works:
 * - Uses native ES modules in development for instant HMR
 * - Bundles with Rollup for optimized production builds
 * - Supports React Fast Refresh for instant component updates
 *
 * This config:
 * - Enables React plugin for JSX transformation
 * - Sets up development server on port 5173
 * - Configures build output directory
 * - Optimizes bundle size with code splitting
 * - Handles asset management for production
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    port: 5173,
    open: true, // Auto-open browser on dev server start
    host: true, // Listen on all addresses (useful for mobile testing)
  },

  // Build configuration for production
  build: {
    outDir: "dist",
    sourcemap: false, // Disable sourcemaps in production for smaller bundle

    // Optimize assets
    assetsInlineLimit: 4096, // Files smaller than 4kb will be inlined as base64

    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },

    // Optimize bundle size with code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          vendor: ["react", "react-dom", "react-router-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          animation: ["framer-motion"],
          icons: ["lucide-react"],
        },

        // Naming pattern for chunks
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },

    // Increase chunk size warning limit (for large Three.js bundles)
    chunkSizeWarningLimit: 1000,
  },

  // Asset handling
  assetsInclude: ["**/*.pdf"], // Include PDF files (for CV download)

  // Preview server (for testing production build locally)
  preview: {
    port: 4173,
    open: true,
  },
});
