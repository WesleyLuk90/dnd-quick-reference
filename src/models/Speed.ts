export enum SpeedType {
    WALK = "walk",
    CLIMB = "climb",
    SWIM = "swim",
    FLY = "fly",
    BURROW = "burrow"
}

export const SpeedTypes = Object.values(SpeedType);

export class Speed {
    constructor(
        readonly speedType: SpeedType,
        readonly speed: number,
        readonly condition: string
    ) {}
}
