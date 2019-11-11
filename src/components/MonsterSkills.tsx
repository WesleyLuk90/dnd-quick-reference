import React from "react";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

export function MonsterSkills({ monster }: { monster: Monster }) {
    const { skills } = monster;
    if (skills.length === 0) {
        return null;
    }
    return (
        <Definition
            label="Skills"
            text={skills.map(s => s.format()).join(", ")}
        />
    );
}
