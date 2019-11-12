import React from "react";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

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
