import React from "react";
import {
    Content,
    InlineContent,
    LabeledContent,
    LinkContent,
    ListContent,
    TextContent
} from "../models/Trait";
import { assertNever } from "../utils/Never";
import { Label } from "./Label";

export function ContentDisplay({ content }: { content: Content }) {
    if (content instanceof TextContent) {
        return <span>{content.description}</span>;
    } else if (content instanceof ListContent) {
        return (
            <ul>
                {content.entries.map((e, i) => (
                    <li key={i}>
                        <ContentDisplay content={e} />
                    </li>
                ))}
            </ul>
        );
    } else if (content instanceof InlineContent) {
        return (
            <span>
                {content.entries.map((e, i) => (
                    <span key={i}>
                        <ContentDisplay key={i} content={e} />
                    </span>
                ))}
            </span>
        );
    } else if (content instanceof LinkContent) {
        return <a href={content.href.path}>{content.text}</a>;
    } else if (content instanceof LabeledContent) {
        return (
            <span>
                <Label>{content.label}</Label> {content.label}
            </span>
        );
    }
    return assertNever(content);
}
