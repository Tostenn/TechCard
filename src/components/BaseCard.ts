import { TechCardOptions } from "../types";

export abstract class BaseCard {
    constructor(protected options: TechCardOptions) {}
    abstract render(root: ShadowRoot | HTMLElement): HTMLElement;
}