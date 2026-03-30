
# ⚡ TechCard

**TechCard** is an elegant, ultra-lightweight, and highly customizable profile widget designed to be integrated into any website with a single line of code.

By leveraging **Shadow DOM**, TechCard remains completely isolated from the host site's CSS, ensuring a perfect render regardless of your framework or existing stylesheets.

**Live Demo:** [TechCard](https://tostenn.github.io/TechCard/)

---

## 🚀 Quick Start

No compilation or download required. Use the CDN directly:

```html
<script src="https://cdn.jsdelivr.net/gh/Tostenn/TechCard/build/techcard.js"></script>

<script>
  window.onload = () => {
    new window.TechCard({
      card: "solo",
      user: {
        name: "Kouya Tosten",
        role: "Full-Stack Developer",
        avatar: "your-photo.jpg"
      }
    }).open();
  }
</script>
```

---

## ⚙️ Full Configuration

TechCard is built for flexibility. Below are all the available options for the `option` object:

### 1. Base Parameters

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `card` | `string` | `"solo-mini"` | Card format (`"solo"` for full, `"solo-mini"` for compact). |
| `theme` | `string` | `"dark"` | Visual theme (`"dark"` or `"light"`). |
| `creditsText` | `string` | `"Powered by"` | Text displayed at the bottom of the card. |

### 2. `user` Object (Profile)

| Sub-option | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Your full name. |
| `role` | `string` | Professional title or tagline. |
| `bio` | `string` | A short description (supports plain text). |
| `avatar` | `string` | URL of your profile picture. |
| `qrcode` | `string` | URL to a QR Code image (e.g., pointing to your vCard or LinkedIn). |
| `socials` | `array` | List of objects `{ name, url }`. |

### 3. `content` Object (Expertise)

| Sub-option | Type | Description |
| :--- | :--- | :--- |
| `techStack` | `object` | Contains `backend` and `frontend` (arrays of `{name, version}` objects). |
| `projectGoal` | `string` | Text explaining the project goal or your current vision. |
| `stats` | `array` | List of objects `{ label, value, description }` to display key metrics. |

---

## ⌨️ Keyboard Shortcuts

TechCard includes smart navigation. Once integrated, you can use:

* **`Ctrl + Alt + D`**: Instantly open/close the widget for a quick demo.

---

## 🤝 Collaboration & Sustainability

TechCard is not just a "one-shot" script. The goal is to build a **robust and sustainable** tool for the developer community.

### 🚩 Reporting an Issue
If you notice a **visual inconsistency**, a **responsive bug**, or a code error:
1.  Check if the issue already exists.
2.  Open an **[Issue](https://github.com/Tostenn/TechCard/issues)** by describing your environment (Browser, OS).

### 💡 Contributing
Pull Requests are welcome! Whether it's for:
* Improving accessibility (A11y).
* Optimizing JS/CSS bundle size.
* Adding missing social media icons.

---

## 🗺️ Project Roadmap

The project is evolving to become the ultimate digital signature for developers. Our priorities:

* **[ ] Team Cards (Multi-Profile)**: A new option to display an entire team or multiple collaborators within a single widget (ideal for agencies or group projects).
* **[ ] Community Themes**: Adding various templates (*Glassmorphism, Retro Terminal, Minimalist*).
* **[ ] Core Optimization**: Reducing bundle size and optimizing CSS rendering.
* **[ ] Config v2 Structure**: A modular configuration allowing specific blocks to be enabled/disabled on the fly.
* **[ ] TechCard Platform**: A SaaS interface to configure your card visually and get a unique link without handling JSON code.

---

### Why contribute?
If you have ideas for the **Team Cards** system or want to propose a new design, your help is welcome. TechCard is an open project: we aim to fix every inconsistency to provide a seamless experience across all browsers.

> **Want to participate?** Open an [Issue](https://github.com/Tostenn/TechCard/issues) to discuss a new feature or submit a Pull Request directly!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Created with ❤️ by [Kouya Tosten](https://github.com/Tostenn)**