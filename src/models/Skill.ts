import { skillLabel, SkillType } from "./SkillType";

export class Skill {
    constructor(readonly type: SkillType, readonly value: string) {}

    format() {
        return `${skillLabel(this.type)} ${this.value}`;
    }
}
