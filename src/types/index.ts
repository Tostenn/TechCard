export type CardType = "solo" | "solo-mini" | "team" | "team-mini";
export type Theme = "light" | "dark" | string;

export interface Social {
    name: string;
    url: string;
}

export interface Tech {
    name: string;
    version?: string;
}

export interface Stat {
    label: string;
    value: string | number;
    description?: string;
}

export interface User {
    name: string;
    role: string;
    bio?: string;
    avatar?: string;
    qrcode?: string;
    social_long?: boolean;
    socials: Social[];
}

export interface TechCardOptions {
    card: CardType;
    theme: Theme;
    creditsText: string;
    user: User;
    content?: {
        projectGoal?: string;
        techStack?: {
            backend?: Tech[];
            frontend?: Tech[];
        };
        stats?: Stat[];
    };
}

// Type utilitaire pour les variables CSS personnalisées (ex: { accent: "255 0 0" })
export type ThemeConfig = Record<string, string>;