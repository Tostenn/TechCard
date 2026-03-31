# 🎨 Themes & Customization

**TechCard** is designed to provide a consistent and elegant look. Currently, the project supports a set of built-in themes handled via internal logic to guarantee perfect Shadow DOM isolation.

-----

## 🚀 Future Feature: Theme Injection (Coming Soon)

> [\!NOTE]
> **Important:** In the current version, you cannot yet inject custom external themes or raw CSS objects directly via the constructor. This feature is a high priority on our **Roadmap (v2.0)**.

In future releases, we plan to allow:

  * **Custom Object Injection**: Passing a JSON object of tokens (colors, spacing, fonts).
  * **Remote Theme Loading**: Loading `.json` or `.css` theme files from a URL.
  * **Real-time Theming**: Switching visual styles dynamically after the card is initialized.

-----

## 🛠️ How to Propose a Built-in Theme

Even if dynamic injection is not yet available, you can contribute by adding **New Native Themes** to the core repository.

### 1\. Current Theme Logic

Currently, themes are defined by a `theme` string in the options (`"dark"` or `"light"`). The styles are pre-compiled and injected into the Shadow Root at runtime.

### 2\. Proposing a Design

If you have a design idea (like *Glassmorphism*, *Neumorphism*, or *Terminal Retro*):

1.  **Prepare your CSS**: Create a set of variables for backgrounds, text colors, and borders.
2.  **Open an Issue**: Share your design or a mockup with the community.
3.  **Submit a PR**: If you're comfortable with TypeScript, you can modify the `src/TechCard.ts` render logic to include your new theme class.

-----

## 📐 Styling Guidelines

To ensure your theme proposal is accepted, please follow these rules:

  * **Isolation**: All styles must be compatible with the Shadow DOM (use `:host` for root styling).
  * **Performance**: Avoid heavy assets. Prefer CSS gradients and system font stacks.
  * **Accessibility**: Maintain a minimum contrast ratio of 4.5:1 for body text.
  * **Responsive**: Your theme must adapt to both `solo` (full) and `solo-mini` (compact) formats.

-----

## 🎨 Planned Themes

  * **Glass**: Semi-transparent backgrounds with backdrop-filter blur.
  * **Retro**: High-contrast, monospaced fonts, terminal-inspired green/black.
  * **Minimalist**: Thin borders, high whitespace, and monochromatic colors.

-----

**Want to help build the Theme Injection API?** Check our **[Development Guide](https://www.google.com/search?q=./DEVELOPMENT.md)** and join the discussion on GitHub\!

-----

### Pourquoi c'est bien de le mettre ainsi :

1.  **Professionnalisme** : Tu montres que tu as déjà réfléchi à l'évolution de ton architecture (SaaS, API de thèmes).
2.  **Engagement** : Ça donne envie aux autres de t'aider à coder cette fameuse "v2" plutôt que d'attendre qu'elle soit finie.
3.  **Clarté** : Un développeur ne perdra pas de temps à essayer d'injecter du CSS qui n'est pas encore supporté.

Est-ce que cette structure te convient pour ton dossier `docs/` ? Tu as maintenant une documentation complète et honnête \!