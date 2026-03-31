import { TechCardOptions } from './types';
export declare class TechCard {
    private options;
    private static activeInstance;
    private host;
    private container;
    constructor(options: TechCardOptions);
    private init;
    static getInstance(): TechCard | null;
    private createOverlay;
    private installShortcuts;
    toggle(): void;
    open(): void;
    close(): void;
}
