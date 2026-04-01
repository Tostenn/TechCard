import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {

  return {
    base: '/TechCard/',
    build: {
      // Configuration de la Librairie (pour le CDN)
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "TechCard",
        fileName: (format) => (format === "umd" ? `techcard.js` : `techcard.mjs`),
        formats: ["umd", "es"],
      },
      rollupOptions: {
        // Si on build le site, on a besoin de l'index.html
        // Si on build la lib, Rollup s'occupe de l'entry point défini plus haut
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          exports: "named",
          extend: true,
        },
      },
      minify: "terser",
      // On laisse la commande npm écraser l'outDir
      outDir: "dist", 
    },
    plugins: [dts()],
  };
});