export class DefaultHealth {
    constructor(readonly average: number, readonly formula: string) {}
    format() {
        return `${this.average} (${this.formula})`;
    }
}

export class SpecialHealth {
    constructor(readonly special: string) {}
    format() {
        return this.special;
    }
}

export type Health = DefaultHealth | SpecialHealth;
