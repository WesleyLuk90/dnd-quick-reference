import React, { useState, useEffect } from "react";
import {
    CreatureService,
    Monster,
    MonsterReference
} from "../services/CreatureService";

interface Props {
    monster: MonsterReference;
}

export function CreatureCard(props: Props) {
    const [monster, setMonster] = useState<Monster | null>(null);

    useEffect(() => {
        CreatureService.get(props.monster).then(setMonster);
    }, [props.monster]);

    if (monster == null) {
        return null;
    }

    return <div>Monster {monster.name}</div>;
}
