import { TextBuilder } from "../utils/TextBuilder";
import { DamageType } from "./DamageType";

export class DamageModifier {
    constructor(
        readonly damageTypes: DamageType[],
        readonly note: string,
        readonly preNote: string,
        readonly conditional: {
            condition: string;
            damageTypes: DamageType[];
        }[] = []
    ) {}

    format() {
        return new TextBuilder()
            .add(this.preNote)
            .list(this.damageTypes)
            .note(b => b.add(this.note))
            .note(b =>
                b.list(
                    this.conditional.map(c =>
                        new TextBuilder()
                            .list(c.damageTypes)
                            .note(b => b.add(c.condition))
                            .build()
                    )
                )
            )
            .build();
    }
}
