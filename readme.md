# ⚡ TechCard

**TechCard** est un widget de profil élégant, ultra-léger et hautement personnalisable, conçu pour être intégré sur n'importe quel site web en une seule ligne de code.

Grâce à l'utilisation du **Shadow DOM**, TechCard reste totalement isolé du style CSS de votre site hôte, garantissant un rendu parfait peu importe votre framework ou vos feuilles de style existantes.

-----

## 🚀 Installation Rapide

Pas besoin de compilation ni de téléchargement. Utilisez directement le CDN :

```html
<script src="https://cdn.jsdelivr.net/gh/Tostenn/TechCard/js/techcard.js"></script>

<script>
  window.onload = () => {
    new window.TechCard({
      card: "solo",
      user: {
        name: "Kouya Tosten",
        role: "Full-Stack Developer",
        avatar: "votre-photo.jpg"
      }
    });
  }
</script>
```

-----

## ⚙️ Configuration Complète

TechCard est pensé pour être flexible. Voici l'ensemble des options disponibles pour l'objet `option` :

### 1\. Paramètres de Base

| Option | Type | Par défaut | Description |
| :--- | :--- | :--- | :--- |
| `card` | `string` | `"solo-mini"` | Le format de la carte (`"solo"` pour complet, `"solo-mini"` pour compact). |
| `theme` | `string` | `"dark"` | Le thème visuel (`"dark"` ou `"light"`). |
| `creditsText` | `string` | `"Powered by"` | Texte affiché en bas de la carte. |

### 2\. Objet `user` (Profil)

| Sous-option | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Votre nom complet. |
| `role` | `string` | Titre professionnel ou accroche. |
| `bio` | `string` | Une courte description (supporte le texte brut). |
| `avatar` | `string` | URL de votre photo de profil. |
| `qrcode` | `string` | URL vers une image de QR Code (ex: vers votre vCard ou LinkedIn). |
| `socials` | `array` | Liste d'objets `{ name, url }`. |

### 3\. Objet `content` (Expertise)

| Sous-option | Type | Description |
| :--- | :--- | :--- |
| `techStack` | `object` | Contient `backend` et `frontend` (tableaux d'objets `{name, version}`). |
| `projectGoal` | `string` | Texte expliquant l'objectif du projet ou votre vision actuelle. |
| `stats` | `array` | Liste d'objets `{ label, value, description }` pour afficher des chiffres clés. |

-----

## ⌨️ Raccourcis Clavier

TechCard inclut une navigation intelligente. Une fois intégré, vous pouvez utiliser :

  * **`Ctrl + Alt + D`** : Ouvrir/Fermer instantanément le widget pour une démo rapide.

-----

## 🤝 Collaboration & Durabilité

TechCard ne se veut pas être un simple script "one-shot". L'objectif est de construire un outil **robuste et durable** pour la communauté.

### 🚩 Signaler un problème

Si vous constatez une **incohérence visuelle**, un **bug de responsive** ou une erreur dans le code :

1.  Vérifiez si l'issue existe déjà.
2.  Ouvrez une **[Issue](https://github.com/Tostenn/TechCard/issues)** en décrivant précisément votre environnement (Navigateur, OS).

### 💡 Contribuer

Les Pull Requests sont les bienvenues \! Que ce soit pour :

  * Améliorer l'accessibilité (A11y).
  * Optimiser le poids du fichier JS/CSS.
  * Ajouter des icônes de réseaux sociaux manquantes.

-----

C'est noté. J'ai intégré la fonctionnalité **"Team Cards"** (cartes pour les équipes) directement dans la **Roadmap** comme une évolution majeure du produit, tout en conservant la section de présentation des contributeurs du projet.

Voici la version mise à jour pour ton `README.md` :

-----

## 🗺️ Roadmap (Avenir du projet)

Le projet évolue pour devenir l'outil de référence pour la signature numérique des développeurs. Voici les prochaines étapes :

  * **[ ] Team Cards (Multi-Profils)** : Une nouvelle option permettant d'afficher une équipe entière ou plusieurs collaborateurs au sein d'un même widget (idéal pour les agences ou les projets collectifs).
  * **[ ] Thèmes Communautaires** : Ajout de templates variés (*Glassmorphism, Retro Terminal, Minimalist*).
  * **[ ] Optimisation Core** : Réduction du poids du bundle JS et optimisation du rendu CSS.
  * **[ ] Structure de Config v2** : Une configuration modulaire permettant d'activer/désactiver des blocs spécifiques à la volée.
  * **[ ] TechCard Platform** : Une interface SaaS pour configurer votre carte visuellement et obtenir un lien unique sans avoir à manipuler de code JSON.

-----

### Pourquoi contribuer ?

Si vous avez des idées pour le système de **Team Cards** ou si vous souhaitez proposer un nouveau design, votre aide est la bienvenue. TechCard est un projet ouvert : nous cherchons à corriger chaque incohérence pour offrir une expérience fluide sur tous les navigateurs.

> **Envie de participer ?** Ouvrez une [Issue](https://www.google.com/search?q=https://github.com/Tostenn/TechCard/issues) pour discuter d'une nouvelle fonctionnalité ou proposez une Pull Request directement \!

-----

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

-----

**Créé avec ❤️ par [Kouya Tosten](https://github.com/Tostenn)**