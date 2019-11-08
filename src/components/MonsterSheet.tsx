import React from "react";
import { Monster } from "../models/Monster";
import {
    formatAlignment,
    formatArmorClasses,
    formatSize,
    formatType
} from "../models/Monsters";
import { makeLine } from "../utils/Formatting";
import { Definition } from "./Definition";
import "./MonsterSheet.css";

export function MonsterSheet({ monster }: { monster: Monster }) {
    return (
        <div>
            <h2>{monster.name}</h2>
            <p>
                {makeLine(
                    formatSize(monster.size),
                    formatType(monster.type) + ",",
                    formatAlignment(monster.alignment)
                )}
            </p>
            <hr />
            <Definition
                label="Armor Class"
                text={formatArmorClasses(monster.ac)}
            />
        </div>
    );
}
