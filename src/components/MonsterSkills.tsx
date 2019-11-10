import React from "react";
import { MonsterData } from "../models/MonsterData";
import { skillLabel, SkillTypes } from "../models/SkillType";
import { Definition } from "./Definition";

export function MonsterSkills({ monster }: { monster: MonsterData }) {
    const { skill } = monster;
    if (skill == null) {
        return null;
    }
    return (
        <Definition
            label="Skills"
            text={SkillTypes.filter(s => skill[s] != null)
                .map(s => `${skillLabel(s)} ${skill[s]}`)
                .join(" ")}
        />
    );
}
