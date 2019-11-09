import React from "react";
import { Monster } from "../models/Monster";
import { skillLabel, Skills } from "../models/Skills";
import { Definition } from "./Definition";

export function MonsterSkills({ monster }: { monster: Monster }) {
    const { skill } = monster;
    if (skill == null) {
        return null;
    }
    return (
        <Definition
            label="Skills"
            text={Skills.filter(s => skill[s] != null)
                .map(s => `${skillLabel(s)} ${skill[s]}`)
                .join(" ")}
        />
    );
}
