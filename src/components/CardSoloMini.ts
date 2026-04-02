import { BaseCard } from "./BaseCard";
import { createElement } from "../utils/dom";
import { getSocialIcon, SOCIAL_ICONS } from "../utils/icons";

export class CardSoloMini extends BaseCard {
  render(root: ShadowRoot | HTMLElement): HTMLElement {
    const { user, creditsText } = this.options;

    // 1. Conteneur principal
    const section = createElement(
      "section",
      "signature-card signature-card--mini relative",
      {},
      root,
    );
    section.innerHTML = `<div class="credits"><span>⚡</span><p>${creditsText}</p></div>`;

    // 2. QR Code (Conditionnel)
    if (user.qrcode) {
      const qrcode = createElement("div", "qrcode", {}, section);
      createElement(
        "img",
        "h-full w-full object-cover",
        {
          src: user.qrcode,
          alt: "QR Code",
          loading: "lazy",
        },
        qrcode,
      );
    }

    // 3. Header (Avatar + Infos)
    const header = createElement("div", "mini-header", {}, section);

    if (user.avatar) {
      const avatarWrap = createElement(
        "div",
        "avatar-wrap avatar-wrap--mini",
        {},
        header,
      );
      createElement(
        "img",
        "avatar-image",
        {
          src: user.avatar,
          alt: user.name,
          loading: "lazy",
        },
        avatarWrap,
      );
    }

    const content = createElement(
      "div",
      "flex flex-col min-w-0 flex-1 justify-center",
      {},
      header,
    );

    // Nom et Badge de certification
    const topline = createElement("div", "user-topline", {}, content);
    const nameEl = createElement("h2", "user-name", {}, topline);
    nameEl.textContent = user.name;

    const badge = createElement("span", "user-mark", {}, topline);
    createElement(
      "img",
      "",
      {
        src: SOCIAL_ICONS.certification,
        alt: "Vérifié",
      },
      badge,
    );

    // Role et Bio
    const roleEl = createElement("p", "user-role", {}, content);
    roleEl.textContent = user.role;

    if (user.bio) {
      const bioEl = createElement("p", "user-bio", {}, content);
      bioEl.textContent = user.bio;
    }

    // 4. Réseaux Sociaux
    const socialsContainer = createElement("div", "mini-socials", {}, content);

    user.socials?.forEach((social) => {
      const link = createElement(
        "a",
        "",
        {
          href: social.url || "#",
          target: "_blank",
          rel: "noopener noreferrer",
          title: social.name,
        },
        socialsContainer,
      );

      const iconSrc = getSocialIcon(social.name);
      if (iconSrc) {
        createElement(
          "img",
          "",
          {
            src: iconSrc,
            alt: social.name,
            loading: "lazy",
          },
          link,
        );
      } else {
        link.textContent = social.name;
      }
    });

    return section;
  }
}
