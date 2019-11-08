import { EntityType } from "../models/EntityType";
import { Link, parseText } from "./LinkedTextParser";

describe("LinkedTextParser", () => {
    it("should parse", () => {
        expect(
            parseText("armor {@item thing|PhB|A Thing} and  {@item wat} other")
        ).toEqual([
            "armor ",
            new Link(EntityType.item, "thing", "phb", "A Thing"),
            " and  ",
            new Link(EntityType.item, "wat"),
            " other"
        ]);
    });
});
