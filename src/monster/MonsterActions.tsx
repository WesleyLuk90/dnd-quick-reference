import React from "react";
import { ContentDisplay } from "../components/ContentDisplay";
import { Label } from "../components/Label";
import { Action } from "../models/Action";
import { Monster } from "../models/Monster";

function MonsterAction({ action }: { action: Action }) {
    return (
        <div>
            <Label>{action.name}</Label>{" "}
            <ContentDisplay content={action.content} />
        </div>
    );
}

export function MonsterActions({ monster }: { monster: Monster }) {
    if (monster.actions.length === 0) {
        return null;
    }
    return (
        <>
            <h3>Actions</h3>
            {monster.actions.map((a, i) => (
                <MonsterAction key={i} action={a} />
            ))}
        </>
    );
}
