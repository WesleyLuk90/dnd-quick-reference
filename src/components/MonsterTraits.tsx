import React from "react";
import { Monster } from "../models/Monster";
import { Trait } from "../models/Trait";
import { ContentDisplay } from "./ContentDisplay";
import { Label } from "./Label";

function MonsterTrait({ trait }: { trait: Trait }) {
    return (
        <div>
            <Label>{trait.name}</Label>{" "}
            <ContentDisplay content={trait.content} />
        </div>
    );
}

export function MonsterTraits({ monster }: { monster: Monster }) {
    return (
        <>
            {monster.traits.map((t, i) => (
                <MonsterTrait key={i} trait={t} />
            ))}
        </>
    );
}
