class TechCard {
    /**
     * Instance active utilisée par les raccourcis clavier.
     * En v1, on considère qu'il y a un widget principal sur la page.
     */
    static activeInstance = null;

    /**
     * Évite d'attacher plusieurs fois les listeners globaux.
     */
    static shortcutsInstalled = false;

    constructor(option = {}) {
        // Configuration par défaut
        this.option = {
            card: "solo-mini",
            theme: "dark",
            creditsText: "Powered by",
            cssHref: "/css/techcard.css",
            user: {
                name: "",
                role: "",
                bio: "",
                social_long: true,
                avatar: "",
                qrcode: "",
                socials: [],
            },
            ...option,
            user: {
                name: "",
                role: "",
                bio: "",
                avatar: "",
                qrcode: "",
                socials: [],
                ...(option.user || {}),
                socials: Array.isArray(option.user?.socials) ? option.user.socials : [],
            },
        };

        // Icônes des réseaux sociaux
        this.socialIcon = {
            fb: "https://static.vecteezy.com/system/resources/thumbnails/065/386/537/small/facebook-circle-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.png",
            in: "https://img.freepik.com/vecteurs-premium/icone-application-linkedin-plus-grand-reseau-professionnel-au-monde-reseaux-sociaux-emplois-carrieres_277909-476.jpg?semt=ais_hybrid&w=740&q=80",
            yt: "https://img.freepik.com/vecteurs-premium/logo-youtube-rouge-logo-medias-sociaux_197792-1803.jpg?semt=ais_hybrid&w=740&q=80",
            ing: "https://img.freepik.com/vecteurs-premium/logo-instagram-degrade-colore_1273375-1516.jpg?semt=ais_hybrid&w=740&q=80",
            github: "https://cdn-icons-png.flaticon.com/256/25/25231.png",
            certification: "https://cdn.worldvectorlogo.com/logos/twitter-verified-badge.svg"
        };

        // Références DOM
        this.host = null;
        this.shadow = null;
        this.container = null;
        this._closeTimer = null;
        this._previousBodyOverflow = "";

        // L'instance active pour les raccourcis
        TechCard.activeInstance = this;

        // Validation
        this.validateOptions();

        // Création du widget
        this.makeOverlay();

        // Raccourcis clavier
        this.initShortcut();
    }

    /**
     * Valide les options fournies.
     * Les champs user.name / user.role / user.avatar sont obligatoires.
     */
    validateOptions() {
        const errors = [];
        const allowedCards = ["solo", "solo-mini", "team", "team-mini"];
        const allowedThemes = ["light", "dark"];

        const opt = this.option;
        const user = opt.user || {};

        if (!allowedCards.includes(opt.card)) {
            errors.push(`card invalide (${opt.card})`);
        }

        if (!allowedThemes.includes(opt.theme)) {
            errors.push(`theme invalide (${opt.theme})`);
        }

        if (!user || typeof user !== "object") {
            errors.push("user est requis et doit être un objet");
        } else {
            if (!user.name || typeof user.name !== "string") {
                errors.push("user.name est requis et doit être une string");
            }

            // optionnel
            // if (!user.role || typeof user.role !== "string") {
            //     errors.push("user.role est requis et doit être une string");
            // }

            if (!user.avatar || typeof user.avatar !== "string") {
                errors.push("user.avatar est requis et doit être une string");
            }

            if (user.bio !== undefined && typeof user.bio !== "string") {
                errors.push("user.bio doit être une string si fourni");
            }

            // optionnel
            // if (user.qrcode !== undefined && typeof user.qrcode !== "string") {
            //     errors.push("user.qrcode doit être une string si fourni");
            // }

            // optionnel
            // if (!Array.isArray(user.socials)) {
            //     errors.push("user.socials doit être un tableau");
            // } else {
            //     user.socials.forEach((social, index) => {
            //         if (!social || typeof social !== "object") {
            //             errors.push(`socials[${index}] doit être un objet`);
            //             return;
            //         }

            //         if (!social.name || typeof social.name !== "string") {
            //             errors.push(`socials[${index}].name invalide`);
            //         }

            //         if (!social.url || typeof social.url !== "string") {
            //             errors.push(`socials[${index}].url invalide`);
            //         }
            //     });
            // }
        }

        if (errors.length > 0) {
            throw new Error("Validation échouée:\n" + errors.join("\n"));
        }

        return true;
    }

    /**
     * Installe les raccourcis clavier une seule fois.
     * Ctrl + Alt + D : ouvrir/fermer
     * Escape : fermer
     */
    initShortcut() {
        if (TechCard.shortcutsInstalled) return;
        TechCard.shortcutsInstalled = true;

        document.addEventListener("keydown", (e) => {
            const instance = TechCard.activeInstance;
            if (!instance) return;

            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "d") {
                e.preventDefault();
                instance.toggleSignature();
            }

            if (e.key === "Escape") {
                instance.close();
            }
        });
    }

    /**
     * Affiche ou masque le widget.
     */
    toggleSignature() {
        if (!this.host) {
            this.makeOverlay();
        }

        if (this.host.hidden) {
            this.open();
        } else {
            this.close();
        }
    }

    /**
     * Ouvre le widget.
     */
    open() {
        if (!this.host) {
            this.makeOverlay();
        }

        clearTimeout(this._closeTimer);
        this.host.hidden = false;
        this.container.classList.remove("closing");

        // Optionnel : bloque le scroll du fond
        this._previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }

    /**
     * Ferme le widget avec animation.
     */
    close() {
        if (!this.host || this.host.hidden) return;

        this.container.classList.add("closing");

        clearTimeout(this._closeTimer);
        this._closeTimer = setTimeout(() => {
            this.host.hidden = true;
            document.body.style.overflow = this._previousBodyOverflow || "";
        }, 200);
    }

    /**
     * Ouvre directement le widget.
     */
    openSignature() {
        this.open();
    }

    /**
     * Ferme directement le widget.
     */
    closeSignature() {
        this.close();
    }

    /**
     * Crée un élément dans le bon document.
     * @param {HTMLElement|ShadowRoot|Document} parent
     * @param {string} tag
     * @param {string} className
     * @param {Object} attrs
     * @returns {HTMLElement}
     */
    makeElement(parent, tag, className = "", attrs = {}) {
        const doc = parent?.ownerDocument || document;
        const el = doc.createElement(tag);

        if (className) {
            el.className = className;
        }

        Object.entries(attrs).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                el.setAttribute(key, String(value));
            }
        });

        parent.appendChild(el);
        return el;
    }

    /**
     * Retourne l'icône d'un réseau social.
     * @param {string} name
     * @returns {string}
     */
    getSocialIcon(name = "") {
        const key = String(name).toLowerCase();

        if (key === "facebook" || key === "fb") return this.socialIcon.fb;
        if (key === "linkedin" || key === "in") return this.socialIcon.in;
        if (key === "instagram" || key === "ins") return this.socialIcon.ing;
        if (key === "youtube" || key === "yt") return this.socialIcon.yt;
        if (key === "github" || key === "git") return this.socialIcon.github;

        return "";
    }

    /**
     * Crée la card mini complète.
     * @param {HTMLElement|ShadowRoot|Document} root
     * @returns {HTMLElement}
     */
    makeCardSoloMini(root = document) {
        const user = this.option.user;

        const section = this.makeElement(root, "section", "signature-card signature-card--mini relative");
        section.innerHTML = `<div class="credits"><span>⚡</span><p class="">${this.option.creditsText}</p></div>`

        // QR code (si fourni)
        if (user.qrcode) {
            const qrcode = this.makeElement(section, "div", "qrcode");
            const qrcodeImg = this.makeElement(qrcode, "img", "h-full w-full object-cover", {
                src: user.qrcode,
                alt: "QR code",
            });
            qrcodeImg.loading = "lazy";
        }

        const header = this.makeElement(section, "div", "mini-header");

        const avatarWrap = this.makeElement(header, "div", "avatar-wrap avatar-wrap--mini");
        const avatarImg = this.makeElement(avatarWrap, "img", "avatar-image", {
            src: user.avatar,
            alt: "Photo de profil",
        });
        avatarImg.loading = "lazy";

        const content = this.makeElement(header, "div", "min-w-0 flex-1 pr-14 sm:pr-0");

        const topline = this.makeElement(content, "div", "user-topline");

        const name = this.makeElement(topline, "h2", "user-name");
        name.textContent = user.name;

        const badge = this.makeElement(topline, "span", "user-mark");
        const badgeImg = this.makeElement(badge, "img", "", {
            src: this.socialIcon.certification,
            alt: "Vérifié",
        });
        badgeImg.loading = "lazy";

        const role = this.makeElement(content, "p", "user-role");
        role.textContent = user.role;

        if (user.bio) {
            const bio = this.makeElement(content, "p", "user-bio");
            bio.textContent = user.bio;
        }

        const socials = this.makeElement(content, "div", "mini-socials");

        (user.socials || []).forEach((social) => {
            const link = this.makeElement(socials, "a", "", {
                href: social.url || "#",
                target: "_blank",
                rel: "noopener noreferrer",
                title: social.name || "",
            });

            const iconSrc = this.getSocialIcon(social.name);
            if (iconSrc) {
                const icon = this.makeElement(link, "img", "", {
                    src: iconSrc,
                    alt: social.name || "Réseau social",
                });
                icon.loading = "lazy";
            } else {
                link.textContent = social.name || "Lien";
            }
        });

        return section;
    }

    /**
     * Retourne l'icône d'une techno.
     * @param {string} name
     * @returns {string}
     */
    getTechIcon(name = "") {
        const key = String(name).toLowerCase();

        if (key.includes("laravel")) return "https://www.logo.wine/a/logo/Laravel/Laravel-Logo.wine.svg";
        if (key.includes("php")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Php_logo.svg/1280px-Php_logo.svg.png";
        if (key.includes("react")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png";
        if (key.includes("tailwind")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1280px-Tailwind_CSS_Logo.svg.png";
        if (key.includes("vue")) return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/960px-Vue.js_Logo_2.svg.png";
        if (key.includes("js") || key.includes("javascript")) return "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png";

        return "";
    }

    /**
     * Crée un bloc techno.
     * @param {HTMLElement|ShadowRoot|Document} parent
     * @param {{name: string, version?: string}} tech
     * @returns {HTMLElement}
     */
    makeTechItem(parent, tech) {
        const item = this.makeElement(parent, "div", "tech-item");

        const iconSrc = this.getTechIcon(tech.name);
        if (iconSrc) {
            this.makeElement(item, "img", "tech-icon", {
                src: iconSrc,
                alt: tech.name || "Tech",
            }).loading = "lazy";
        }

        const content = this.makeElement(item, "div", "");

        const title = this.makeElement(content, "p", "tech-title");
        title.textContent = tech.name || "Technologie";

        if (tech.version) {
            const meta = this.makeElement(content, "p", "tech-meta");
            meta.textContent = `Version ${tech.version}`;
        }

        return item;
    }

    /**
     * Crée une carte statistique.
     * @param {HTMLElement|ShadowRoot|Document} parent
     * @param {{label: string, value: string|number, description?: string, enabled?: boolean}} stat
     * @returns {HTMLElement}
     */
    makeStatItem(parent, stat) {
        const article = this.makeElement(parent, "article", "stat-row");
        article.dataset.enabled = stat.enabled ? "true" : "false";

        const left = this.makeElement(article, "div", "");

        const key = this.makeElement(left, "p", "stat-key");
        key.textContent = stat.label || "Statistique";

        const value = this.makeElement(left, "p", "stat-value");
        value.textContent = String(stat.value ?? "");

        if (stat.description) {
            const meta = this.makeElement(left, "p", "stat-meta");
            meta.textContent = stat.description;
        }

        // const pill = this.makeElement(article, "span", `pill ${stat.enabled ? "pill--on" : "pill--off"}`);
        // pill.textContent = stat.enabled ? "On" : "Off";

        return article;
    }

    /**
     * Crée un lien social.
     * @param {HTMLElement|ShadowRoot|Document} parent
     * @param {{name: string, url: string}} social
     * @returns {HTMLElement}
     */
    makeSocialItem(parent, social) {
        const link = this.makeElement(parent, "a", "social-item", {
            href: social.url || "#",
            target: "_blank",
            rel: "noopener noreferrer",
        });

        const iconSrc = this.getSocialIcon(social.name);
        if (iconSrc) {
            this.makeElement(link, "img", "social-icon", {
                src: iconSrc,
                alt: social.name || "Réseau social",
            }).loading = "lazy";
        }

        const content = this.makeElement(link, "div", "");

        const title = this.makeElement(content, "p", "social-title");
        title.textContent = social.name || "Lien";

        const url = this.makeElement(content, "p", "social-link");
        url.textContent = social.url || "";

        return link;
    }

    /**
     * Active un onglet dans une card.
     * @param {HTMLElement} section
     * @param {string} tabName
     */
    activateCardTab(section, tabName) {
        const buttons = section.querySelectorAll("[data-tab]");
        const panels = section.querySelectorAll("[data-panel]");

        buttons.forEach((btn) => {
            const active = btn.dataset.tab === tabName;
            btn.classList.toggle("tab-btn--active", active);
            btn.setAttribute("aria-selected", active ? "true" : "false");
        });

        panels.forEach((panel) => {
            panel.hidden = panel.dataset.panel !== tabName;
        });
    }

    /**
     * Branche les événements des onglets.
     * @param {HTMLElement} section
     */
    bindCardTabs(section) {
        const buttons = section.querySelectorAll("[data-tab]");

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.activateCardTab(section, btn.dataset.tab);
            });
        });
    }

    /**
     * Crée la card complète.
     * @param {HTMLElement|ShadowRoot|Document} root
     * @returns {HTMLElement}
     */
    makeCardSolo(root = document) {
        const user = this.option.user;
        const content = this.option.content || {};

        const section = this.makeElement(root, "section", "signature-card relative");
        section.setAttribute("data-card", "solo");

        // Badge crédit
        const credits = this.makeElement(section, "div", "credits");
        const creditsIcon = this.makeElement(credits, "span", "");
        creditsIcon.textContent = "⚡";

        const creditsText = this.makeElement(credits, "p", "");
        creditsText.textContent = this.option.creditsText || "Platform by TechCard";

        // Header
        const header = this.makeElement(section, "div", "card-header");

        const avatarWrap = this.makeElement(header, "div", "avatar-wrap");
        const avatarImg = this.makeElement(avatarWrap, "img", "avatar-image", {
            src: user.avatar,
            alt: "Photo de profil",
        });
        avatarImg.loading = "lazy";

        const info = this.makeElement(header, "div", "min-w-0 flex-1");

        const topline = this.makeElement(info, "div", "user-topline");

        const name = this.makeElement(topline, "h2", "user-name");
        name.textContent = user.name;

        const badge = this.makeElement(topline, "span", "user-mark");
        const badgeImg = this.makeElement(badge, "img", "", {
            src: this.socialIcon.certification,
            alt: "Vérifié",
        });
        badgeImg.loading = "lazy";

        const role = this.makeElement(info, "p", "user-role");
        role.textContent = user.role;

        if (user.bio) {
            const bio = this.makeElement(info, "p", "user-bio");
            bio.textContent = user.bio;
        }

        // Tabs
        const tabsWrap = this.makeElement(section, "div", "tabs", {
            role: "tablist",
            "aria-label": "Sections du profil",
        });

        const tabStack = this.makeElement(tabsWrap, "button", "tab-btn tab-btn--active flex items-center gap-2", {
            type: "button",
            "data-tab": "stack",
            "aria-selected": "true",
        });
        tabStack.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9.75 3v2.25M14.25 3v2.25M4.5 7.5h15M6.75 7.5v11.25m10.5-11.25v11.25M9 18h6" />
        </svg>
        <span>Stack</span>
    `;

        const tabGoal = this.makeElement(tabsWrap, "button", "tab-btn flex items-center gap-2", {
            type: "button",
            "data-tab": "objectif",
            "aria-selected": "false",
        });
        tabGoal.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
        <span>Objectif</span>
    `;

        const tabStats = this.makeElement(tabsWrap, "button", "tab-btn flex items-center gap-2", {
            type: "button",
            "data-tab": "stats",
            "aria-selected": "false",
        });
        tabStats.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3v18h18M9 17V9m4 8V5m4 12v-6" />
        </svg>
        <span>Statistiques</span>
    `;

        // Panels
        const panelWrap = this.makeElement(section, "div", "panel");

        // Panel Stack
        const stackPanel = this.makeElement(panelWrap, "div", "", {
            "data-panel": "stack",
        });

        const stackLabel = this.makeElement(stackPanel, "p", "section-label");
        stackLabel.textContent = "Technologies utilisées";

        const stackTitle = this.makeElement(stackPanel, "h3", "section-title");
        stackTitle.textContent = "Architecture";

        const stackContent = this.makeElement(stackPanel, "div", "content-stack");

        if (content.techStack?.backend) {
            const backendGroup = this.makeElement(stackContent, "div", "tech-group");
            const backendTitle = this.makeElement(backendGroup, "p", "text-sm font-semibold uppercase tracking-wide text-slate-500");
            backendTitle.textContent = "Backend";
    
            (content.techStack?.backend || []).forEach((tech) => {
                backendGroup.appendChild(this.makeTechItem(backendGroup, tech));
            });

        }

        const frontendGroup = this.makeElement(stackContent, "div", "tech-group");
        const frontendTitle = this.makeElement(frontendGroup, "p", "text-sm font-semibold uppercase tracking-wide text-slate-500");
        frontendTitle.textContent = "Frontend";

        (content.techStack?.frontend || []).forEach((tech) => {
            frontendGroup.appendChild(this.makeTechItem(frontendGroup, tech));
        });

        if (!content.techStack?.backend?.length && !content.techStack?.frontend?.length) {
            const empty = this.makeElement(stackPanel, "p", "section-text");
            empty.textContent = "Aucune technologie définie.";
        }

        // Panel Objectif
        const goalPanel = this.makeElement(panelWrap, "div", "", {
            "data-panel": "objectif",
            hidden: true,
        });

        const goalLabel = this.makeElement(goalPanel, "p", "section-label");
        goalLabel.textContent = "But du site";

        const goalTitle = this.makeElement(goalPanel, "h3", "section-title");
        goalTitle.textContent = "Objectif du projet";

        const goalText = this.makeElement(goalPanel, "p", "section-text");
        goalText.textContent = content.projectGoal || "Aucun objectif défini.";

        // Panel Stats
        const statsPanel = this.makeElement(panelWrap, "div", "", {
            "data-panel": "stats",
            hidden: true,
        });

        const statsLabel = this.makeElement(statsPanel, "p", "section-label");
        statsLabel.textContent = "Statistiques du projet";

        const statsTitle = this.makeElement(statsPanel, "h3", "section-title");
        statsTitle.textContent = "Stat";

        const statList = this.makeElement(statsPanel, "div", "stat-list");

        (content.stats || []).forEach((stat) => {
            statList.appendChild(this.makeStatItem(statList, stat));
        });

        if (!(content.stats || []).length) {
            const emptyStats = this.makeElement(statsPanel, "p", "section-text");
            emptyStats.textContent = "Aucune statistique définie.";
        }

        // Réseaux sociaux
        const socialsBlock = this.makeElement(section, "div", "");
        socialsBlock.style.borderTop = "1px solid rgb(var(--app-border))";
        socialsBlock.style.padding = "1.25rem 1.25rem 1.25rem 1.25rem";

        const socialsLabel = this.makeElement(socialsBlock, "p", "section-label");
        socialsLabel.textContent = "Réseaux sociaux";

        const socialList = this.makeElement(socialsBlock, "div", "social-list mt-4");

        if (!(user.socials || []).length) {
            const emptySocials = this.makeElement(socialsBlock, "p", "section-text");
            emptySocials.textContent = "Aucun réseau social défini.";
        }
        if (user.social_long) {
            (user.socials || []).forEach((social) => {
                socialList.appendChild(this.makeSocialItem(socialList, social));
            });
        } else {
            const socialIconsOnly = this.makeElement(socialsBlock, "div", "social-icons-only mt-5");
            (user.socials || []).forEach((social) => {
                const iconSrc = this.getSocialIcon(social.name);
                if (!iconSrc) return;

                this.makeElement(socialIconsOnly, "img", "", {
                    src: iconSrc,
                    alt: social.name || "Réseau social",
                }).loading = "lazy";
            });
        }

        // Onglet actif par défaut
        this.activateCardTab(section, "stack");
        this.bindCardTabs(section);

        return section;
    }

    /**
     * Crée le overlay principal avec Shadow DOM.
     * @returns {HTMLElement}
     */
    makeOverlay() {
        if (this.host) return this.host;

        // HOST (racine visible)
        const host = document.createElement("div");
        host.id = "dev-signature-overlay";
        host.hidden = true;
        host.onclick = () => this.close()

        // IMPORTANT : thème sur le host
        host.setAttribute("data-theme", this.option.theme);

        // Shadow DOM
        const shadow = host.attachShadow({ mode: "open" });

        // CSS (dans shadow uniquement)
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = this.option.cssHref;

        // attendre le chargement du CSS (sinon bug visuel)
        link.onload = () => {
            container.classList.add("ready");
        };

        shadow.appendChild(link);

        // container principal
        const container = document.createElement("div");
        container.className = "signature-overlay";
        container.setAttribute("role", "dialog");
        container.setAttribute("aria-modal", "true");
        container.onclick = () => this.close()

        // container.addEventListener("click", (e) => {
        //     e.stopPropagation();
        // });
        // bouton fermer
        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.type = "button";
        closeBtn.textContent = "✕";
        closeBtn.setAttribute("aria-label", "Fermer");

        closeBtn.addEventListener("click", () => this.close());

        // wrapper contenu
        const wrapper = document.createElement("div");
        wrapper.className = "signature-page space-y-8";

        switch (this.option.card) {
            case "solo":
                wrapper.appendChild(this.makeCardSolo(shadow));
                break;

            case "solo-mini":
            default:
                wrapper.appendChild(this.makeCardSoloMini(shadow));
                break;
        }

        // wrapper.appendChild(card);
        wrapper.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // assemblage
        container.appendChild(closeBtn);
        container.appendChild(wrapper);
        shadow.appendChild(container);

        document.body.appendChild(host);

        // refs internes
        this.host = host;
        this.shadow = shadow;
        this.container = container;

        return host;
    }

    /**
     * Supprime le widget du DOM et réinitialise l'état.
     */
    destroy() {
        clearTimeout(this._closeTimer);

        if (this.host) {
            this.host.remove();
        }

        document.body.style.overflow = this._previousBodyOverflow || "";

        this.host = null;
        this.shadow = null;
        this.container = null;
    }
}

window.TechCard = TechCard;