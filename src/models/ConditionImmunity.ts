import { TextBuilder } from "../utils/TextBuilder";
import { Condition } from "./Condition";

export class ConditionImmunity {
    constructor(readonly conditions: Condition[], readonly preNote: string) {}

    format() {
        return new TextBuilder()
            .add(this.preNote)
            .list(this.conditions)
            .build();
    }
}
