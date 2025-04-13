
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure all assets are included in the build
    assetsInlineLimit: 4096, // Files smaller than 4KB will be inlined as base64
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Empty output directory before building
    minify: 'terser', // Use terser for better minification
    sourcemap: true, // Generate source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Group UI dependencies
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            // ... autres dépendances UI
          ],
          // Group utilities
          'vendor-utils': ['idb', 'date-fns', 'zod', 'clsx', 'tailwind-merge'],
        },
        // Add hashes to filenames for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
    // Adding terser options to ensure it works properly
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console logs in production
        drop_debugger: mode === 'production', // Remove debugger statements in production
      },
      format: {
        comments: false, // Remove comments from the minified code
      },
    },
  },
}));
