import React from "react";
import { TextBuilder } from "../utils/TextBuilder";
import { Definition } from "./Definition";

export function ListDefinition({
    values,
    label,
    suffix
}: {
    values: string[];
    label: string;
    suffix?: string | null;
}) {
    if (values.length === 0) {
        return null;
    }

    return (
        <Definition
            label={label}
            text={new TextBuilder()
                .list(values)
                .add(suffix)
                .build()}
        />
    );
}
