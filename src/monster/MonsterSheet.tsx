import React from "react";
import { Definition } from "../components/Definition";
import { ListDefinition } from "../components/ListDefinition";
import { defaultFormat, formatSize } from "../models/Formatters";
import { Monster } from "../models/Monster";
import { makeLine } from "../utils/Formatting";
import { ChallengeRating } from "./ChallengeRating";
import { ConditionImmunities } from "./ConditionImmunities";
import { DamageImmunities } from "./DamageImmunities";
import { DamageResistances } from "./DamageResistances";
import { LegendaryActions } from "./LegendaryActions";
import { MonsterActions } from "./MonsterActions";
import { MonsterReactions } from "./MonsterReactions";
import { MonsterSaves } from "./MonsterSaves";
import "./MonsterSheet.css";
import { MonsterSkills } from "./MonsterSkills";
import { MonsterSpells } from "./MonsterSpells";
import { MonsterTraits } from "./MonsterTraits";
import { StatTable } from "./StatTable";

export function MonsterSheet({ monster }: { monster: Monster }) {
    console.log(monster);
    return (
        <div>
            <h2>{monster.name}</h2>
            <p>
                {makeLine(
                    formatSize(monster.size),
                    monster.type.format() + ",",
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
            <DamageResistances monster={monster} />
            <DamageImmunities monster={monster} />
            <ConditionImmunities monster={monster} />
            <ListDefinition
                label="Senses"
                values={monster.senses}
                suffix={
                    monster.passivePerception
                        ? `Passive Perception ${monster.passivePerception}`
                        : null
                }
            />
            <ListDefinition label="Languages" values={monster.languages} />
            <ChallengeRating monster={monster} />
            <hr />
            <MonsterTraits monster={monster} />
            <MonsterSpells spellcasting={monster.spellcasting} />
            <hr />
            <MonsterActions monster={monster} />
            <MonsterReactions monster={monster} />
            <LegendaryActions monster={monster} />
        </div>
    );
}
