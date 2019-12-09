import React from "react";
import { loader } from "../components/Loader";
import { MonsterReference } from "../dataModels/MonsterData";
import { MonsterService } from "../services/MonsterService";
import "./MonsterCard.css";
import { MonsterSheet } from "./MonsterSheet";

export function MonsterCard({ monster }: { monster: MonsterReference }) {
    return loader(
        () => MonsterService.get(monster),
        monster => (
            <div className="monster-card">
                <MonsterSheet monster={monster} />
            </div>
        ),
        [monster.name, monster.source]
    );
}
