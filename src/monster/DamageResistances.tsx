import React from "react";
import { Definition } from "../components/Definition";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";

export function DamageResistances({ monster }: { monster: Monster }) {
    if (monster.damageResistance.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Damage Resistances"
            text={defaultFormat(monster.damageResistance)}
        />
    );
}
