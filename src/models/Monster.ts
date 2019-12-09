import { MonsterReference } from "../dataModels/MonsterData";
import { Action } from "./Action";
import { MonsterAlignment } from "./Alignment";
import { ArmorClass } from "./ArmorClass";
import { ChallengeRating } from "./ChallengeRating";
import { ConditionImmunity } from "./ConditionImmunity";
import { DamageModifier } from "./DamageModifier";
import { DragonCastingColor } from "./DragonCastingColor";
import { Environment } from "./Environment";
import { Health } from "./Health";
import { Legendary } from "./Legendary";
import { LegendaryGroup } from "./LegendaryGroup";
import { MonsterFlags } from "./MonsterFlags";
import { MonsterGroup } from "./MonsterGroup";
import { MonsterNames } from "./MonsterNames";
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
        readonly names: MonsterNames,
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
        readonly legendary: Legendary | null,
        readonly legendaryGroup: LegendaryGroup | null,
        readonly vulnerabilities: DamageModifier[],
        readonly flags: MonsterFlags,
        readonly group: MonsterGroup | null,
        readonly level: number | null,
        readonly altArt: MonsterReferenceWithPage[],
        readonly otherSources: MonsterSource[],
        readonly soundClip: string,
        readonly environment: Environment[],
        readonly dragonCastingColor: DragonCastingColor | null,
        readonly actionNote: string | null
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
