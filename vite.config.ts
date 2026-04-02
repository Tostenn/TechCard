import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library';

  return {
    base: '/TechCard/',
    build: {
      // Si mode library, on build dans dist. Sinon (site), dans build.
      outDir: isLibrary ? "dist" : "build",
      
      emptyOutDir: true,
      lib: isLibrary ? {
        entry: resolve(__dirname, "src/index.ts"),
        name: "TechCard",
        fileName: (format) => (format === "umd" ? `techcard.js` : `techcard.mjs`),
        formats: ["umd", "es"],
      } : undefined, // Désactive le mode lib pour le site afin d'inclure l'index.html
      rollupOptions: {
        input: isLibrary ? undefined : {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          exports: "named",
          extend: true,
        },
      },
      minify: "terser",
    },
    plugins: [
      dts({ 
        insertTypesEntry: true,
        rollupTypes: true,
      })
    ],
  };
});