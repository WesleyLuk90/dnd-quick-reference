export enum SpeedType {
    WALK = "walk",
    CLIMB = "climb",
    SWIM = "swim",
    FLY = "fly",
    BURROW = "burrow"
}

export class Speed {
    constructor(
        readonly speedType: SpeedType,
        readonly speed: number,
        readonly condition: string
    ) {}
}
