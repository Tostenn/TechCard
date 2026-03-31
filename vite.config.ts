import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TechCard",
      // On utilise une fonction pour définir le nom du fichier
      fileName: (format) => {
        if (format === "umd") return `techcard.js`; // Force .js pour l'UMD
        return `techcard.mjs`; // Garde .mjs pour l'ESM (standard pour type: module)
      },
      formats: ["umd", "es"],
    },
    rollupOptions: {
      output: {
        exports: "named",
        extend: true,
      },
    },
    minify: "terser",
    outDir: "build",
  },
  plugins: [dts()],
});