import { BaseCard } from "./BaseCard";
import { createElement } from "../utils/dom";
import { getSocialIcon, getStackIcon, SOCIAL_ICONS } from "../utils/icons";

export class CardSolo extends BaseCard {
  render(root: ShadowRoot | HTMLElement): HTMLElement {
    const { creditsText } = this.options;

    const section = createElement("section", "signature-card ", {}, root);
    section.setAttribute("data-card", "solo");

    // 1. Credits Badge
    const credits = createElement("div", "credits", {}, section);
    credits.innerHTML = `<span>⚡</span><p>${creditsText || "Platform by TechCard"}</p>`;

    // 2. Header (Avatar + User Info)
    this.renderHeader(section);

    // 3. Tabs Navigation
    this.renderTabs(section);

    // 4. Panels Content
    const panelWrap = createElement("div", "panel", {}, section);
    this.renderStackPanel(panelWrap);
    this.renderGoalPanel(panelWrap);
    this.renderStatsPanel(panelWrap);

    // 5. Socials Block
    this.renderSocialsBlock(section);

    // 6. Init Tabs Logic
    this.bindCardTabs(section);
    this.activateCardTab(section, "objectif");

    return section;
  }

  private renderHeader(parent: HTMLElement) {
    const { user } = this.options;
    const header = createElement("div", "card-header", {}, parent);

    if (user.avatar) {
      const avatarWrap = createElement("div", "avatar-wrap", {}, header);
      createElement(
        "img",
        "avatar-image",
        { src: user.avatar, alt: user.name, loading: "lazy" },
        avatarWrap,
      );
    }

    if (user.qrcode) {
      const qrcode = createElement("div", "qrcode", {}, header);
      createElement(
        "img",
        "",
        {
          src: user.qrcode,
          alt: "QR Code",
          loading: "lazy",
        },
        qrcode,
      );
    }

    const info = createElement("div", "info-user", {}, header);
    const topline = createElement("div", "user-topline", {}, info);

    const name = createElement("h2", "user-name", {}, topline);
    name.textContent = user.name;

    const badge = createElement("span", "user-mark", {}, topline);
    createElement(
      "img",
      "",
      { src: SOCIAL_ICONS.certification, alt: "Vérifié" },
      badge,
    );

    createElement("p", "user-role", {}, info).textContent = user.role;
    if (user.bio) {
      createElement("p", "user-bio", {}, info).textContent = user.bio;
    }
  }

  private renderTabs(parent: HTMLElement) {
    const tabsWrap = createElement("div", "tabs", { role: "tablist" }, parent);

    const createTab = (id: string, label: string, svgPath: string) => {
      const btn = createElement(
        "button",
        "btn-tabs",
        { type: "button", "data-tab": id },
        tabsWrap,
      );
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${svgPath}" />
            </svg><span>${label}</span>`;
    };

    createTab(
      "stack",
      "Stack",
      "M9.75 3v2.25M14.25 3v2.25M4.5 7.5h15M6.75 7.5v11.25m10.5-11.25v11.25M9 18h6",
    );
    createTab(
      "objectif",
      "Objectif",
      "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
    );
    createTab("stats", "Statistiques", "M3 3v18h18M9 17V9m4 8V5m4 12v-6");
  }

  private renderStackPanel(parent: HTMLElement) {
    const { content } = this.options;
    const panel = createElement("div", "", { "data-panel": "stack" }, parent);

    createElement("p", "section-label", {}, panel).textContent =
      "Technologies utilisées";
    createElement("h3", "section-title", {}, panel).textContent =
      "Architecture";

    const stackContent = createElement("div", "content-stack", {}, panel);

    const renderGroup = (title: string, items?: any[]) => {
      if (!items?.length) return;
      const group = createElement("div", "tech-group", {}, stackContent);
      createElement(
        "p",
        "team-sup-title",
        {},
        group,
      ).textContent = title;

      items.forEach((tech) => {
        const item = createElement("div", "tech-item", {}, group);
        const icon = getStackIcon(tech.name);
        if (icon)
          createElement(
            "img",
            "tech-icon",
            { src: icon, alt: tech.name, loading: "lazy" },
            item,
          );

        const details = createElement("div", "", {}, item);
        createElement("p", "tech-title", {}, details).textContent = tech.name;
        if (tech.version)
          createElement("p", "tech-meta", {}, details).textContent =
            `Version ${tech.version}`;
      });
    };

    renderGroup("Backend", content?.techStack?.backend);
    renderGroup("Frontend", content?.techStack?.frontend);
  }

  private renderGoalPanel(parent: HTMLElement) {
    const { content } = this.options;
    const panel = createElement(
      "div",
      "",
      { "data-panel": "objectif" },
      parent,
    );
    createElement("p", "section-label", {}, panel).textContent = "But du site";
    createElement("h3", "section-title", {}, panel).textContent =
      "Objectif du projet";
    createElement("p", "section-text", {}, panel).innerHTML =
      content?.projectGoal || "Aucun objectif défini.";
  }

  private renderStatsPanel(parent: HTMLElement) {
    const { content } = this.options;
    const panel = createElement("div", "", { "data-panel": "stats" }, parent);
    createElement("p", "section-label", {}, panel).textContent =
      "Statistiques du projet";
    createElement("h3", "section-title", {}, panel).textContent = "Indicateurs";

    const list = createElement("div", "stat-list", {}, panel);
    content?.stats?.forEach((stat) => {
      const row = createElement("article", "stat-row", {}, list);
      const left = createElement("div", "", {}, row);
      createElement("p", "stat-key", {}, left).textContent = stat.label;
      createElement("p", "stat-value", {}, left).textContent = String(
        stat.value,
      );
      if (stat.description)
        createElement("p", "stat-meta", {}, left).textContent =
          stat.description;
    });
  }

  private renderSocialsBlock(parent: HTMLElement) {
    const { user } = this.options;
    const block = createElement("div", "socials-footer", {}, parent);

    createElement("p", "section-label", {}, block).textContent =
      "Réseaux sociaux";
    const list = createElement(
      "div",
      user.social_long ? "social_long_true" : "social_long_false",
      {},
      block,
    );

    user.socials?.forEach((social) => {
      const icon = getSocialIcon(social.name);
      if (user.social_long) {
        const item = createElement(
          "a",
          "social-item",
          { href: social.url, target: "_blank", rel: "noopener" },
          list,
        );
        if (icon)
          createElement(
            "img",
            "social-icon",
            { src: icon, alt: social.name },
            item,
          );
        const textWrap = createElement("div", "", {}, item);
        createElement("p", "social-title", {}, textWrap).textContent =
          social.name;
        createElement("p", "social-link", {}, textWrap).textContent =
          social.url;
      } else if (icon) {
        const link = createElement(
          "a",
          "",
          { href: social.url, target: "_blank" },
          list,
        );
        createElement("img", "social-icon-short", { src: icon, alt: social.name }, link);
      }
    });
  }

  private bindCardTabs(section: HTMLElement) {
    const buttons = section.querySelectorAll<HTMLButtonElement>("[data-tab]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () =>
        this.activateCardTab(section, btn.dataset.tab!),
      );
    });
  }

  private activateCardTab(section: HTMLElement, tabName: string) {
    const buttons = section.querySelectorAll<HTMLButtonElement>("[data-tab]");
    const panels = section.querySelectorAll<HTMLElement>("[data-panel]");

    buttons.forEach((btn) => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle("tab-btn--active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== tabName;
      panel.style.display = panel.dataset.panel === tabName ? "block" : "none";
    });
  }
}
