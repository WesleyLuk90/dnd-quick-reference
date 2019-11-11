import React from "react";
import { Monster } from "../models/Monster";
import { formatDamageImmunities } from "../models/Monsters";
import { Definition } from "./Definition";

export function DamageImmunities({ monster }: { monster: Monster }) {
    if (monster.damageImmunities.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Damage Immunities"
            text={formatDamageImmunities(monster.damageImmunities)}
        />
    );
}
