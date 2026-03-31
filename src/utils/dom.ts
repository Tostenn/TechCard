/**
 * Crée un élément HTML avec des attributs et une classe.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className: string = "",
    attrs: Record<string, string> = {},
    parent?: HTMLElement | ShadowRoot
): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    if (className) el.className = className;
    
    Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, value);
    });

    if (parent) parent.appendChild(el);
    return el;
}