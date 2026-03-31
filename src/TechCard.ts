import { TechCardOptions } from "./types";
import { CardSoloMini } from "./components/CardSoloMini";
import { CardSolo } from "./components/CardSolo";

// On importe le contenu du CSS sous forme de chaîne de caractères
import tailwindStyles from './index.css?inline';

export class TechCard {
    private static activeInstance: TechCard | null = null;
    private host: HTMLElement | null = null;
    private container: HTMLElement | null = null;

    constructor(private options: TechCardOptions) {
        TechCard.activeInstance = this;
        this.init();
    }

    private init() {
        this.createOverlay();
        this.installShortcuts();
    }
    
    public static getInstance(): TechCard | null {
        return TechCard.activeInstance;
    }

    private createOverlay() {
        // 1. Création du Host (l'élément qui porte le Shadow DOM)
        this.host = document.createElement("div");
        this.host.id = "tech-card-overlay";
        this.host.style.display = "none"; // On utilise style.display pour un contrôle total
        
        // On attache le Shadow DOM
        const shadow = this.host.attachShadow({ mode: "open" });

        // 2. Injection du CSS Tailwind (La "Magie" Vite)
        const styleTag = document.createElement("style");
        styleTag.textContent = tailwindStyles;
        shadow.appendChild(styleTag);

        // 3. Création du Container principal
        this.container = document.createElement("div");
        // Ajout dynamique du thème pour isoler les styles si nécessaire
        this.container.className = `signature-overlay techcard-theme-${this.options.theme || 'dark'}`;
        shadow.appendChild(this.container);

        // 4. Sélection du composant de rendu
        const cardRenderer = this.options.card === "solo-mini" 
            ? new CardSoloMini(this.options) 
            : new CardSolo(this.options); // À remplacer par CardSolo plus tard

        cardRenderer.render(this.container);

        // 5. Injection dans le DOM réel
        document.body.appendChild(this.host);
    }

    private installShortcuts() {
        window.addEventListener("keydown", (e) => {
            // Ctrl + Alt + D
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "d") {
                e.preventDefault(); // Évite les conflits avec le navigateur
                this.toggle();
            }
            // Fermer avec Echap
            if (e.key === "Escape" && this.host && this.host.style.display !== "none") {
                this.close();
            }
        });
    }

    public toggle() {
        if (!this.host) return;
        if (this.host.style.display === "none") {
            this.open();
        } else {
            this.close();
        }
    }

    public open() {
        if (this.host) {
            this.host.style.display = "block";
            document.body.style.overflow = "hidden"; // Bloque le scroll arrière
        }
    }

    public close() {
        if (this.host) {
            this.host.style.display = "none";
            document.body.style.overflow = ""; // Libère le scroll
        }
    }
}