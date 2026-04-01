import { TechCardOptions } from "../types";

export const DEFAULT_OPTIONS: Partial<TechCardOptions> = {
    card: "solo-mini",
    theme: "dark",
    creditsText: "Powered by",
    user: {
        name: "John Doe",
        role: "Developer",
        bio: "",
        social_long: true,
        avatar: "",
        qrcode: "",
        socials: [],
    }
};