This is the definitive and professionally structured version of **THEMES.md** for **TechCard v1.1**. It replaces the old "Roadmap" language with current, functional documentation for the new **Design Token System**.

-----

# 🎨 Themes & Customization Guide (v1.1)

TechCard v1.1 introduces a powerful **Dynamic Theming Engine**. You are no longer restricted to basic "Light" or "Dark" modes. By leveraging the **Shadow DOM** and **CSS Variables (Design Tokens)**, you can inject a completely custom identity into your card in real-time.

-----

## 🚀 The Core Concept: Design Tokens

TechCard exposes a set of CSS variables that control every visual aspect of the widget. When you use the `.setTheme()` method, the engine injects these variables into the Shadow Root, ensuring your styles are applied without leaking into the host website.

### ⚠️ The RGB Format Requirement

To ensure compatibility with Tailwind CSS's opacity modifiers and glassmorphism effects, all color variables **MUST** be provided as **space-separated RGB values** without brackets.

  * ✅ **Correct:** `"79 70 229 / 0.5"`
  * ❌ **Incorrect:** `"#4f46e5"` or `"rgb(79, 70, 229)"`

-----

### 🏷️ Variable Nomenclature

To keep the API clean, the keys used in the `.setTheme()` configuration object map directly to the internal CSS variables by stripping the `--tc-` prefix.

* ✅ **Correct Key:** `"text-primary"`
* ❌ **Incorrect Key:** `"--tc-text-primary"`

-----

## 🛠️ How to Use the Theming API

You can apply a theme during initialization or update it dynamically using the Fluent API.

```javascript
myCard.setTheme("my-custom-theme", {
  "bg": "10 10 12",
  "surface": "20 20 25",
  "accent": "255 0 115",
  "text-primary": "255 255 255",
  "radius-card": "12px"
});

// If the card is already open, use rebuild to see changes:
myCard.rebuild();
```

-----

## 📚 Official Preset Library

Here are the most popular community-driven presets. You can use these values directly in your `setTheme` configuration.

### 1\. VS Code Dark Modern (Standard)

*The classic IDE look for the professional developer.*

```javascript
{
  "bg": "30 30 30",
  "surface": "37 37 38",
  "border": "64 64 64",
  "accent": "0 122 204",
  "text-primary": "204 204 204",
  "radius-card": "4px"
}
```

### 2\. Tokyo Night (Trending)

*Deep blues and neon accents for a modern "Ricers" aesthetic.*

```javascript
{
  "bg": "26 27 38",
  "surface": "31 35 53",
  "accent": "122 162 247",
  "text-primary": "169 177 214",
  "radius-card": "16px"
}
```

### 3\. Cyberpunk 2077 (High Impact)

*For those who want their identity to scream "Future".*

```javascript
{
  "bg": "0 0 0",
  "surface": "20 20 20",
  "accent": "243 230 0",
  "text-primary": "255 255 255",
  "radius-card": "0px"
}
```

-----

## 📐 Reference: All Available Variables

### Colors (RGB format)

| Variable | Description |
| :--- | :--- |
| `--tc-bg` | Main background (Overlay) |
| `--tc-surface` | Primary card background |
| `--tc-surface-2` | Secondary surfaces (Headers, Code blocks) |
| `--tc-border` | Borders and dividers |
| `--tc-text-primary`| Headings and emphasized text |
| `--tc-text-muted` | Body text and descriptions |
| `--tc-accent` | Primary action color (Icons, Buttons) |
| `--tc-accent-hover`| Hover state for active elements |
| `--tc-accent-soft` | Subtle highlights (Badges backgrounds) |

### Geometry & Forms

| Variable | Default | Description |
| :--- | :--- | :--- |
| `--tc-radius-card` | `1.75rem` | Roundness of the main card |
| `--tc-radius-panel` | `1.5rem` | Roundness of internal sections |
| `--tc-radius-btn` | `0.75rem` | Roundness of action buttons |
| `--tc-radius-avatar`| `9999px` | Use `0px` for square, `50%` for circle |

### Effects

| Variable | Description |
| :--- | :--- |
| `--tc-overlay-blur` | Intensity of the background blur (ex: `8px`) |
| `--tc-shadow-card` | Shadow depth of the card (ex: `0 20px 25px -5px rgba(0, ....`) |
| `--tc-shadow-hover` | Shadow depth of the card (ex: `0 20px 25px -5px rgba(0, ....`) |

-----

## 💡 Best Practices

1.  **Accessibility First**: Always test your `text-primary` color against your `surface` color. Aim for a contrast ratio of at least 4.5:1.
2.  **Consistency**: If you choose sharp corners (`radius: 0px`), apply it to the card, buttons, and panels to maintain a "Brutalist" look.
3.  **Real-time Switching**: You can create a "Theme Switcher" on your site that calls `myCard.setTheme(...).rebuild()` to let users preview different styles.

-----

**Have you created a beautiful theme?** Submit a [Pull Request](https://github.com/Tostenn/TechCard/pulls) with your configuration to have it featured in this documentation\!

[← Back to README](../readme.md) | [Explore Architecture →](./ARCHITECTURE.md)