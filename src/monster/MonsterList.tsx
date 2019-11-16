import React, { useEffect, useState } from "react";
import { Monster } from "../models/Monster";
import { MonsterReference } from "../models/MonsterData";
import { MonsterService } from "../services/MonsterService";
import "./MonsterList.css";

function href(ref: MonsterReference) {
    return `/#/monsters?name=${ref.name}&source=${ref.source || ""}`;
}

function alphabetic(a: Monster, b: Monster) {
    return a.name.localeCompare(b.name);
}

export function MonsterList() {
    const [monsters, setMonsters] = useState<Monster[] | null>(null);

    useEffect(() => {
        MonsterService.all().then(setMonsters);
    }, []);

    if (monsters == null) {
        return <span>Loading</span>;
    }

    return (
        <div className="monster-list">
            <div className="monster-list__list">
                {monsters.sort(alphabetic).map(m => (
                    <a
                        className="monster-list__item"
                        key={`${m.name} ${m.source}`}
                        href={href(m)}
                    >
                        <div className="monster-list__name">{m.name}</div>
                        <div className="monster-list__type">
                            {m.type.format()}
                        </div>
                        <div className="monster-list__cr">
                            {m.formatChallengeRating()}
                        </div>
                        <div className="monster-list__source">{m.source}</div>
                    </a>
                ))}
            </div>
        </div>
    );
}
