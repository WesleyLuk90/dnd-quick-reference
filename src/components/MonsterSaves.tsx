import React from "react";
import { Monster } from "../models/Monster";
import { formatSavingThrows } from "../models/Monsters";
import { Definition } from "./Definition";

export function MonsterSaves({ monster }: { monster: Monster }) {
    if (monster.savingThrows.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Saving Throws"
            text={formatSavingThrows(monster.savingThrows)}
        />
    );
}
