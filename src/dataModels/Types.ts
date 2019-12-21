import * as t from "io-ts";

export function optional<T extends t.Mixed>(
    type: T
): t.UnionC<[T, t.UndefinedC, t.NullC]> {
    return t.union([type, t.undefined, t.null]);
}

export function optionalArray<T extends t.Mixed>(
    type: T
): t.UnionC<[t.ArrayC<T>, t.UndefinedC, t.NullC]> {
    return optional(t.array(type));
}
