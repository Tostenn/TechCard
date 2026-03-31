# 🏗️ Architecture Design - TechCard

This document explains the technical core of **TechCard**, focusing on how we achieve total style isolation and a lightweight footprint.

## 📂 Project Structure

```text
TechCard/
├── docs
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── images
├── readme.md
├── src
│   ├── TechCard.ts
│   ├── components
│   │   ├── BaseCard.ts
│   │   ├── CardSolo.ts
│   │   └── CardSoloMini.ts
│   ├── index.css
│   ├── index.ts
│   ├── tests
│   │   ├── labo.html
│   │   └── main.html
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   ├── dom.ts
│   │   └── icons.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
---

## 🛡️ The Shadow DOM Strategy

One of the biggest challenges for a third-party widget is **CSS leakage**. We don't want the host website's styles to break our card, and we certainly don't want our styles to affect the host site.

To solve this, **TechCard** uses the **Shadow DOM (Open mode)**:
* **Encapsulation**: All HTML and CSS for the card are contained within a Shadow Root.
* **Isolation**: Global CSS rules from the host (like `div { background: red; }`) will not penetrate the Shadow Boundary.
* **Performance**: The browser treats the Shadow DOM as a separate, scoped tree, which can be more efficient for rendering small widgets.

---

## 🎨 Tailwind CSS & Dynamic Injection

Since Tailwind CSS normally generates a global stylesheet, we had to adapt it for the Shadow DOM.

### The "Inline" Trick
In our TypeScript source (`TechCard.ts`), we import our Tailwind styles using Vite's `?inline` suffix:
```typescript
import tailwindStyles from "./index.css?inline";
```

### The Injection Process
1.  **PostCSS** processes `@tailwind base`, `components`, and `utilities` during the build.
2.  The resulting CSS string is bundled directly into the JavaScript file.
3.  When `new TechCard()` is called, we create a `<style>` element, fill it with the processed CSS, and append it directly to the **Shadow Root**.

This ensures that the card is **self-contained**: you only need to import the `.js` file; no extra `.css` link is required.

---

## 📦 Build Pipeline & Tooling

The project leverages a modern toolchain to ensure the best developer experience and smallest bundle size:

* **Vite 8**: Used as the primary bundler for its extreme speed and native support for TypeScript and PostCSS.
* **TypeScript**: Provides the type safety necessary for a library intended to be used by others.
* **Terser**: Minifies the final UMD and ESM bundles to keep the footprint "ultra-lightweight".
* **Rollup (via Vite)**: Specifically configured to handle dual-format outputs (`.js` for UMD and `.mjs` for ESM) while maintaining clean global variable assignments.

---

## ⌨️ Global Event Listeners

To support the **`Ctrl + Alt + D`** shortcut, TechCard attaches a single listener to the global `window` object. 
* **Why "D"?** It stands for **Developer** and **Demo**, reinforcing our focus on the dev community.
* **Optimization**: The listener is lightweight and only triggers the toggle mechanism of the existing TechCard instance.

---

**Author**: [Kouya Tosten](https://github.com/Tostenn)  
**Version**: 1.2.0
