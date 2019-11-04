import React from "react";
import { Monster } from "../models/Monster";
import { formatAlignment, formatSize, formatType } from "../models/Monsters";
import { makeLine } from "../utils/Formatting";

export function MonsterSheet(props: { monster: Monster }) {
    return (
        <div>
            <h2>{props.monster.name}</h2>
            <p>
                {makeLine(
                    formatSize(props.monster.size),
                    formatType(props.monster.type) + ",",
                    formatAlignment(props.monster.alignment)
                )}
            </p>
            <hr />
        </div>
    );
}
