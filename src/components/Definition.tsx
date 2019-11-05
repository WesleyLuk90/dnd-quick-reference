import React, { ReactNode } from "react";
import "./Definition.css";

export function Definition({
    label,
    children
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label className="definition__label">{label}</label> {children}
        </div>
    );
}
