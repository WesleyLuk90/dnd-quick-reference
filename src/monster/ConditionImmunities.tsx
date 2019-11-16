import React from "react";
import { Definition } from "../components/Definition";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";

export function ConditionImmunities({ monster }: { monster: Monster }) {
    if (monster.conditionImmunities.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Condition Immunities"
            text={defaultFormat(monster.conditionImmunities)}
        />
    );
}
