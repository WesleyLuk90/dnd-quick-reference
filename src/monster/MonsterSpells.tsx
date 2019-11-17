import React from "react";
import { Label } from "../components/Label";
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
                    <Label>{s.name}</Label> <span>{s.header.join(" ")}</span>
                    {s.spellGroups.map((g, i) => (
                        <SpellGroupDisplay key={i} group={g} />
                    ))}
                    <span>{s.footer.join(" ")}</span>
                </div>
            ))}
        </div>
    );
}
