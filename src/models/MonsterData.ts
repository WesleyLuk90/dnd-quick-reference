import * as t from "io-ts";
import { BaseAlignment } from "./Alignment";
import { Condition } from "./Condition";
import { DamageType } from "./DamageType";
import { createEnum } from "./Enums";
import {
    ActionTag,
    DamageTag,
    LanguageTag,
    MiscTag,
    SenseTag,
    SpellcastingTag,
    TraitTag
} from "./MonsterTags";
import { Size } from "./Size";
import { AbilityScore } from "./Statistics";

function optional<T extends t.Mixed>(type: T): t.UnionC<[T, t.UndefinedC]> {
    return t.union([type, t.undefined]);
}

function optionalWithNull<T extends t.Mixed>(
    type: T
): t.UnionC<[T, t.UndefinedC, t.NullC]> {
    return t.union([type, t.undefined, t.null]);
}

const ComplexACSchema = t.strict({
    ac: t.number,
    from: optional(t.array(t.string)),
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
        tags: optional(t.array(TypeTag)),
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

const DamageImmunitySchema = optionalWithNull(
    t.array(
        t.union([
            DamageTypeSchema,
            t.strict({
                immune: t.array(DamageTypeSchema),
                preNote: optional(t.string),
                note: optional(t.string)
            })
        ])
    )
);

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

const SubEntrySchema = t.union([
    t.string,
    t.strict({
        type: t.literal("link"),
        href: t.strict({
            type: t.literal("internal"),
            path: t.literal("variantrules.html"),
            hash: t.literal("madness_dmg")
        }),
        text: t.string
    }),
    t.strict({
        type: t.literal("item"),
        name: t.string,
        entry: t.string
    })
]);

export type SubEntry = t.TypeOf<typeof SubEntrySchema>;

const EntrySchema = t.union([
    t.string,
    t.strict({
        type: t.literal("list"),
        items: t.array(SubEntrySchema),
        style: optional(t.literal("list-hang-notitle"))
    }),
    t.strict({
        type: t.literal("inline"),
        entries: t.array(SubEntrySchema)
    })
]);

export type Entry = t.TypeOf<typeof EntrySchema>;

const TraitSchema = t.strict({
    type: optional(t.keyof({ entries: null, inset: null })),
    name: t.string,
    entries: t.array(EntrySchema)
});

const AbilityScoresSchema = createEnum<AbilityScore>(
    AbilityScore,
    "AbilityScore"
);

const SpellReference = t.string;

const SpellSchema = t.strict({
    lower: optional(t.number),
    slots: optional(t.number),
    spells: t.array(SpellReference)
});

export type SpellSlotData = t.TypeOf<typeof SpellSchema>;

const SpellcastingSchema = t.strict({
    name: t.string,
    ability: optional(AbilityScoresSchema),
    headerEntries: t.array(t.string),
    footerEntries: optional(t.array(t.string)),
    will: optional(t.array(SpellReference)),
    hidden: optional(
        t.array(
            t.keyof({
                daily: null,
                will: null
            })
        )
    ),
    daily: optional(
        t.strict({
            "1e": optional(t.array(SpellReference)),
            "2e": optional(t.array(SpellReference)),
            "3e": optional(t.array(SpellReference)),
            "1": optional(t.array(SpellReference)),
            "2": optional(t.array(SpellReference)),
            "3": optional(t.array(SpellReference))
        })
    ),
    spells: optional(
        t.strict({
            "0": optional(SpellSchema),
            "1": optional(SpellSchema),
            "2": optional(SpellSchema),
            "3": optional(SpellSchema),
            "4": optional(SpellSchema),
            "5": optional(SpellSchema),
            "6": optional(SpellSchema),
            "7": optional(SpellSchema),
            "8": optional(SpellSchema),
            "9": optional(SpellSchema)
        })
    )
});

const ActionSchema = t.strict({
    entries: t.array(EntrySchema),
    name: t.string
});

const TagSchema = t.strict({
    actionTags: optional(
        t.array(createEnum<ActionTag>(ActionTag, "ActionTag"))
    ),
    damageTags: optional(
        t.array(createEnum<DamageTag>(DamageTag, "DamageTag"))
    ),
    senseTags: optional(t.array(createEnum<SenseTag>(SenseTag, "SenseTag"))),
    traitTags: optional(t.array(createEnum<TraitTag>(TraitTag, "TraitTag"))),
    languageTags: optional(
        t.array(createEnum<LanguageTag>(LanguageTag, "LanguageTag"))
    ),
    spellcastingTags: optional(
        t.array(createEnum<SpellcastingTag>(SpellcastingTag, "SpellcastingTag"))
    ),
    miscTags: optional(t.array(createEnum<MiscTag>(MiscTag, "MiscTag")))
});

type Resist =
    | DamageType
    | {
          resist: Resist[];
          preNote: string | undefined;
          note: string | undefined;
      }
    | { special: string };

const ResistSchema: t.Type<Resist> = t.recursion("Resist", () =>
    t.union([
        DamageTypeSchema,
        t.strict({
            resist: t.array(ResistSchema),
            preNote: optional(t.string),
            note: optional(t.string)
        }),
        t.strict({ special: t.string })
    ])
);

export const MonsterSchema = t.intersection([
    t.strict({
        name: t.string,
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
        immune: DamageImmunitySchema,
        resist: optionalWithNull(t.array(ResistSchema)),
        conditionImmune: ConditionImmunitySchema,
        senses: optionalWithNull(t.array(t.string)),
        languages: optionalWithNull(t.array(t.string)),
        cr: ChallengeRatingSchema,
        trait: optionalWithNull(t.array(TraitSchema)),
        spellcasting: optionalWithNull(t.array(SpellcastingSchema)),
        action: optionalWithNull(t.array(ActionSchema)),
        page: optional(t.number)
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
