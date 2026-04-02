// vite.config.ts
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  base: '/TechCard/',
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TechCard",
      fileName: (format) => (format === "umd" ? `techcard.js` : `techcard.mjs`),
      formats: ["umd", "es"],
    },
    rollupOptions: {
      output: {
        exports: "named",
        extend: true,
      },
    },
    minify: "terser",
    outDir: "dist", 
  },
  plugins: [
    dts({ 
      insertTypesEntry: true, // Ajoute automatiquement le champ types dans le package.json (si absent)
      rollupTypes: true,      // Fusionne tous les .d.ts en un seul index.d.ts
    })
  ],
});