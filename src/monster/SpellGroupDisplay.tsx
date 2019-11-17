import React from "react";
import { LinkedText } from "../components/LinkedText";
import { defaultFormat } from "../models/Formatters";
import { SpellGroup } from "../models/Spellcasting";

export function SpellGroupDisplay({ group }: { group: SpellGroup }) {
    if (group.hidden) {
        return null;
    }
    return (
        <div>
            <span>{group.limit.format()}</span>:{" "}
            <LinkedText text={defaultFormat(group.spells)} />
        </div>
    );
}
