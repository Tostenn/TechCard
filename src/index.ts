import { TechCard } from "./TechCard";
export * from './types';

// Assignation globale immédiate
if (typeof window !== "undefined") {
    (window as any).TechCard = TechCard;
}

// Un seul type d'export pour éviter le conflit Rollup
export default TechCard;