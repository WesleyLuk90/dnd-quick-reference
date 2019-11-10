export enum BaseAlignment {
    LAWFUL = "L",
    NEUTRAL = "N",
    NEUTRAL_X = "NX",
    NEUTRAL_Y = "NY",
    CHAOTIC = "C",
    GOOD = "G",
    EVIL = "E",
    UNALIGNED = "U",
    ANY = "A"
}

const names: { [key in BaseAlignment]: string } = {
    [BaseAlignment.LAWFUL]: "Lawful",
    [BaseAlignment.NEUTRAL]: "Neutral",
    [BaseAlignment.NEUTRAL_X]: "Neutral X",
    [BaseAlignment.NEUTRAL_Y]: "Neutral Y",
    [BaseAlignment.CHAOTIC]: "Chaotic",
    [BaseAlignment.GOOD]: "Good",
    [BaseAlignment.EVIL]: "Evil",
    [BaseAlignment.UNALIGNED]: "Unaligned",
    [BaseAlignment.ANY]: "Any"
};

export class Alignment {
    constructor(readonly alignment: BaseAlignment, readonly chance: number) {}

    format() {
        if (this.chance !== 1) {
            return `${names[this.alignment]} (${(this.chance * 100).toFixed(
                0
            )}%)`;
        }
    }
}

export class MonsterAlignment {
    constructor(readonly alignments: Alignment[], readonly special: string[]) {}

    format() {
        const base = this.alignments.map(a => a.format()).join(" ");
        if (this.special.length > 0) {
            return `${base} (${this.special.join(", ")})`;
        }
        return base;
    }
}
