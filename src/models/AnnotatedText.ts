export enum TextAnnotation {
    dice = "dice",
    dc = "dc",
    hit = "hit",
    on_hit = "h",
    attack = "atk",
    damage = "damage",
    recharge = "recharge"
}

const ATTACK_TYPES: { [key: string]: string } = {
    ms: "Melee Spell Attack:",
    mw: "Melee Weapon Attack:",
    rw: "Ranged Weapon Attack:",
    "mw,rw": "Melee or Ranged Weapon Attack:"
};

export class AnnotatedText {
    constructor(readonly annotation: TextAnnotation, readonly text: string) {}

    format() {
        switch (this.annotation) {
            case TextAnnotation.dc:
                return `DC ${this.text}`;
            case TextAnnotation.hit:
                return `+${this.text}`;
            case TextAnnotation.on_hit:
                return `Hit: `;
            case TextAnnotation.attack:
                return ATTACK_TYPES[this.text] || this.text;
            case TextAnnotation.recharge:
                return this.text !== ""
                    ? `(Recharge ${this.text}-6)`
                    : `(Recharge 6)`;
            default:
                return this.text;
        }
    }
}
