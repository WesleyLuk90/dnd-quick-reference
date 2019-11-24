import { AnnotatedText, TextAnnotation } from "../models/AnnotatedText";
import { EntityType } from "../models/EntityType";
import { Link, parseText, Text } from "./LinkedTextParser";

describe("LinkedTextParser", () => {
    it("should parse", () => {
        expect(
            parseText("armor {@item thing|PhB|A Thing} and  {@item wat} other")
        ).toEqual([
            new Text("armor "),
            new Link(EntityType.item, "thing", "phb", "A Thing"),
            new Text(" and  "),
            new Link(EntityType.item, "wat"),
            new Text(" other")
        ]);

        expect(parseText("{@spell foo}")).toEqual([
            new Link(EntityType.spell, "foo")
        ]);

        expect(parseText("{@h}")).toEqual([
            new AnnotatedText(TextAnnotation.on_hit, "")
        ]);
    });
});
