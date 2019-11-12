import React from "react";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

export function MonsterSkills({ monster }: { monster: Monster }) {
    const { skills } = monster;
    if (skills.length === 0) {
        return null;
    }
    return <Definition label="Skills" text={defaultFormat(skills)} />;
}
