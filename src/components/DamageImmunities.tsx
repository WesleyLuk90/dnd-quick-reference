import React from "react";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

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
