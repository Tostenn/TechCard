# ⚡ TechCard v1.2.x

**TechCard** is an elegant, ultra-lightweight, and highly customizable profile widget designed to be integrated into any website with a single line of code.

By leveraging **Shadow DOM**, TechCard remains completely isolated from the host site's CSS, ensuring a perfect render regardless of your framework or existing stylesheets.

**Live Demo:** [https://tostenn.github.io/TechCard/](https://tostenn.github.io/TechCard/)

---

## ⌨️ Magic Shortcut

Once integrated, use this shortcut to interact with the widget:
* **`Ctrl + Alt + D`**: Instantly open or close the widget.

---

## 🚀 Quick Start

### 1. Via CDN (Standard Usage)
Ideal for quick integration without compilation. Add this script tag before the end of your `</body>`:

```html
<script src="[https://cdn.jsdelivr.net/gh/Tostenn/TechCard/dist/techcard.js](https://cdn.jsdelivr.net/gh/Tostenn/TechCard/dist/techcard.js)"></script>

<script>
  window.onload = () => {
    const card = new window.TechCard({
      theme: "dark",
      user: {
        name: "Your Name",
        role: "Full-Stack Developer",
        avatar: "[https://your-image-url.jpg](https://your-image-url.jpg)"
      }
    });
    
    // The card opens via shortcut, or you can force open it here:
    // card.open(); 
  }
</script>
````

### 2\. Via ESM (Modern Modules)

If you are working with modern JavaScript modules:

```javascript
import TechCard from '[https://cdn.jsdelivr.net/gh/Tostenn/TechCard/dist/techcard.mjs](https://cdn.jsdelivr.net/gh/Tostenn/TechCard/dist/techcard.mjs)';

const card = new TechCard({ /* options */ });
```

-----

## ⚙️ Full Configuration

### 1\. Base Settings

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `card` | `string` | `"solo-mini"` | Card format (`"solo"` or `"solo-mini"`). |
| `theme` | `string` | `"dark"` | Visual theme (`"dark"` or `"light"`). |
| `creditsText` | `string` | `"Powered by"` | Text displayed at the bottom of the card. |

### 2\. `user` Object (Profile)

| Sub-option | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Your full name. |
| `role` | `string` | Professional title or headline. |
| `bio` | `string` | A short description (plain text). |
| `avatar` | `string` | URL of your profile picture. |
| `qrcode` | `string` | URL to a QR Code (e.g., vCard or LinkedIn). |
| `social_long`| `boolean`| `true` to display social media links in a wide format. |
| `socials` | `array` | List of objects `{ name, url }`. |

### 3\. `content` Object (Expertise)

| Sub-option | Type | Description |
| :--- | :--- | :--- |
| `techStack` | `object` | Contains `backend` and `frontend` (arrays of `{name, version}`). |
| `projectGoal` | `string` | Text explaining the project goal or your vision. |
| `stats` | `array` | List of objects `{ label, value, description }` for key metrics. |

-----

## 🛠️ Modern Architecture

The project is built to provide a robust development experience:

  * **TypeScript**: For typed and secure code.
  * **Vite**: For an ultra-fast and optimized build process.
  * **Tailwind CSS**: Dynamically injected into the Shadow DOM for isolated styling.

> [\!IMPORTANT]
> **Want to help develop TechCard?**
> We have implemented detailed technical documentation for contributors. Check out our **[Contribution & Architecture Guide](/docs/DEVELOPMENT.md)** to learn how to clone, test, and propose new themes.

-----

## 🤝 Why Contribute?

TechCard is more than just a "one-shot" script. Our goal is to create the ultimate digital signature for developers. We need you to:

  * **Create New Themes**: Glassmorphism, Retro Terminal, Minimalist.
  * **Optimize Performance**: Bundle size reduction and Accessibility (A11y).
  * **Extend Features**: Team Cards system (Multi-profile) and API integrations.

### How to Help?

1.  Report an anomaly via **[Issues](https://github.com/Tostenn/TechCard/issues)**.
2.  Propose an improvement via a **Pull Request**.
3.  Share your ideas for the **Roadmap** (Team Cards, SaaS Platform).

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

**Created with ❤️ by [Kouya Tosten](https://github.com/Tostenn)**
