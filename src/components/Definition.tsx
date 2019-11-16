import React from "react";
import { Label } from "./Label";
import { LinkedText } from "./LinkedText";

export function Definition({ label, text }: { label: string; text: string }) {
    return (
        <div>
            <Label>{label}</Label> <LinkedText text={text}></LinkedText>
        </div>
    );
}
