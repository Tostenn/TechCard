import { BaseCard } from './BaseCard';
export declare class CardSolo extends BaseCard {
    render(root: ShadowRoot | HTMLElement): HTMLElement;
    private renderHeader;
    private renderTabs;
    private renderStackPanel;
    private renderGoalPanel;
    private renderStatsPanel;
    private renderSocialsBlock;
    private bindCardTabs;
    private activateCardTab;
}
