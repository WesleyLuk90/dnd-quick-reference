import React from "react";
import { defaultFormat, formatSize, formatType } from "../models/Formatters";
import { Monster } from "../models/Monster";
import { makeLine } from "../utils/Formatting";
import { ConditionImmunities } from "./ConditionImmunities";
import { DamageImmunities } from "./DamageImmunities";
import { Definition } from "./Definition";
import { MonsterSaves } from "./MonsterSaves";
import "./MonsterSheet.css";
import { MonsterSkills } from "./MonsterSkills";
import { Senses } from "./Senses";
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
            <Definition label="Armor Class" text={defaultFormat(monster.acs)} />
            <Definition label="Hit Points" text={monster.hp.format()} />
            <Definition label="Speed" text={defaultFormat(monster.speeds)} />
            <hr />
            <StatTable monster={monster} />
            <hr />
            <MonsterSaves monster={monster} />
            <MonsterSkills monster={monster} />
            <DamageImmunities monster={monster} />
            <ConditionImmunities monster={monster} />
            <Senses monster={monster} />
        </div>
    );
}
