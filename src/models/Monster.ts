import * as t from "io-ts";

function optional<T extends t.Mixed>(type: T): t.UnionC<[T, t.UndefinedC]> {
    return t.union([type, t.undefined]);
}

const ComplexACSchema = t.type({
    ac: t.number,
    from: optional(t.array(t.string)),
    condition: optional(t.string)
});

const ACSchema = t.union([t.number, ComplexACSchema]);

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
    t.type({
        tag: t.string,
        prefix: t.string
    })
]);

const TypeSchema = t.union([
    t.string,
    t.type({
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

const ComplexAlignment = t.type({
    alignment: t.array(AlignmentsSchema)
});

const SpecialAlignment = t.type({
    special: t.string
});

const AlignmentSchema = optional(
    t.array(t.union([AlignmentsSchema, ComplexAlignment, SpecialAlignment]))
);

export type CompoundAlignment = t.TypeOf<typeof AlignmentSchema>;

export const MonsterSchema = t.type({
    name: t.string,
    source: t.string,
    ac: t.array(ACSchema),
    size: SizeSchema,
    type: TypeSchema,
    alignment: AlignmentSchema
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
