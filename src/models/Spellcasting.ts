import { AbilityScore } from "./Statistics";

export class DailyLimit {
    constructor(readonly count: number) {}
}
export class NoLimit {}

export class DailyEachLimit {
    constructor(readonly count: number) {}
}

export class SpellSlotLimit {
    constructor(
        readonly level: number,
        readonly count: number | undefined,
        readonly lowerLevelRange?: number
    ) {}
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
