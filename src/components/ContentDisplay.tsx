import React from "react";
import {
    Content,
    InlineContent,
    InsetContent,
    LabeledContent,
    LinkContent,
    ListContent,
    SubVariantContent,
    TableContent,
    TextContent,
    VariantContent
} from "../models/Content";
import { assertNever } from "../utils/Never";
import { Label } from "./Label";
import { LinkedText } from "./LinkedText";

export function TableContentDisplay({ content }: { content: TableContent }) {
    return (
        <div>
            {content.caption}
            <table>
                <thead>
                    <tr>
                        {content.columnLabels.map((c, i) => (
                            <th key={i}>{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {content.rows.map((r, i) => (
                        <tr key={i}>
                            {r.map((d, j) => (
                                <td key={j}>{i}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function ContentDisplay({ content }: { content: Content }) {
    if (content instanceof TextContent) {
        return <LinkedText text={content.description} />;
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
                <Label>{content.label}</Label>{" "}
                <LinkedText text={content.text} />
            </span>
        );
    } else if (
        content instanceof InsetContent ||
        content instanceof VariantContent ||
        content instanceof SubVariantContent
    ) {
        return (
            <span>
                <Label>{content.label}</Label>{" "}
                {content.entries.map((c, i) => (
                    <ContentDisplay key={i} content={c} />
                ))}
            </span>
        );
    } else if (content instanceof TableContent) {
        return <TableContentDisplay content={content} />;
    }
    return assertNever(content);
}
