import React from "react";
import { Monster } from "../models/Monster";
import { getSignedMod } from "../models/Stats";
import "./StatTable.css";

function Stat({ name, value }: { name: string; value: number }) {
    return (
        <div className="stat">
            <div>{name}</div>
            <div>
                {value} ({getSignedMod(value)})
            </div>
        </div>
    );
}

export function StatTable({ monster }: { monster: Monster }) {
    return (
        <div className="stat-table">
            <Stat name="Str" value={monster.stats.str} />
            <Stat name="Dex" value={monster.stats.dex} />
            <Stat name="Con" value={monster.stats.con} />
            <Stat name="Wis" value={monster.stats.wis} />
            <Stat name="Int" value={monster.stats.int} />
            <Stat name="Cha" value={monster.stats.cha} />
        </div>
    );
}
