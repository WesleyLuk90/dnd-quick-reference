import { MonsterAlignment } from "./Alignment";
import { ArmorClass } from "./ArmorClass";
import { DamageModifier } from "./DamageModifier";
import { Health } from "./Health";
import { MonsterReference } from "./MonsterData";
import { MonsterType } from "./MonsterType";
import { SavingThrow } from "./SavingThrow";
import { Size } from "./Size";
import { Skill } from "./Skill";
import { Speed } from "./Speed";
import { Statistics } from "./Statistics";

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
        readonly damageImmunities: DamageModifier[]
    ) {}

    is(reference: MonsterReference) {
        return (
            this.name.toLowerCase() === reference.name.toLowerCase() &&
            (reference.source == null || reference.source === this.source)
        );
    }
}
