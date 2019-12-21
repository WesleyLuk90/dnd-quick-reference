import * as t from "io-ts";
import { PageSourceSchema, SourceSchema } from "./Sources";
import { SpellcastingSchema } from "./Spellcasting";
import { optional } from "./Types";

export type Entry =
    | string
    | {
          type: "item";
          name: string;
          entry: string;
      }
    | {
          type: "list";
          items: Entry[];
          style: "list-hang-notitle" | null | undefined;
      }
    | {
          type: "inset";
          name: string;
          entries: Entry[];
          token: t.TypeOf<typeof PageSourceSchema> | null | undefined;
      }
    | {
          type: "variantSub";
          name: string;
          entries: Entry[];
      }
    | {
          type: "variant";
          name: string;
          entries: Entry[];
          variantSource: t.TypeOf<typeof SourceSchema> | null | undefined;
      }
    | {
          type: "inline";
          entries: Entry[];
      }
    | {
          type: "entries";
          name: string | null | undefined;
          entries: Entry[];
      }
    | {
          type: "link";
          href: {
              type: "internal";
              path: "variantrules.html";
              hash: "madness_dmg";
          };
          text: string;
      }
    | {
          type: "table";
          caption: string | null | undefined;
          colLabels: string[];
          colStyles: string[];
          rows: string[][];
      }
    | ({
          type: "spellcasting";
      } & t.TypeOf<typeof SpellcastingSchema>);

export const EntrySchema: t.Type<Entry> = t.recursion("Entry", () =>
    t.union([
        t.string,
        t.strict({
            type: t.literal("list"),
            items: t.array(EntrySchema),
            style: optional(t.literal("list-hang-notitle"))
        }),
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
        }),
        t.strict({
            type: t.literal("inline"),
            entries: t.array(EntrySchema)
        }),
        t.strict({
            type: t.literal("entries"),
            name: optional(t.string),
            entries: t.array(EntrySchema)
        }),
        t.strict({
            type: t.literal("variantSub"),
            name: t.string,
            entries: t.array(EntrySchema)
        }),
        t.strict({
            type: t.literal("inset"),
            name: t.string,
            entries: t.array(EntrySchema),
            token: optional(PageSourceSchema)
        }),
        t.strict({
            type: t.literal("variant"),
            name: t.string,
            entries: t.array(EntrySchema),
            variantSource: optional(SourceSchema)
        }),
        t.strict({
            type: t.literal("table"),
            caption: optional(t.string),
            colLabels: t.array(t.string),
            colStyles: t.array(t.string),
            rows: t.array(t.array(t.string))
        }),
        t.intersection([
            t.strict({ type: t.literal("spellcasting") }),
            SpellcastingSchema
        ])
    ])
);
