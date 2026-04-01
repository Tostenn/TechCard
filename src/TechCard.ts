import { TechCardOptions } from "./types";
import { CardSoloMini } from "./components/CardSoloMini";
import { CardSolo } from "./components/CardSolo";
import { DEFAULT_OPTIONS } from "./utils/defaults"; // Import des défauts

// Import du CSS
import tailwindStyles from './index.css?inline';

export class TechCard {
    private static activeInstance: TechCard | null = null;
    private host: HTMLElement | null = null;
    private container: HTMLElement | null = null;
    private options: TechCardOptions; // On stocke les options fusionnées

    constructor(userOptions: Partial<TechCardOptions>) {
        // Fusion des options par défaut avec les options utilisateur
        this.options = this.validateAndMergeOptions(userOptions);
        
        TechCard.activeInstance = this;
        this.init();
    }

    /**
     * Fusionne les options et s'assure que les objets imbriqués (user) 
     * ne sont pas perdus.
     */
    private validateAndMergeOptions(userOptions: Partial<TechCardOptions>): TechCardOptions {
        return {
            ...DEFAULT_OPTIONS,
            ...userOptions,
            user: {
                ...DEFAULT_OPTIONS.user,
                ...(userOptions.user || {}),
                socials: Array.isArray(userOptions.user?.socials) 
                    ? userOptions.user.socials 
                    : DEFAULT_OPTIONS.user?.socials || []
            }
        } as TechCardOptions;
    }

    private init() {
        this.createOverlay();
        this.installShortcuts();
    }
    
    public static getInstance(): TechCard | null {
        return TechCard.activeInstance;
    }

    private createOverlay() {
        this.host = document.createElement("div");
        this.host.id = "tech-card-overlay";
        this.host.style.display = "none";
        this.host.setAttribute("data-theme", this.options.theme); 
        
        const shadow = this.host.attachShadow({ mode: "open" });

        const styleTag = document.createElement("style");
        styleTag.textContent = tailwindStyles;
        shadow.appendChild(styleTag);
        this.container = document.createElement("div");

        this.container.className = `signature-overlay`;
        shadow.appendChild(this.container);
        this.container.onclick = () => this.close()

        // Bouton de fermeture
        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "✕"; 
        closeBtn.onclick = () => this.close();
        this.container.appendChild(closeBtn);

        // Sélection du composant (basée sur les options fusionnées)
        const cardRenderer = this.options.card === "solo-mini" 
            ? new CardSoloMini(this.options) 
            : new CardSolo(this.options);

        const wrapper = cardRenderer.render(this.container);
        wrapper.addEventListener("click", (e) => {
            e.stopPropagation();
        });
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