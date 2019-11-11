import { Alignment, MonsterAlignment } from "../models/Alignment";
import { ArmorClass } from "../models/ArmorClass";
import { Health } from "../models/Health";
import { Monster } from "../models/Monster";
import { MonsterData } from "../models/MonsterData";
import { MonsterType, Tag } from "../models/MonsterType";
import { SavingThrow } from "../models/SavingThrow";
import { Skill } from "../models/Skill";
import { SkillTypes } from "../models/SkillType";
import { Speed, SpeedTypes } from "../models/Speed";
import { AbilityScores, Statistics } from "../models/Statistics";

function toAC(ac: MonsterData["ac"]): ArmorClass[] {
    return ac.map(a => {
        if (typeof a == "number") {
            return new ArmorClass(a, [], "");
        } else {
            return new ArmorClass(a.ac, a.from || [], a.condition || "");
        }
    });
}

function toMonsterType(type: MonsterData["type"]) {
    if (typeof type == "string") {
        return new MonsterType(type, [], "");
    }
    return new MonsterType(
        type.type,
        (type.tags || []).map(tag => {
            if (typeof tag === "string") {
                return new Tag(tag, "");
            }
            return new Tag(tag.tag, tag.prefix);
        }),
        type.swarmSize || ""
    );
}

function toMonsterAlignment(data: MonsterData["alignment"]) {
    if (data == null) {
        return new MonsterAlignment([], []);
    }
    const special: string[] = [];
    const alignments: Alignment[] = [];
    data.forEach(a => {
        if (typeof a === "string") {
            alignments.push(new Alignment(a, 1));
        } else if ("chance" in a) {
            a.alignment.forEach(sa => {
                alignments.push(new Alignment(sa, a.chance || 1));
            });
        } else {
            special.push(a.special);
        }
    });
    return new MonsterAlignment(alignments, special);
}

function toMonsterHealth(data: MonsterData["hp"]) {
    if ("special" in data) {
        return new Health(null, null, data.special);
    } else {
        return new Health(data.average, data.formula, null);
    }
}

function toStatistics(data: MonsterData) {
    return new Statistics(
        data.str,
        data.dex,
        data.con,
        data.wis,
        data.int,
        data.cha
    );
}

function toSkills(data: MonsterData["skill"]) {
    if (data == null) {
        return [];
    }
    return SkillTypes.map(s => {
        const value = data[s];
        if (value != null) {
            return new Skill(s, value);
        }
        return null;
    }).filter((s): s is Skill => s != null);
}

function toSpeeds(data: MonsterData["speed"]) {
    return SpeedTypes.map(s => {
        const speed = data[s];
        if (speed != null) {
            if (typeof speed === "number") {
                return new Speed(s, speed, "");
            } else {
                return new Speed(s, speed.number, speed.condition);
            }
        }
        return null;
    }).filter((s): s is Speed => s != null);
}

function toSavingThrows(data: MonsterData["save"]) {
    if (data == null) {
        return [];
    }
    return AbilityScores.map(s => {
        const value = data[s];
        if (value != null) {
            return new SavingThrow(s, value);
        } else {
            return null;
        }
    }).filter((s): s is SavingThrow => s != null);
}

export function toMonster(data: MonsterData): Monster {
    return new Monster(
        data.name,
        data.source,
        toAC(data.ac),
        data.size,
        toMonsterType(data.type),
        toMonsterAlignment(data.alignment),
        toMonsterHealth(data.hp),
        toStatistics(data),
        toSkills(data.skill),
        toSpeeds(data.speed),
        toSavingThrows(data.save)
    );
}
