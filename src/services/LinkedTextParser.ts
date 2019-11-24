import { AnnotatedText, TextAnnotation } from "../models/AnnotatedText";
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

export class Text {
    constructor(readonly text: string) {}
}

export type Token = Text | Link | AnnotatedText;

export function parseText(text: string): Token[] {
    const regex = /(.*?){@(\w+)(?: (.*?))?}/g;
    let match;
    const out: Token[] = [];
    function push(token: Token) {
        if (token instanceof Text && token.text === "") {
            return;
        }
        out.push(token);
    }
    let lastIndex = 0;
    while ((match = regex.exec(text))) {
        push(new Text(match[1]));
        const link = toLink(
            match[2],
            (match[3] || "").split("|").map(s => s.trim())
        );
        if (link != null) {
            push(link);
        } else {
            push(new Text(match[0]));
        }
        lastIndex = regex.lastIndex;
    }
    push(new Text(text.substring(lastIndex)));
    return out;
}

function toLink(type: string, values: string[]): Token | null {
    const entityType = Object.values(EntityType).find(t => t === type);
    if (entityType != null) {
        return new Link(entityType, values[0], values[1], values[2]);
    }
    const annotation = Object.values(TextAnnotation).find(t => t === type);
    if (annotation != null) {
        return new AnnotatedText(annotation, values[0]);
    }
    return null;
}
