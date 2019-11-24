import React from "react";
import { AnnotatedText } from "../models/AnnotatedText";
import { Link, parseText } from "../services/LinkedTextParser";
import { EntityLink } from "./EntityLink";

export function LinkedText({ text }: { text: string }) {
    return (
        <>
            {parseText(text).map((value, i) => {
                if (value instanceof Link) {
                    return <EntityLink entity={value} key={i} />;
                } else if (value instanceof AnnotatedText) {
                    return <em key={i}>{value.format()}</em>;
                } else {
                    return value.text;
                }
            })}
        </>
    );
}
