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

    format() {
        if (this.speedType === SpeedType.WALK) {
            return `${this.speed} ft. ${this.condition}`;
        }
        return `${this.speedType} ${this.speed} ft. ${this.condition}`;
    }
}
