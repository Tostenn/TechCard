import { TechCardOptions } from '../types';
export declare abstract class BaseCard {
    protected options: TechCardOptions;
    constructor(options: TechCardOptions);
    abstract render(root: ShadowRoot | HTMLElement): HTMLElement;
}
