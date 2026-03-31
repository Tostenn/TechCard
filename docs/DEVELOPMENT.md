# 🛠️ Development Guide - TechCard

Welcome to the **TechCard** development guide\! This document will walk you through setting up your local environment, the build process, and our coding standards to ensure a smooth contribution experience.

-----

## 📋 Prerequisites

Before diving in, make sure you have the following tools installed:

  * **Node.js**: Version 18.0.0 or higher is recommended.
  * **npm**: Usually bundled with Node.js.
  * **Git**: For version control and cloning the repository.

-----

## ⚙️ Setup & Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/Tostenn/TechCard.git
    cd TechCard
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

-----

## 🚀 Development Workflow

### 1\. Local Development

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

By default, the server runs at `http://localhost:5173`. You can use the `index.html` file at the root to test your changes in real-time.

### 2\. Building for Production

To generate the optimized production bundles:

```bash
npm run build
```

This command runs the TypeScript compiler (`tsc`) followed by **Vite** to bundle the assets. The resulting files will be located in the `build/` directory:

  * **`techcard.js`**: The **UMD** bundle, perfect for standard browser integration via `<script>`.
  * **`techcard.mjs`**: The **ES Module** version for modern JavaScript environments.

### 3\. Preview the Build

To test the production build locally before pushing:

```bash
npm run preview
```

-----

## 🏗️ Technical Architecture

  * **Language**: Built entirely with **TypeScript** for type safety and maintainability.
  * **Styling**: Powered by **Tailwind CSS**. Styles are processed via **PostCSS** and injected directly into the **Shadow DOM** to prevent CSS leakage to or from the host website.
  * **Bundling**: Optimized by **Vite** and **Terser** for maximum compression.

For a detailed breakdown of how the Shadow DOM and CSS injection work, please refer to **[ARCHITECTURE.md](/docs/ARCHITECTURE.md)**.

-----

## 🤝 Contribution Workflow

1.  **Fork** the repository and create your feature branch (e.g., `git checkout -b feature/amazing-new-theme`).
2.  **Commit** your changes following professional standards.
3.  **Verify** your build by running `npm run build` to ensure no TypeScript or CSS errors exist.
4.  **Submit** a Pull Request with a clear description of your changes.

-----

**Maintainer**: [Kouya Tosten](https://github.com/Tostenn)  
**License**: MIT
