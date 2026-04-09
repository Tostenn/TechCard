# ⚡ TechCard v1.1

**Your TypeScript-powered tech identity. Elegant, Isolated, and Fully Customizable.**

TechCard is an ultra-lightweight profile widget designed to provide an instant professional showcase for developers. Built with **TypeScript** and **Shadow DOM**, it ensures a perfect, conflict-free render on any website, from static portfolios to complex React/Vue applications.

**[Explore Live Demo](https://tostenn.github.io/TechCard/)** | **[View Themes](docs/THEMES.md)**

-----

## 🚀 What's New in v1.1?

The v1.1 update introduces a complete architectural shift to the **Builder Pattern**, moving away from rigid configuration objects toward a fluid, developer-friendly API.

  * **Fluent API:** Chain methods like `.setUser().setTheme().build()` for a cleaner workflow.
  * **Unlimited Themes:** Inject dynamic RGB variables to match any brand identity.
  * **Live Rebuild:** Update your card's content or style in real-time without refreshing the page.
  * **Data Validation:** The `.build()` method ensures your data is complete before rendering.

-----

## 📦 Installation

### 1\. Via CDN (Quickest)

Ideal for personal portfolios or simple HTML sites.

```html
<script src="https://cdn.jsdelivr.net/npm/techcard@1.1.0/dist/techcard.js"></script>
```

### 2\. Via NPM

For modern JavaScript/TypeScript projects.

```bash
npm install techcard
```

-----

## 🛠️ Usage: The Builder API

TechCard v1.1 uses a **Fluent Interface**. You can configure and deploy your card in seconds:

```javascript
import { TechCard } from 'techcard';

const myCard = new TechCard();

myCard
  .setCard("solo") // Options: "solo", "solo-mini"
  .setUser({
    name: "Tosten Kouya",
    role: "Full-Stack Developer",
    avatar: "https://your-photo.com/me.jpg",
    socials: [
      { name: "github", url: "https://github.com/Tostenn" },
      { name: "linkedin", url: "https://linkedin.com/in/tosten-kouya" }
    ]
  })
  .setContent({
    projectGoal: "## Building the future\nCreating tools that empower developers.",
    techStack: {
      backend: [{ name: "Laravel" }, { name: "Python" }],
      frontend: [{ name: "React" }, { name: "Tailwind" }]
    }
  })
  .setTheme("vscode-dark", {
    "bg": "30 30 30",
    "accent": "0 122 204",
    "radius-card": "4px"
  })
  .build(); // Validates and prepares the DOM

// Display the card
myCard.open();
```

-----

## 🎨 Unlimited Theming

Forget about pre-defined Light/Dark modes. TechCard now allows you to override every CSS variable using RGB values. This allows for total harmony with your site's design.

> **Tip:** You can switch themes on the fly using `myCard.setTheme(...).rebuild()`.

[**Explore the 10+ Community Themes →**](/docs/THEMES.md)

-----

## 📚 Deep Dive Documentation

To keep the main README concise, we have expanded our documentation into specific guides:

### 🌟 [The Vision](/docs/VISION.md)

Why TechCard exists. Discover our core pillars: the Creator's Signature, Technical Transparency, and Frictionless Connectivity.

### 🏗️ [Architecture & Logic](/docs/ARCHITECTURE.md)

Understand how we use **Shadow DOM** for CSS isolation, how the **Builder Pattern** manages state, and why we chose a zero-dependency approach.

### 🎨 [Theming Guide](/docs/THEMES.md)

A comprehensive manual on the CSS variable system. Includes a library of ready-to-use themes (Dracula, Nord, Tokyo Night, etc.) and instructions on how to build your own.

### 🛠️ [Development & Contribution](/docs/DEVELOPMENT.md)

Ready to help? Learn how to set up the local environment, add new icons to the library, and submit Pull Requests.

-----

## 🤝 Contributing

TechCard is a community-driven project. We welcome contributions for:

  * New **Icons** for social networks or tech stacks.
  * New **Layouts** (Team cards, Project-specific cards).
  * **Accessibility (A11y)** improvements.

Please read our [Contributing Guide](/docs/DEVELOPMENT.md) to get started.

## 📄 License

TechCard is released under the **MIT License**. Feel free to use it, fork it, and improve it\!

-----

**Built with  by [Tosten Kouya](https://github.com/Tostenn)**
*Helping developers leave their signature on the web.*
