export class Health {
    constructor(
        readonly average: number | null,
        readonly formula: string | null,
        readonly special: string | null
    ) {}

    format() {
        return `${this.average || ""} (${this.formula || ""}) ${this.special ||
            ""}`;
    }
}
