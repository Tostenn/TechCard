import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      // Le point d'entrée de ton application
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TechCard',
      // Le nom du fichier généré
      fileName: 'techcard',
      // 'umd' permet l'usage via <script src="..."> et window.TechCard
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      // Si tu as des dépendances externes, elles vont ici
      external: [],
      output: {
        globals: {
          // Définir des variables globales pour les dépendances externes si nécessaire
        },
      },
    },
    outDir: 'build', // Dossier de sortie (ton dossier actuel de prod)
    minify: 'terser', // Compression maximale
  },
  plugins: [dts()],
});