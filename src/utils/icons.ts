export const SOCIAL_ICONS: Record<string, string> = {
    fb: "https://static.vecteezy.com/system/resources/thumbnails/065/386/537/small/facebook-circle-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.png",
    in: "https://img.freepik.com/vecteurs-premium/icone-application-linkedin-plus-grand-reseau-professionnel-au-monde-reseaux-sociaux-emplois-carrieres_277909-476.jpg?semt=ais_hybrid&w=740&q=80",
    github: "https://cdn-icons-png.flaticon.com/256/25/25231.png",
    yt: 'https://img.freepik.com/vecteurs-premium/logo-youtube-rouge-logo-medias-sociaux_197792-1803.jpg?semt=ais_hybrid&w=740&q=80',
    ing: "https://img.freepik.com/vecteurs-premium/logo-instagram-degrade-colore_1273375-1516.jpg?semt=ais_hybrid&w=740&q=80",
    certification: "https://cdn.worldvectorlogo.com/logos/twitter-verified-badge.svg"
};

// Mapping des alias pour éviter les if/else
const SOCIAL_KEY_MAP: Record<string, string> = {
    facebook: "fb", fb: "fb",
    linkedin: "in", in: "in",
    instagram: "ing", ins: "ing",
    youtube: "yt", yt: "yt",
    github: "github", git: "github"
};

export function getSocialIcon(name: string): string {
    const key = SOCIAL_KEY_MAP[name.toLowerCase()];
    return SOCIAL_ICONS[key] || SOCIAL_ICONS.github; // Github par défaut
}

export function getStackIcon(name: string): string {
    const TECH_ICONS: Record<string, string> = {
        laravel: "https://www.logo.wine/a/logo/Laravel/Laravel-Logo.wine.svg",
        react: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        php: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Php_logo.svg/1280px-Php_logo.svg.png",
        tailwind: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1280px-Tailwind_CSS_Logo.svg.png",
        js: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    };
    
    const key = name.toLowerCase();
    // Gestion simplifiée des alias pour la stack
    if (key === "javascript") return TECH_ICONS.js;
    return TECH_ICONS[key] || "";
}