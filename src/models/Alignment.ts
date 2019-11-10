import { Alignments } from "./MonsterData";

export class Alignment {
    constructor(readonly alignment: Alignments, readonly chance: number) {}
}

export class MonsterAlignment {
    constructor(readonly alignments: Alignment[], readonly special: string[]) {}
}
