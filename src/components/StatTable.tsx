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
            <Stat name="Str" value={monster.str} />
            <Stat name="Dex" value={monster.dex} />
            <Stat name="Con" value={monster.con} />
            <Stat name="Wis" value={monster.wis} />
            <Stat name="Int" value={monster.int} />
            <Stat name="Cha" value={monster.cha} />
        </div>
    );
}
