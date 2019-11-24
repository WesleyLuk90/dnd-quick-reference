import React from "react";
import "./Label.css";
import { LinkedText } from "./LinkedText";

export function Label({ children }: { children: string }) {
    return (
        <strong className="label">
            <LinkedText text={children} />
        </strong>
    );
}
