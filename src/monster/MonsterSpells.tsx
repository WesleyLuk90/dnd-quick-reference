import React from "react";
import { Label } from "../components/Label";
import { LinkedText } from "../components/LinkedText";
import { Spellcasting } from "../models/Spellcasting";
import { SpellGroupDisplay } from "./SpellGroupDisplay";

export function MonsterSpells({
    spellcasting
}: {
    spellcasting: Spellcasting[];
}) {
    if (spellcasting.length === 0) {
        return null;
    }
    return (
        <div>
            {spellcasting.map(s => (
                <div key={s.name}>
                    <Label>{s.name}</Label>{" "}
                    <LinkedText text={s.header.join(" ")} />
                    {s.spellGroups.map((g, i) => (
                        <SpellGroupDisplay key={i} group={g} />
                    ))}
                    <LinkedText text={s.footer.join(" ")} />
                </div>
            ))}
        </div>
    );
}
