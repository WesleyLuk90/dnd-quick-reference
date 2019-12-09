import * as t from "io-ts";

export const ItemDataSchema = t.strict({ name: t.string });

export type ItemData = t.TypeOf<typeof ItemDataSchema>;
