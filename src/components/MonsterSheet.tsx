import React from "react";
import { Monster } from "../models/Monster";
import {
    formatAlignment,
    formatArmorClasses,
    formatHealth,
    formatSize,
    formatType
} from "../models/Monsters";
import { makeLine } from "../utils/Formatting";
import { Definition } from "./Definition";
import "./MonsterSheet.css";
import { MonsterSkills } from "./MonsterSkills";
import { StatTable } from "./StatTable";

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
            <Definition label="Hit Points" text={formatHealth(monster.hp)} />
            <hr />
            <StatTable monster={monster} />
            <hr />
            <MonsterSkills monster={monster} />
        </div>
    );
}
