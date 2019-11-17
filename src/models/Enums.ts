import * as t from "io-ts";

export const createEnum = <E>(e: any, name: string): t.Type<E> => {
    const keys: any = {};
    Object.keys(e).forEach(k => {
        keys[e[k]] = null;
    });
    return t.keyof(keys, name) as any;
};
