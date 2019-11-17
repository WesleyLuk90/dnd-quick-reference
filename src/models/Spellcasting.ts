import { ordinal } from "../utils/Ordinal";
import { pluralize } from "../utils/Plural";
import { AbilityScore } from "./Statistics";

export class DailyLimit {
    constructor(readonly count: number) {}

    format() {
        return `${this.count}/day`;
    }
}
export class NoLimit {
    format() {
        return `At will`;
    }
}

export class DailyEachLimit {
    constructor(readonly count: number) {}

    format() {
        return `${this.count}/day each`;
    }
}

export class SpellSlotLimit {
    constructor(
        readonly level: number,
        readonly count: number | undefined,
        readonly lowerLevelRange?: number
    ) {}

    format() {
        const limit =
            this.count != null
                ? `${this.count} ${pluralize(this.count, "slot", "slots")}`
                : "at will";
        if (this.level === 0) {
            return `Cantrips (${limit})`;
        }
        if (this.lowerLevelRange != null) {
            return `${ordinal(this.lowerLevelRange)}-${ordinal(
                this.level
            )} level (${limit})`;
        }
        return `${ordinal(this.level)} level (${limit})`;
    }
}

export type CastingLimit =
    | DailyLimit
    | NoLimit
    | DailyEachLimit
    | SpellSlotLimit;

export class Spell {
    static fromList(spells: string[]) {
        return spells.map(s => new Spell(s));
    }
    constructor(readonly spell: string) {}

    format() {
        return this.spell;
    }
}

export class SpellGroup {
    constructor(
        readonly spells: Spell[],
        readonly limit: CastingLimit,
        readonly hidden: boolean
    ) {}
}

export class Spellcasting {
    constructor(
        readonly name: string,
        readonly spellcastingAbility: AbilityScore | null,
        readonly header: string[],
        readonly footer: string[],
        readonly spellGroups: SpellGroup[]
    ) {}
}
