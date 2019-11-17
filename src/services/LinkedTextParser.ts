import { EntityType } from "../models/EntityType";

export class Link {
    readonly book?: string;
    constructor(
        readonly type: EntityType,
        readonly name: string,
        book?: string,
        readonly text?: string
    ) {
        if (book != null) {
            this.book = book.toLowerCase();
        }
    }

    getText() {
        return this.text || this.name;
    }
}

export function parseText(text: string): (string | Link)[] {
    const regex = /(.*?){@(\w+) (.*?)}/g;
    let match;
    const out = [];
    let lastIndex = 0;
    while ((match = regex.exec(text))) {
        out.push(match[1]);
        const link = toLink(
            match[2],
            match[3].split("|").map(s => s.trim())
        );
        if (link != null) {
            out.push(link);
        } else {
            out.push(match[0]);
        }
        lastIndex = regex.lastIndex;
    }
    out.push(text.substring(lastIndex));
    return out;
}

function toLink(type: string, values: string[]) {
    switch (type) {
        case EntityType.item:
            return new Link(EntityType.item, values[0], values[1], values[2]);
        case EntityType.monster:
            return new Link(
                EntityType.monster,
                values[0],
                values[1],
                values[2]
            );
        case EntityType.spell:
            return new Link(EntityType.spell, values[0], values[1], values[2]);
        default:
            return null;
    }
}
