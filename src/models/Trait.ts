export class TextContent {
    constructor(readonly description: string) {}
}

export class ListContent {
    constructor(readonly entries: Content[]) {}
}

export class InlineContent {
    constructor(readonly entries: Content[]) {}
}

export class LinkContent {
    constructor(
        readonly text: string,
        readonly href: { type: string; path: string; hash: string }
    ) {}
}

export class LabeledContent {
    constructor(readonly label: string, readonly text: string) {}
}

export type Content =
    | TextContent
    | ListContent
    | InlineContent
    | LinkContent
    | LabeledContent;

export class Trait {
    constructor(readonly name: string, readonly content: Content) {}
}
