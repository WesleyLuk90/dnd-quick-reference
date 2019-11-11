import { AbilityScore, abilityScoreLabel } from "./Statistics";

export class SavingThrow {
    constructor(readonly stat: AbilityScore, readonly value: string) {}

    format() {
        return `${abilityScoreLabel(this.stat)} ${this.value}`;
    }
}
