import { Action } from "../models/Action";
import { Alignment, MonsterAlignment } from "../models/Alignment";
import { ArmorClass } from "../models/ArmorClass";
import { ChallengeRating } from "../models/ChallengeRating";
import { ConditionImmunity } from "../models/ConditionImmunity";
import {
    InlineContent,
    LabeledContent,
    LinkContent,
    ListContent,
    TextContent
} from "../models/Content";
import { DamageModifier } from "../models/DamageModifier";
import { DamageType } from "../models/DamageType";
import { DefaultHealth, SpecialHealth } from "../models/Health";
import { Monster } from "../models/Monster";
import {
    Entry,
    MonsterData,
    SpellSlotData,
    SubEntry
} from "../models/MonsterData";
import { MonsterTags } from "../models/MonsterTags";
import { MonsterType, Tag } from "../models/MonsterType";
import { Reaction } from "../models/Reaction";
import { SavingThrow } from "../models/SavingThrow";
import { Skill } from "../models/Skill";
import { SkillTypes } from "../models/SkillType";
import { Speed, SpeedTypes } from "../models/Speed";
import {
    CastingLimit,
    DailyEachLimit,
    DailyLimit,
    NoLimit,
    Spell,
    Spellcasting,
    SpellGroup,
    SpellSlotLimit
} from "../models/Spellcasting";
import { AbilityScores, Statistics } from "../models/Statistics";
import { Trait } from "../models/Trait";

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

function toSubContent(subEntries: SubEntry[]) {
    return subEntries.map(se => {
        if (typeof se === "string") {
            return new TextContent(se);
        } else if (se.type === "link") {
            return new LinkContent(se.text, se.href);
        } else {
            return new LabeledContent(se.name, se.entry);
        }
    });
}

function toTraits(data: MonsterData["trait"]) {
    if (data == null) {
        return [];
    }
    return data.map(trait => new Trait(trait.name, toContent(trait.entries)));
}

function toSpellcasting(data: MonsterData["spellcasting"]): Spellcasting[] {
    if (data == null) {
        return [];
    }
    return data.map(d => {
        const groups: SpellGroup[] = [];
        if (d.will != null) {
            groups.push(
                new SpellGroup(
                    Spell.fromList(d.will),
                    new NoLimit(),
                    d.hidden != null && d.hidden.includes("will")
                )
            );
        }
        function addDaily(e: string[] | undefined, limit: CastingLimit) {
            if (e == null) {
                return;
            }
            groups.push(
                new SpellGroup(
                    Spell.fromList(e),
                    limit,
                    d.hidden != null && d.hidden.includes("daily")
                )
            );
        }
        if (d.daily != null) {
            addDaily(d.daily["1e"], new DailyEachLimit(1));
            addDaily(d.daily["2e"], new DailyEachLimit(1));
            addDaily(d.daily["3e"], new DailyEachLimit(1));
            addDaily(d.daily["1"], new DailyLimit(1));
            addDaily(d.daily["2"], new DailyLimit(1));
            addDaily(d.daily["3"], new DailyLimit(1));
        }
        function addSpellSlot(
            data: SpellSlotData | undefined,
            slotLevel: number
        ) {
            if (data == null) {
                return;
            }
            groups.push(
                new SpellGroup(
                    Spell.fromList(data.spells),
                    new SpellSlotLimit(slotLevel, data.slots, data.lower),
                    false
                )
            );
        }
        if (d.spells != null) {
            addSpellSlot(d.spells["0"], 0);
            addSpellSlot(d.spells["1"], 1);
            addSpellSlot(d.spells["2"], 2);
            addSpellSlot(d.spells["3"], 3);
            addSpellSlot(d.spells["4"], 4);
            addSpellSlot(d.spells["5"], 5);
            addSpellSlot(d.spells["6"], 6);
            addSpellSlot(d.spells["7"], 7);
            addSpellSlot(d.spells["8"], 8);
            addSpellSlot(d.spells["9"], 9);
        }
        return new Spellcasting(
            d.name,
            d.ability || null,
            d.headerEntries,
            d.footerEntries || [],
            groups
        );
    });
}

function toContent(entries: Entry[]) {
    return new InlineContent(
        entries.map(e => {
            if (typeof e === "string") {
                return new TextContent(e);
            } else if (e.type === "list") {
                return new ListContent(toSubContent(e.items));
            } else {
                return new InlineContent(toSubContent(e.entries));
            }
        })
    );
}

function toActions(data: MonsterData["action"]): Action[] {
    if (data == null) {
        return [];
    }
    return data.map(
        action => new Action(action.name, toContent(action.entries))
    );
}

function toReactions(data: MonsterData["reaction"]): Reaction[] {
    if (data == null) {
        return [];
    }
    return data.map(
        reaction => new Reaction(reaction.name, toContent(reaction.entries))
    );
}

function toTags(data: MonsterData): MonsterTags {
    return new MonsterTags(
        data.actionTags || [],
        data.damageTags || [],
        data.languageTags || [],
        data.miscTags || [],
        data.senseTags || [],
        data.spellcastingTags || [],
        data.traitTags || []
    );
}

function toDamageResistances(data: MonsterData["resist"]): DamageModifier[] {
    if (data == null) {
        return [];
    }
    return data.map(r => {
        if (typeof r === "string") {
            return new DamageModifier([r], "", "");
        } else if ("special" in r) {
            return new DamageModifier([], r.special, "");
        } else {
            const special = r.resist
                .filter(
                    (r): r is { resist: DamageType[]; note: string } =>
                        typeof r !== "string"
                )
                .map(r => ({
                    damageTypes: r.resist,
                    condition: r.note
                }));
            return new DamageModifier(
                r.resist.filter((r): r is DamageType => typeof r === "string"),
                r.note || "",
                r.preNote || "",
                special
            );
        }
    });
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
        toDamageResistances(data.resist),
        toConditionImmunities(data.conditionImmune),
        data.senses || [],
        data.languages || [],
        toChallengeRating(data.cr),
        toTraits(data.trait),
        toSpellcasting(data.spellcasting),
        toActions(data.action),
        data.page || null,
        toTags(data),
        data.passive || null,
        toReactions(data.reaction)
    );
}
