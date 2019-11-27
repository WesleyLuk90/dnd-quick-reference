import { LegendaryAction } from "./LegendaryAction";

export class Legendary {
    constructor(
        readonly header: string[],
        readonly actions: LegendaryAction[],
        readonly count: number
    ) {}
}
