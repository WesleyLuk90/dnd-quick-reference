import { Alignments } from "./Alignment";
import { ArmorCheck } from "./ArmorCheck";
import { Health } from "./Health";
import { MonsterReference, Size } from "./MonsterData";
import { MonsterType } from "./MonsterType";
import { Skill } from "./Skill";
import { Speed } from "./Speed";
import { Statistics } from "./Statistics";

export class Monster {
    constructor(
        readonly name: string,
        readonly source: string,
        readonly acs: ArmorCheck[],
        readonly size: Size,
        readonly type: MonsterType,
        readonly alignment: Alignments,
        readonly hp: Health,
        readonly stats: Statistics,
        readonly skills: Skill[],
        readonly speeds: Speed[]
    ) {}

    is(reference: MonsterReference) {
        return (
            this.name === reference.name &&
            (reference.source == null || reference.source === this.source)
        );
    }
}
