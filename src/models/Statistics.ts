import { capitalize } from "lodash";

export enum AbilityScore {
    STR = "str",
    DEX = "dex",
    CON = "con",
    WIS = "wis",
    INT = "int",
    CHA = "cha"
}

export const AbilityScores = Object.values(AbilityScore);

export function abilityScoreLabel(abilityScore: AbilityScore) {
    return capitalize(abilityScore);
}

export class Statistics {
    constructor(
        readonly str: number,
        readonly dex: number,
        readonly con: number,
        readonly wis: number,
        readonly int: number,
        readonly cha: number
    ) {}
}
