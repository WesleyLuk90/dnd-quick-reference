import * as t from "io-ts";
import { BaseAlignment } from "../models/Alignment";
import { Condition } from "../models/Condition";
import { DamageType } from "../models/DamageType";
import { DragonCastingColor } from "../models/DragonCastingColor";
import { createEnum } from "../models/Enums";
import { Environment } from "../models/Environment";
import { MonsterGroup } from "../models/MonsterGroup";
import {
    ActionTag,
    DamageTag,
    LanguageTag,
    MiscTag,
    SenseTag,
    SpellcastingTag,
    TraitTag
} from "../models/MonsterTags";
import { Size } from "../models/Size";
import { EntrySchema } from "./EntryData";
import { PageSourceSchema, SourceSchema } from "./Sources";
import { SpellcastingSchema } from "./Spellcasting";
import { optional, optionalArray } from "./Types";

const ComplexACSchema = t.strict({
    ac: t.number,
    from: optionalArray(t.string),
    condition: optional(t.string),
    braces: optional(t.boolean)
});

const ACSchema = t.union([t.number, ComplexACSchema]);

const SizeSchema = createEnum<Size>(Size, "Size");

const TypeTag = t.union([
    t.string,
    t.strict({
        tag: t.string,
        prefix: t.string
    })
]);

const TypeSchema = t.union([
    t.string,
    t.strict({
        type: t.string,
        tags: optionalArray(TypeTag),
        swarmSize: optional(t.string)
    })
]);

const AlignmentsSchema = createEnum<BaseAlignment>(
    BaseAlignment,
    "BaseAlignment"
);

const ComplexAlignment = t.strict({
    alignment: t.array(AlignmentsSchema),
    chance: optional(t.number)
});

const SpecialAlignment = t.strict({
    special: t.string
});

const AlignmentSchema = optional(
    t.array(t.union([AlignmentsSchema, ComplexAlignment, SpecialAlignment]))
);

const SimpleHealth = t.strict({
    average: t.number,
    formula: t.string
});

const SpecialHealth = t.strict({
    special: t.string
});

const HealthSchema = t.union([SimpleHealth, SpecialHealth]);

const SkillsSchema = t.union([
    t.void,
    t.strict({
        acrobatics: optional(t.string),
        perception: optional(t.string),
        stealth: optional(t.string),
        history: optional(t.string),
        insight: optional(t.string),
        intimidation: optional(t.string),
        persuasion: optional(t.string),
        performance: optional(t.string),
        arcana: optional(t.string),
        investigation: optional(t.string),
        religion: optional(t.string),
        athletics: optional(t.string),
        nature: optional(t.string),
        survival: optional(t.string),
        deception: optional(t.string),
        medicine: optional(t.string),
        "animal handling": optional(t.string),
        "sleight of hand": optional(t.string),
        other: optional(
            t.array(
                t.strict({
                    oneOf: t.strict({
                        arcana: t.string,
                        history: t.string,
                        nature: t.string,
                        religion: t.string
                    })
                })
            )
        )
    })
]);

const SpeedSchema = t.union([
    t.number,
    t.strict({
        number: t.number,
        condition: t.string
    })
]);

const SpeedsSchema = t.strict({
    walk: optional(SpeedSchema),
    climb: optional(SpeedSchema),
    fly: optional(SpeedSchema),
    swim: optional(SpeedSchema),
    burrow: optional(SpeedSchema),
    canHover: optional(t.boolean)
});

const SavesSchema = t.strict({
    str: optional(t.string),
    dex: optional(t.string),
    con: optional(t.string),
    wis: optional(t.string),
    int: optional(t.string),
    cha: optional(t.string)
});

const DamageTypeSchema = createEnum<DamageType>(DamageType, "DamageType");
const ConditionSchema = createEnum<Condition>(Condition, "Condition");

const DamageImmunitySchema = t.union([
    DamageTypeSchema,
    t.strict({
        immune: t.array(DamageTypeSchema),
        preNote: optional(t.string),
        note: optional(t.string)
    })
]);

const ConditionImmunitySchema = optional(
    t.array(
        t.union([
            ConditionSchema,
            t.strict({
                conditionImmune: t.array(ConditionSchema),
                preNote: optional(t.string)
            })
        ])
    )
);

export const ChallengeRatingSchema = t.union([
    t.undefined,
    t.string,
    t.strict({
        cr: t.string,
        lair: optional(t.string),
        coven: optional(t.string)
    })
]);

const TraitSchema = t.strict({
    type: optional(t.keyof({ entries: null, inset: null })),
    name: t.string,
    entries: t.array(EntrySchema)
});

const TagSchema = t.strict({
    actionTags: optionalArray(createEnum<ActionTag>(ActionTag, "ActionTag")),
    damageTags: optionalArray(createEnum<DamageTag>(DamageTag, "DamageTag")),
    senseTags: optionalArray(createEnum<SenseTag>(SenseTag, "SenseTag")),
    traitTags: optionalArray(createEnum<TraitTag>(TraitTag, "TraitTag")),
    languageTags: optionalArray(
        createEnum<LanguageTag>(LanguageTag, "LanguageTag")
    ),
    spellcastingTags: optionalArray(
        createEnum<SpellcastingTag>(SpellcastingTag, "SpellcastingTag")
    ),
    miscTags: optionalArray(createEnum<MiscTag>(MiscTag, "MiscTag"))
});

const ResistSchema = t.union([
    DamageTypeSchema,
    t.strict({
        resist: t.array(
            t.union([
                DamageTypeSchema,
                t.strict({
                    resist: t.array(DamageTypeSchema),
                    note: t.string
                })
            ])
        ),
        preNote: optional(t.string),
        note: optional(t.string)
    }),
    t.strict({ special: t.string })
]);

const LegendaryActionSchema = t.strict({
    name: optional(t.string),
    entries: t.array(EntrySchema)
});

const ActionLikeSchema = t.strict({
    name: t.string,
    entries: t.array(EntrySchema)
});

const LegendaryGroupSchema = t.strict({
    name: t.string,
    source: t.string
});

const VulnerableSchema = t.union([
    DamageTypeSchema,
    t.strict({ vulnerable: t.array(DamageTypeSchema), note: t.string })
]);

const MonsterGroupSchema = createEnum<MonsterGroup>(
    MonsterGroup,
    "MonsterGroup"
);

export const MonsterSchema = t.intersection([
    t.strict({
        name: t.string,
        shortName: optional(t.string),
        source: t.string,
        ac: t.array(ACSchema),
        size: SizeSchema,
        type: TypeSchema,
        alignment: AlignmentSchema,
        hp: HealthSchema,
        str: t.number,
        dex: t.number,
        con: t.number,
        wis: t.number,
        int: t.number,
        cha: t.number,
        skill: SkillsSchema,
        speed: SpeedsSchema,
        save: optional(SavesSchema),
        immune: optionalArray(DamageImmunitySchema),
        resist: optionalArray(ResistSchema),
        conditionImmune: ConditionImmunitySchema,
        senses: optionalArray(t.string),
        languages: optionalArray(t.string),
        cr: ChallengeRatingSchema,
        trait: optionalArray(TraitSchema),
        spellcasting: optionalArray(SpellcastingSchema),
        action: optionalArray(ActionLikeSchema),
        reaction: optionalArray(ActionLikeSchema),
        legendary: optionalArray(LegendaryActionSchema),
        legendaryGroup: optional(LegendaryGroupSchema),
        page: optional(t.number),
        passive: optional(t.number),
        isNpc: optional(t.boolean),
        vulnerable: optionalArray(VulnerableSchema),
        familiar: optional(t.boolean),
        isNamedCreature: optional(t.boolean),
        group: optional(MonsterGroupSchema),
        level: optional(t.number),
        altArt: optionalArray(PageSourceSchema),
        otherSources: optionalArray(SourceSchema),
        variant: optionalArray(EntrySchema),
        legendaryHeader: optionalArray(t.string),
        legendaryActions: optional(t.number),
        soundClip: optional(t.string),
        environment: optionalArray(
            createEnum<Environment>(Environment, "Environment")
        ),
        dragonCastingColor: optional(
            createEnum<DragonCastingColor>(
                DragonCastingColor,
                "DragonCastingColor"
            )
        ),
        alias: optionalArray(t.string),
        actionNote: optional(t.string)
    }),
    TagSchema
]);

export type MonsterData = t.TypeOf<typeof MonsterSchema>;

export interface MonsterReference {
    name: string;
    source?: string;
}

export interface ExtendedMonster extends Partial<MonsterData> {
    _copy: MonsterReference;
}

export function isExtendedMonster(
    monster: MonsterData | ExtendedMonster
): monster is ExtendedMonster {
    return "_copy" in monster;
}

export function isMonster(
    monster: MonsterData | ExtendedMonster
): monster is MonsterData {
    return !isExtendedMonster(monster);
}
