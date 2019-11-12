import { Alignment, MonsterAlignment } from "../models/Alignment";
import { ArmorClass } from "../models/ArmorClass";
import { ChallengeRating } from "../models/ChallengeRating";
import { ConditionImmunity } from "../models/ConditionImmunity";
import { DamageModifier } from "../models/DamageModifier";
import { DefaultHealth, SpecialHealth } from "../models/Health";
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
        return new SpecialHealth(data.special);
    } else {
        return new DefaultHealth(data.average, data.formula);
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

function toDamageImmunities(data: MonsterData["immune"]) {
    if (data == null) {
        return [];
    }
    return data.map(d => {
        if (typeof d === "string") {
            return new DamageModifier([d], "", "");
        } else {
            return new DamageModifier(d.immune, d.note || "", d.preNote || "");
        }
    });
}

function toConditionImmunities(data: MonsterData["conditionImmune"]) {
    if (data == null) {
        return [];
    }
    return data.map(c => {
        if (typeof c === "string") {
            return new ConditionImmunity([c], "");
        } else {
            return new ConditionImmunity(c.conditionImmune, c.preNote || "");
        }
    });
}

function toChallengeRating(data: MonsterData["cr"]) {
    if (data == null) {
        return null;
    }
    if (typeof data === "string") {
        return new ChallengeRating(data, "", "");
    }
    return new ChallengeRating(data.cr, data.lair || "", data.coven || "");
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
        toSavingThrows(data.save),
        toDamageImmunities(data.immune),
        toConditionImmunities(data.conditionImmune),
        data.senses || [],
        data.languages || [],
        toChallengeRating(data.cr)
    );
}
