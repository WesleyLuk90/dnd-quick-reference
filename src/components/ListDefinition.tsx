import React from "react";
import { Definition } from "./Definition";

export function ListDefinition({
    values,
    label
}: {
    values: string[];
    label: string;
}) {
    if (values.length === 0) {
        return null;
    }

    return <Definition label={label} text={values.join(", ")} />;
}
