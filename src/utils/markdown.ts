
/**
 * Mini parseur Markdown pour les sections de contenu. Supporte les titres, le gras, l'italique et les retours à la ligne.
 * Conçu pour être simple et rapide, sans dépendances externes.
 * @param text Le texte Markdown à parser
 * @returns 
 */
export function miniParseMarkdown(text: string): string {
    return text
        // Titres : ## Titre -> <h2>Titre</h2>
        .replace(/^## (.*$)/gim, '<h2 class="section-title">$1</h2>')
        // Titres : # Titre -> <h1>Titre</h1>
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold">$1</h1>')
        // Gras : **texte** -> <strong>texte</strong>
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        // Italique : *texte* -> <em>texte</em>
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // Retours à la ligne (Double saut de ligne -> Paragraphe)
        .replace(/\n\n/gim, '</p><p class="section-text">')
        // Saut de ligne simple -> <br>
        .replace(/\n/gim, '<br>');
}