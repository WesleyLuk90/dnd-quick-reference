import React from "react";
import { ContentDisplay } from "../components/ContentDisplay";
import { Label } from "../components/Label";
import { LegendaryAction } from "../models/LegendaryAction";
import { Monster } from "../models/Monster";

function Legendary({
    legendaryAction: action
}: {
    legendaryAction: LegendaryAction;
}) {
    return (
        <div>
            <Label>{action.name}</Label>{" "}
            <ContentDisplay content={action.content} />
        </div>
    );
}

export function LegendaryActions({ monster }: { monster: Monster }) {
    if (monster.legendary == null) {
        return null;
    }
    return (
        <>
            <h3>Legendary Actions</h3>
            <p>{monster.legendary.header.join(" ")}</p>
            {monster.legendary.actions.map((a, i) => (
                <Legendary key={i} legendaryAction={a} />
            ))}
        </>
    );
}
