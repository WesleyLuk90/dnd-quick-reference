import React from "react";
import { Definition } from "../components/Definition";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";

export function DamageImmunities({ monster }: { monster: Monster }) {
    if (monster.damageImmunities.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Damage Immunities"
            text={defaultFormat(monster.damageImmunities)}
        />
    );
}
