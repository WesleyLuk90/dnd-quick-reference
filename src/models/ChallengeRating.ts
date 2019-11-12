import { Formatter } from "./Formatters";

export class ChallengeRating {
    constructor(
        readonly cr: string,
        readonly lair: string,
        readonly coven: string
    ) {}

    format() {
        return Formatter.create(this.cr)
            .addCondition(this.lair, s => `Lair: ${s}`)
            .addCondition(this.coven, s => `Coven: ${s}`)
            .format();
    }
}
