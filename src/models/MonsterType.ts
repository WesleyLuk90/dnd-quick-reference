export class Tag {
    constructor(readonly tag: string, readonly prefix: string) {}
}

export class MonsterType {
    constructor(readonly type: string, tags: Tag[], swarmSize: string) {}

    format() {
        return this.type;
    }
}
