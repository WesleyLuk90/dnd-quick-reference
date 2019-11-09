import * as t from "io-ts";

function optional<T extends t.Mixed>(type: T): t.UnionC<[T, t.UndefinedC]> {
    return t.union([type, t.undefined]);
}

const ComplexACSchema = t.strict({
    ac: t.number,
    from: optional(t.array(t.string)),
    condition: optional(t.string),
    braces: optional(t.boolean)
});

const ACSchema = t.union([t.number, ComplexACSchema]);
export type ArmorClass = t.TypeOf<typeof ACSchema>;

export enum Size {
    TINY = "T",
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L",
    HUGE = "H",
    GIGANTIC = "G"
}

const SizeSchema = t.union([
    t.literal(Size.TINY),
    t.literal(Size.SMALL),
    t.literal(Size.MEDIUM),
    t.literal(Size.LARGE),
    t.literal(Size.HUGE),
    t.literal(Size.GIGANTIC)
]);

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

export type MonsterType = t.TypeOf<typeof TypeSchema>;

export enum Alignments {
    LAWFUL = "L",
    NEUTRAL = "N",
    NEUTRAL_X = "NX",
    NEUTRAL_Y = "NY",
    CHAOTIC = "C",
    GOOD = "G",
    EVIL = "E",
    UNALIGNED = "U",
    ANY = "A"
}

const AlignmentsSchema = t.union([
    t.literal(Alignments.LAWFUL),
    t.literal(Alignments.NEUTRAL),
    t.literal(Alignments.NEUTRAL_X),
    t.literal(Alignments.NEUTRAL_Y),
    t.literal(Alignments.CHAOTIC),
    t.literal(Alignments.GOOD),
    t.literal(Alignments.EVIL),
    t.literal(Alignments.UNALIGNED),
    t.literal(Alignments.ANY)
]);

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

export type CompoundAlignment = t.TypeOf<typeof AlignmentSchema>;

const SimpleHealth = t.strict({
    average: t.number,
    formula: t.string
});

const SpecialHealth = t.strict({
    special: t.string
});

const HealthSchema = t.union([SimpleHealth, SpecialHealth]);

export type Health = t.TypeOf<typeof HealthSchema>;

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

const SpecificSpeedSchema = t.union([
    t.number,
    t.strict({
        number: t.number,
        condition: t.string
    }),
    t.void
]);

const SpeedSchema = t.strict({
    walk: SpecificSpeedSchema,
    climb: SpecificSpeedSchema,
    fly: SpecificSpeedSchema,
    swim: SpecificSpeedSchema,
    burrow: SpecificSpeedSchema,
    canHover: optional(t.boolean)
});

export const MonsterSchema = t.strict({
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
    speed: SpeedSchema
});

export type Monster = t.TypeOf<typeof MonsterSchema>;

export interface MonsterReference {
    name: string;
    source?: string;
}

export interface ExtendedMonster extends Partial<Monster> {
    _copy: MonsterReference;
}

export function isExtendedMonster(
    monster: Monster | ExtendedMonster
): monster is ExtendedMonster {
    return (monster as ExtendedMonster)._copy != null;
}

export function isMonster(
    monster: Monster | ExtendedMonster
): monster is Monster {
    return !isExtendedMonster(monster);
}
