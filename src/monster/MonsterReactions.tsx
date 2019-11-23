import React from "react";
import { ContentDisplay } from "../components/ContentDisplay";
import { Label } from "../components/Label";
import { Monster } from "../models/Monster";
import { Reaction } from "../models/Reaction";

function MonsterReaction({ reaction }: { reaction: Reaction }) {
    return (
        <div>
            <Label>{reaction.name}</Label>{" "}
            <ContentDisplay content={reaction.content} />
        </div>
    );
}

export function MonsterReactions({ monster }: { monster: Monster }) {
    if (monster.reactions.length === 0) {
        return null;
    }
    return (
        <>
            <h3>Reactions</h3>
            {monster.reactions.map((a, i) => (
                <MonsterReaction key={i} reaction={a} />
            ))}
        </>
    );
}
