import { Action } from "./Action";
import { MonsterAlignment } from "./Alignment";
import { ArmorClass } from "./ArmorClass";
import { ChallengeRating } from "./ChallengeRating";
import { ConditionImmunity } from "./ConditionImmunity";
import { DamageModifier } from "./DamageModifier";
import { Health } from "./Health";
import { LegendaryAction } from "./LegendaryAction";
import { LegendaryGroup } from "./LegendaryGroup";
import { MonsterReference } from "./MonsterData";
import { MonsterFlags } from "./MonsterFlags";
import { MonsterGroup } from "./MonsterGroup";
import { MonsterSource } from "./MonsterSource";
import { MonsterTags } from "./MonsterTags";
import { MonsterType } from "./MonsterType";
import { Reaction } from "./Reaction";
import { SavingThrow } from "./SavingThrow";
import { Size } from "./Size";
import { Skill } from "./Skill";
import { Speed } from "./Speed";
import { Spellcasting } from "./Spellcasting";
import { Statistics } from "./Statistics";
import { Trait } from "./Trait";

export interface MonsterReferenceWithPage extends MonsterReference {
    page?: number;
}

export class Monster {
    constructor(
        readonly name: string,
        readonly source: string,
        readonly acs: ArmorClass[],
        readonly size: Size,
        readonly type: MonsterType,
        readonly alignment: MonsterAlignment,
        readonly hp: Health,
        readonly stats: Statistics,
        readonly skills: Skill[],
        readonly speeds: Speed[],
        readonly savingThrows: SavingThrow[],
        readonly damageImmunities: DamageModifier[],
        readonly damageResistance: DamageModifier[],
        readonly conditionImmunities: ConditionImmunity[],
        readonly senses: string[],
        readonly languages: string[],
        readonly challengeRating: ChallengeRating | null,
        readonly traits: Trait[],
        readonly spellcasting: Spellcasting[],
        readonly actions: Action[],
        readonly page: number | null,
        readonly tags: MonsterTags,
        readonly passivePerception: number | null,
        readonly reactions: Reaction[],
        readonly legendaryActions: LegendaryAction[],
        readonly legendaryGroup: LegendaryGroup | null,
        readonly vulnerabilities: DamageModifier[],
        readonly flags: MonsterFlags,
        readonly group: MonsterGroup | null,
        readonly level: number | null,
        readonly altArt: MonsterReferenceWithPage[],
        readonly otherSources: MonsterSource[]
    ) {}

    is(reference: MonsterReference) {
        return (
            this.name.toLowerCase() === reference.name.toLowerCase() &&
            (reference.source == null || reference.source === this.source)
        );
    }

    formatChallengeRating() {
        if (this.challengeRating == null) {
            return "";
        }
        return this.challengeRating.cr;
    }
}
