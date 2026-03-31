export type CardType = "solo" | "solo-mini" | "team" | "team-mini";
export type Theme = "light" | "dark";
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
    avatar: string;
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
