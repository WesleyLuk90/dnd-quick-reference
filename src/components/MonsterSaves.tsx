import React from "react";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

export function MonsterSaves({ monster }: { monster: Monster }) {
    if (monster.savingThrows.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Saving Throws"
            text={defaultFormat(monster.savingThrows)}
        />
    );
}
