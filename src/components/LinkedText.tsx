import React from "react";
import { Link, parseText } from "../services/LinkedTextParser";

const regex = /.*/;

export function LinkedText({ text }: { text: string }) {
    return (
        <>
            {parseText(text).map((value, i) => {
                if (value instanceof Link) {
                    return (
                        <a key={i} href={`#/${value.type}`}>
                            {value.getText()}
                        </a>
                    );
                } else {
                    return value;
                }
            })}
        </>
    );
}
