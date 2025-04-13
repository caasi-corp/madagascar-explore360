
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
    // Assurez-vous que tous les assets sont inclus dans le build
    assetsInlineLimit: 4096, // Fichiers plus petits que 4KB seront en base64
    outDir: 'dist', // Répertoire de sortie
    rollupOptions: {
      output: {
        manualChunks: {
          // Regrouper les dépendances React
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Regrouper les dépendances UI
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            // ... autres dépendances UI
          ],
          // Regrouper les utilitaires
          'vendor-utils': ['idb', 'date-fns', 'zod', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Générer des sources maps pour faciliter le débogage
    sourcemap: true,
  },
}));
