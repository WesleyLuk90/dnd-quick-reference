import React from "react";
import "./Label.css";

export function Label({ children }: { children: React.ReactNode }) {
    return <label className="label">{children}</label>;
}
