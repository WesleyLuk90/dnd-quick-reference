import React from "react";
import { Link, parseText } from "../services/LinkedTextParser";
import { EntityLink } from "./EntityLink";

export function LinkedText({ text }: { text: string }) {
    return (
        <>
            {parseText(text).map((value, i) => {
                if (value instanceof Link) {
                    return <EntityLink entity={value} key={i} />;
                } else {
                    return value;
                }
            })}
        </>
    );
}
