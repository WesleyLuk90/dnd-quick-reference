export class ArmorClass {
    constructor(
        readonly ac: number,
        readonly from: string[],
        readonly condition: string
    ) {}

    format() {
        const from = this.from.length > 0 ? `(${this.from.join(", ")})` : "";
        return `${this.ac} ${from} ${this.condition}`;
    }
}
