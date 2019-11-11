import { DamageType } from "./DamageType";

export class DamageModifier {
    constructor(
        readonly damageType: DamageType[],
        readonly note: string,
        readonly preNote: string
    ) {}

    format() {
        const note =
            this.note || this.preNote ? `(${this.preNote} ${this.note})` : "";
        return `${this.damageType.join(", ")} ${note}`;
    }
}
