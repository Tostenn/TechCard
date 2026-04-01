/**
 * Crée un élément HTML avec des attributs et une classe.
 */
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, attrs?: Record<string, string>, parent?: HTMLElement | ShadowRoot): HTMLElementTagNameMap[K];
