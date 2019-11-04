import React, { useState, useEffect } from "react";
import { MonsterService } from "../services/MonsterService";
import { MonsterReference, Monster } from "../models/Monster";
import { MonsterSheet } from "./MonsterSheet";

interface Props {
    monster: MonsterReference;
}

export function MonsterCard(props: Props) {
    const [monster, setMonster] = useState<Monster | null>(null);

    useEffect(() => {
        MonsterService.get(props.monster).then(setMonster);
    }, [props.monster]);

    if (monster == null) {
        return null;
    }

    return <MonsterSheet monster={monster} />;
}
