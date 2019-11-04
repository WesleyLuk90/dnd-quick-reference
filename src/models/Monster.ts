import * as t from "io-ts";

function optional<T extends t.Mixed>(type: T): t.UnionC<[T, t.UndefinedC]> {
    return t.union([type, t.undefined]);
}

const AdvancedACSchema = t.type({
    ac: t.number,
    from: optional(t.array(t.string)),
    condition: optional(t.string)
});

const ACSchema = t.union([t.number, AdvancedACSchema]);

export enum Size {
    TINY = "T",
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L",
    HUGE = "H",
    GIGANTIC = "G"
}

const SizeSchema = t.union(Object.values(Size).map(s => t.literal(s)) as any);

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

export const MonsterSchema = t.type({
    name: t.string,
    source: t.string,
    ac: t.array(ACSchema),
    size: SizeSchema,
    type: TypeSchema
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
