import * as t from "io-ts";
import { createEnum } from "../models/Enums";
import { AbilityScore } from "../models/Statistics";
import { optional, optionalArray } from "./Types";

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

export const SpellcastingSchema = t.strict({
    name: t.string,
    ability: optional(AbilityScoresSchema),
    headerEntries: t.array(t.string),
    footerEntries: optionalArray(t.string),
    will: optionalArray(SpellReference),
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
            "1e": optionalArray(SpellReference),
            "2e": optionalArray(SpellReference),
            "3e": optionalArray(SpellReference),
            "1": optionalArray(SpellReference),
            "2": optionalArray(SpellReference),
            "3": optionalArray(SpellReference)
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
