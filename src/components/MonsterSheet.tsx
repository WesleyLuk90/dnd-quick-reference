import React from "react";
import { Monster } from "../models/Monster";

export function MonsterSheet(props: { monster: Monster }) {
    return (
        <div>
            <h2>{props.monster.name}</h2>
            <hr />
        </div>
    );
}
