export class BemBuilder {
    constructor(readonly block: string) {}

    element(element: string, modifier?: string, condition?: boolean) {
        if (modifier != null && (condition == null || condition === true)) {
            return `${this.block}__${element} ${this.block}__${element}--${modifier}`;
        }
        return `${this.block}__${element}`;
    }
}
