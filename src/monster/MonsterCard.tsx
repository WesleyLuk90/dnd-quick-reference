import React from "react";
import { loader } from "../components/Loader";
import { MonsterReference } from "../models/MonsterData";
import { MonsterService } from "../services/MonsterService";
import { MonsterSheet } from "./MonsterSheet";

export function MonsterCard({ monster }: { monster: MonsterReference }) {
    return loader(
        () => MonsterService.get(monster),
        monster => <MonsterSheet monster={monster} />,
        [monster.name, monster.source]
    );
}
