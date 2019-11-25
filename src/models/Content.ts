import { MonsterReferenceWithPage } from "./Monster";
import { MonsterSource } from "./MonsterSource";

export class TextContent {
    constructor(readonly description: string) {}
}

export class LabeledContent {
    constructor(readonly label: string, readonly text: string) {}
}

export class ListContent {
    constructor(readonly entries: Content[]) {}
}

export class InsetContent {
    constructor(
        readonly label: string,
        readonly entries: Content[],
        readonly token?: MonsterReferenceWithPage
    ) {}
}

export class VariantContent {
    constructor(
        readonly label: string,
        readonly entries: Content[],
        readonly source?: MonsterSource
    ) {}
}

export class SubVariantContent {
    constructor(readonly label: string, readonly entries: Content[]) {}
}

export class InlineContent {
    constructor(readonly entries: Content[]) {}
}

export class Entries {
    constructor(readonly label: string, readonly entries: Content[]) {}
}

export class LinkContent {
    constructor(
        readonly text: string,
        readonly href: { type: string; path: string; hash: string }
    ) {}
}

export class TableContent {
    constructor(
        readonly caption: string,
        readonly columnLabels: string[],
        readonly rows: string[][]
    ) {}
}

export type Content =
    | TextContent
    | LabeledContent
    | ListContent
    | InsetContent
    | VariantContent
    | SubVariantContent
    | InlineContent
    | LinkContent
    | TableContent;
