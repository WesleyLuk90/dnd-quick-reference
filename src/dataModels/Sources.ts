import * as t from "io-ts";
import { optional } from "./Types";

export const PageSourceSchema = t.strict({
    name: t.string,
    source: t.string,
    page: optional(t.number)
});

export const SourceSchema = t.strict({
    source: t.string,
    page: optional(t.number)
});
