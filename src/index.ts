import { TechCard } from "./TechCard";
export * from './types'; // Si tu as des interfaces à partager

// Assignation globale immédiate
if (typeof window !== "undefined") {
    (window as any).TechCard = TechCard;
}

// Un seul type d'export pour éviter le conflit Rollup
export default TechCard;