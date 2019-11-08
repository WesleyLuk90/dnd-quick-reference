import React from "react";
import "./Definition.css";
import { LinkedText } from "./LinkedText";

export function Definition({ label, text }: { label: string; text: string }) {
    return (
        <div>
            <label className="definition__label">{label}</label>{" "}
            <LinkedText text={text}></LinkedText>
        </div>
    );
}
