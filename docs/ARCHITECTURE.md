# 🏗️ Architecture Design - TechCard v1.1

This document describes the technical core of **TechCard**, with a focus on style isolation, the rendering engine, and the implementation of the Builder Pattern.

## 📂 Project Structure

```text
TechCard/
├── docs/                 # Specialized documentation
├── src/
│   ├── TechCard.ts       # Entry point & Orchestrator (Builder API)
│   ├── components/       # Rendering classes (BaseCard, CardSolo...)
│   ├── types/            # TypeScript interfaces and types
│   ├── utils/            # Markdown engine, icons, and DOM helpers
│   └── index.css         # Tailwind styles (Source)
├── public/               # Static assets & demos
├── vite.config.ts        # Build configuration (UMD/ESM)
└── tailwind.config.js    # Design system configuration
```

---

## 🏗️ The Builder Pattern & Fluent API

In version 1.1, TechCard moved away from a simple object-based configuration in favor of the **Builder Pattern**. This architectural choice offers several advantages:

* **State Accumulation**: Methods like `.setUser()` or `.setTheme()` update an internal state without triggering expensive DOM renders immediately.
* **Validation Gate**: The `.build()` method acts as a synchronous validator. It ensures that all required fields are present before the rendering engine starts.
* **Fluent Interface**: By returning `this` at each step, we provide a natural and modern API for developers.

---

## 🛡️ The Shadow DOM Strategy

One of the biggest challenges of a third-party widget is **CSS leakage**. We do not want the host site’s styles to break our card, and vice versa.

To solve this, TechCard uses **Shadow DOM (Open Mode)**:

* **Encapsulation**: All the card’s HTML and CSS are contained within a Shadow Root.
* **Isolation**: The host site’s global CSS rules do not cross the Shadow DOM boundary.
* **Performance**: The browser treats the Shadow DOM as a separate tree, optimizing rendering.

---

## 🎨 Tailwind CSS & Dynamic Injection

Since Tailwind normally generates a global stylesheet, we adapted it for the Shadow DOM through dynamic injection.

1. **The “Inline” trick**: In `TechCard.ts`, we import the styles using Vite’s `?inline` suffix.
2. **Injection process**: When `new TechCard()` is called, we create a `<style>` element, fill it with the CSS processed by PostCSS, and append it directly to the **Shadow Root**.
3. **Result**: The card is **self-contained**. No external `.css` file is required by the end user.

---

## 🧩 Component Hierarchy (Inheritance)

To keep the code DRY (*Don’t Repeat Yourself*), we use a class inheritance model for the different layouts:

1. **BaseCard (Abstract)**: Contains shared logic (SVG icon injection, Markdown parsing, base structure).
2. **CardSolo / CardSoloMini**: Specialized classes that extend `BaseCard` to implement specific designs.

This structure makes it easy to add new layouts (for example `CardTeam`) by extending the base logic.

---

## 🔄 Lifecycle & Rendering

The lifecycle of a TechCard instance follows these precise steps:

1. **Initialization**: `new TechCard()` prepares the default options and global event listeners.
2. **Configuration**: The user chains methods to populate the profile data.
3. **Build**: `.build()` validates the data and prepares the final HTML template.
4. **Mounting**: `.open()` injects the **Shadow Host** into the document body.
5. **Rebuild**: `.rebuild()` lets you update the card (for example, change the theme) without destroying the instance.

---

## ⚡ Zero-Dependency Philosophy

TechCard is built in **Pure TypeScript**.

* **No Framework**: We do not use React or Vue to avoid inflating the bundle and causing version conflicts.
* **Custom Markdown Parser**: Instead of a heavy library, we use a lightweight utility (`src/utils/markdown.ts`) to handle basic formatting (bold, links).
* **Icon System**: Icons are stored as optimized SVG path mappings, injected only when needed to keep the bundle **under 25kb**.

---

## ⌨️ Global Event Listeners

To support the **`Ctrl + Alt + D`** shortcut, TechCard attaches a single listener to the global `window` object.

* **Optimization**: The listener is passive and only triggers the existing instance’s toggle mechanism.

---

**Author**: [Tosten Kouya](https://github.com/Tostenn)
**Version**: 1.1.x
**License**: MIT
