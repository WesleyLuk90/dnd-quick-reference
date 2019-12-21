import * as t from "io-ts";
import { EntrySchema } from "./EntryData";

export const AdventureSummarySchema = t.strict({
    name: t.string,
    id: t.string
});

const SectionSchema = t.strict({
    name: t.string,
    entries: t.array(t.union([EntrySchema, t.string]))
});

export const AdventureSchema = t.strict({
    data: t.array(SectionSchema)
});
