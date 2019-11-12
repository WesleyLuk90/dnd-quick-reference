import React from "react";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

export function Senses({ monster }: { monster: Monster }) {
    if (monster.conditionImmunities.length === 0) {
        return null;
    }

    return <Definition label="Senses" text={monster.senses.join(", ")} />;
}
