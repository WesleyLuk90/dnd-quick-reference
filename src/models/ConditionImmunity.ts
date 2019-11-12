import { Condition } from "./Condition";

export class ConditionImmunity {
    constructor(readonly conditions: Condition[], readonly preNote: string) {}

    format() {
        const preNote = this.preNote !== "" ? `${this.preNote}` : "";

        return `${this.conditions.join(", ")} ${preNote}`;
    }
}
