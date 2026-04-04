import { TechCardOptions, User, Theme, CardType, ThemeConfig } from "./types";
import { CardSoloMini } from "./components/CardSoloMini";
import { CardSolo } from "./components/CardSolo";
import { DEFAULT_OPTIONS } from "./utils/defaults";
import tailwindStyles from './index.css?inline';
import { miniParseMarkdown } from "./utils/markdown";

export class TechCard {
    private static activeInstance: TechCard | null = null;
    
    // DOM Elements
    private host: HTMLElement | null = null;
    private container: HTMLElement | null = null;
    
    // State Management
    private draftConfig: Partial<TechCardOptions>;
    private customThemeConfig: ThemeConfig = {};
    private isBuilt: boolean = false;
    
    // Configuration finale validée
    private options!: TechCardOptions;

    constructor(initialConfig: Partial<TechCardOptions> = {}) {
        // Initialisation d'un brouillon vide ou basé sur ce qui est passé en paramètre
        this.draftConfig = { ...initialConfig };
        TechCard.activeInstance = this;
    }

    // ============================================================================
    // API BUILDER (Configuration)
    // ============================================================================

    private checkLock() {
        if (this.isBuilt) {
            throw new Error("[TechCard] La carte est déjà construite. Vous ne pouvez plus modifier sa configuration. Utilisez une nouvelle instance ou implémentez une méthode reset().");
        }
    }

    public setUser(userData: Partial<User>): this {
        this.checkLock();
        this.draftConfig.user = { 
            ...(this.draftConfig.user || {}), 
            ...userData 
        } as User;
        return this;
    }

    public setCard(type: CardType): this {
        this.checkLock();
        this.draftConfig.card = type;
        return this;
    }

    public setTheme(theme: Theme, customConfig?: ThemeConfig): this {
        this.checkLock();
        this.draftConfig.theme = theme;
        if (customConfig) {
            this.customThemeConfig = { ...this.customThemeConfig, ...customConfig };
        }
        return this;
    }

    public setContent(contentData: Partial<TechCardOptions['content']>): this {
        this.checkLock();
        
        // Deep merge basique pour ne pas écraser le stack backend si on ne met à jour que le frontend
        const currentContent = this.draftConfig.content || {};
        this.draftConfig.content = {
            ...currentContent,
            ...contentData,
            techStack: {
                ...(currentContent.techStack || {}),
                ...(contentData?.techStack || {})
            },

        };
        return this;
    }

    public setCreditsText(text: string): this {
        this.checkLock();
        this.draftConfig.creditsText = text;
        return this;
    }

    // ============================================================================
    // VALIDATION & BUILD
    // ============================================================================

    public build(): this {
        if (this.isBuilt) return this;

        // 1. Fusion avec les valeurs par défaut (Deep Merge)
        this.options = this.mergeWithDefaults(this.draftConfig);

        // 2. Validation de l'intégrité des données
        this.validateOptions(this.options);

        // parse projectGoal en HTML (Markdown)
        if (this.options.content?.projectGoal) {
            this.options.content.projectGoal = miniParseMarkdown(this.options.content.projectGoal);
        }

        // 3. Verrouillage de l'état
        this.isBuilt = true;

        // 4. (Optionnel) Pré-générer le DOM en mémoire
        this.initDOM();

        return this;
    }

    private mergeWithDefaults(draft: Partial<TechCardOptions>): TechCardOptions {
        return {
            ...DEFAULT_OPTIONS,
            ...draft,
            user: {
                ...DEFAULT_OPTIONS.user,
                ...(draft.user || {}),
                socials: draft.user?.socials || DEFAULT_OPTIONS.user?.socials
            },
            content: {
                ...(DEFAULT_OPTIONS.content || {}),
                ...(draft.content || {}),
                techStack: {
                    ...(DEFAULT_OPTIONS.content?.techStack || {}),
                    ...(draft.content?.techStack || {})
                }
            }
        } as TechCardOptions;
    }

    private validateOptions(opts: TechCardOptions) {
        // Validation Type de Carte
        const validCardTypes: CardType[] = ["solo", "solo-mini"];
        if (!validCardTypes.includes(opts.card)) {
            throw new Error(`[TechCard Validation] Type de carte invalide : '${opts.card}'. Valeurs acceptées : ${validCardTypes.join(', ')}`);
        }

        // Validation Utilisateur (Exemple de règles strictes)
        if (!opts.user.name || opts.user.name.trim() === "") {
            throw new Error("[TechCard Validation] L'utilisateur doit avoir un nom (user.name).");
        }
        if (!opts.user.role || opts.user.role.trim() === "") {
            throw new Error("[TechCard Validation] L'utilisateur doit avoir un rôle (user.role).");
        }

        // Validation du thème (ex: soit "light", "dark" ou une string personnalisée)
        if (typeof opts.theme !== "string" || opts.theme.trim() === "") {
            throw new Error("[TechCard Validation] Le thème doit être une chaîne de caractères non vide (ex: 'light', 'dark' ou une string personnalisée).");
        }

        // Validation du contenu technique (si présent)
        if (opts.content?.techStack) {
            const { backend, frontend } = opts.content.techStack;
            if (backend) {
                backend.forEach(tech => {
                    if (!tech.name || tech.name.trim() === "") {
                        throw new Error("[TechCard Validation] Chaque technologie du backend doit avoir un nom (content.techStack.backend[].name).");
                    }
                });
            }
            if (frontend) {
                frontend.forEach(tech => {
                    if (!tech.name || tech.name.trim() === "") {
                        throw new Error("[TechCard Validation] Chaque technologie du frontend doit avoir un nom (content.techStack.frontend[].name).");
                    }
                });
            }
        }

        // Validation des stats (si présentes)
        if (opts.content?.stats) {
            opts.content.stats.forEach(stat => {
                if (!stat.label || stat.label.trim() === "") {
                    throw new Error("[TechCard Validation] Chaque statistique doit avoir un label (content.stats[].label).");
                }
                if (stat.value === undefined || stat.value === null || stat.value === "") {
                    throw new Error("[TechCard Validation] Chaque statistique doit avoir une valeur (content.stats[].value).");
                }
            });
        }
    }

    // ============================================================================
    // CYCLE DE VIE & RENDU (DOM)
    // ============================================================================

    private initDOM() {
        if (this.host) return;

        this.host = document.createElement("div");
        this.host.id = "tech-card-overlay";
        this.host.style.display = "none";
        
        // Application du thème
        this.host.setAttribute("data-theme", this.options.theme); 
        // if (this.options.theme !== 'light' && this.options.theme !== 'dark') {
        //     this.host.classList.add(`tc-theme-${this.options.theme}`);
        // }

        // Application des variables CSS Customisées
        if (Object.keys(this.customThemeConfig).length > 0) {
            Object.entries(this.customThemeConfig).forEach(([key, value]) => {
                const property = key.startsWith('--tc-') ? key : `--tc-${key}`;
                this.host!.style.setProperty(property, value);
            });
        }
        
        const shadow = this.host.attachShadow({ mode: "open" });
        const styleTag = document.createElement("style");
        styleTag.textContent = tailwindStyles;
        shadow.appendChild(styleTag);

        this.container = document.createElement("div");
        this.container.className = `signature-overlay`;
        shadow.appendChild(this.container);
        this.container.onclick = () => this.close();

        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "✕"; 
        closeBtn.onclick = () => this.close();
        this.container.appendChild(closeBtn);

        // Sélection du moteur de rendu basé sur les options validées
        const cardRenderer = this.options.card === "solo-mini" 
            ? new CardSoloMini(this.options) 
            : new CardSolo(this.options);

        const wrapper = cardRenderer.render(this.container);
        wrapper.addEventListener("click", (e) => e.stopPropagation());
        
        document.body.appendChild(this.host);
        this.installShortcuts();
    }

    public open() {
        if (!this.isBuilt) {
            throw new Error("[TechCard] Impossible d'ouvrir. Vous devez appeler la méthode .build() avant d'afficher la carte.");
        }
        if (this.host) {
            this.host.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }

    public close() {
        if (this.host) {
            this.host.style.display = "none";
            document.body.style.overflow = "";
        }
    }

    public toggle() {
        if (!this.host) return;
        this.host.style.display === "none" ? this.open() : this.close();
    }

    private installShortcuts() {
        window.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "d") {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === "Escape" && this.host && this.host.style.display !== "none") {
                this.close();
            }
        });
    }
}