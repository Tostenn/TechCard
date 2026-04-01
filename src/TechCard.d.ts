import { TechCardOptions } from './types';
export declare class TechCard {
    private static activeInstance;
    private host;
    private container;
    private options;
    constructor(userOptions: Partial<TechCardOptions>);
    /**
     * Fusionne les options et s'assure que les objets imbriqués (user)
     * ne sont pas perdus.
     */
    private validateAndMergeOptions;
    private init;
    static getInstance(): TechCard | null;
    private createOverlay;
    private installShortcuts;
    toggle(): void;
    open(): void;
    close(): void;
}
