import React from "react";
import { Link } from "../services/LinkedTextParser";

export function EntityLink({ entity }: { entity: Link }) {
    return <a href={`#/${entity.type}`}>{entity.getText()}</a>;
}
