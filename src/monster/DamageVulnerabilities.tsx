import React from "react";
import { Definition } from "../components/Definition";
import { defaultFormat } from "../models/Formatters";
import { Monster } from "../models/Monster";

export function DamageVulnerabilities({ monster }: { monster: Monster }) {
    if (monster.vulnerabilities.length === 0) {
        return null;
    }

    return (
        <Definition
            label="Damage Vulnerabilities"
            text={defaultFormat(monster.vulnerabilities)}
        />
    );
}
