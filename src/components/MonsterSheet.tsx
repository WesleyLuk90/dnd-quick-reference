import React from "react";
import { Monster } from "../models/Monster";
import {
    formatArmorClasses,
    formatMonsterSpeed,
    formatSize,
    formatType
} from "../models/Monsters";
import { makeLine } from "../utils/Formatting";
import { DamageImmunities } from "./DamageImmunities";
import { Definition } from "./Definition";
import { MonsterSaves } from "./MonsterSaves";
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
                    monster.alignment.format()
                )}
            </p>
            <hr />
            <Definition
                label="Armor Class"
                text={formatArmorClasses(monster.acs)}
            />
            <Definition label="Hit Points" text={monster.hp.format()} />
            <Definition
                label="Speed"
                text={formatMonsterSpeed(monster.speeds)}
            />
            <hr />
            <StatTable monster={monster} />
            <hr />
            <MonsterSaves monster={monster} />
            <MonsterSkills monster={monster} />
            <DamageImmunities monster={monster} />
        </div>
    );
}
