import React, { useEffect, useState } from "react";
import { Monster, MonsterReference } from "../models/Monster";
import { MonsterService } from "../services/MonsterService";
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

    console.log(monster);

    return <MonsterSheet monster={monster} />;
}
