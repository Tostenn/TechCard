# ⚡ TechCard v1.0.0

**TechCard** is an elegant, ultra-lightweight, and highly customizable profile widget designed to be integrated into any website with a single line of code.

Initially built in pure JavaScript, the project has been completely **rewritten in TypeScript** to provide a robust architecture, better maintainability, and a top-tier developer experience. By leveraging **Shadow DOM**, TechCard remains completely isolated from the host site's CSS, ensuring a perfect render regardless of your framework or existing stylesheets.

**Live Demo:** [https://tostenn.github.io/TechCard/](https://tostenn.github.io/TechCard/)

-----

## 📦 Installation

### 1\. Via npm (Recommended)

For projects using modern bundlers (Vite, Webpack, etc.):

```bash
npm install techcard
```

### 2\. Via CDN (Standard Usage)

Ideal for quick integration without a compilation step. Add this script tag before the end of your `</body>`:

  * **ESM Version (Modern):**
    ```html
    <script type="module" src="https://cdn.jsdelivr.net/npm/techcard@1.0.0/dist/techcard.mjs"></script>
    ```
  * **UMD Version (Classic):**
    ```html
    <script src="https://cdn.jsdelivr.net/npm/techcard@1.0.0/dist/techcard.js"></script>
    ```

-----

## 🚀 Quick Start

### Module Usage (TS/JS)

```typescript
import { TechCard } from 'techcard';

const card = new TechCard({
  theme: "dark",
  user: {
    name: "Tosten Kouya",
    role: "Full-Stack Developer",
    avatar: "https://your-image-url.jpg"
  }
});
```

### Classic Usage (HTML)

```html
<script>
  window.onload = () => {
    const card = new window.TechCard({
      card: "solo-mini",
      theme: "light",
      user: {
        name: "Your Name",
        role: "Developer"
        avatar: "https://your-image-url.jpg"
      }
    });
  }
</script>
```

-----

## ⌨️ Magic Shortcut

Once integrated, use this shortcut to interact with the widget:

  * **`Ctrl + Alt + D`**: Instantly open or close the widget.

-----

## ⚙️ Full Configuration

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

This v1 release marks a transition to professional standards:

  * **Native TypeScript**: Full typing for perfect autocompletion in your IDE.
  * **Shadow DOM & Tailwind**: Isolated styles to prevent any conflict with your site.
  * **Vite & Rollup**: Optimized and lightweight build (under 25kb).
  * **CDN Ready**: Immediately available via jsDelivr.

-----

## 🤝 Contributing

TechCard is now a structured project ready for contributions. We are looking for developers to:

  * Create new themes (Glassmorphism, Neo-brutalism).
  * Improve Accessibility (A11y).
  * Develop the "Team Cards" system.

Check out our **[Architecture Guide](https://www.google.com/search?q=/docs/ARCHITECTURE.md)** to get started.

-----

## 📄 License

Distributed under the MIT License.

**Created with ❤️ by [Tosten Kouya](https://github.com/Tostenn)**