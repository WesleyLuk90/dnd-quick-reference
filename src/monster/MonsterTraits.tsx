import React from "react";
import { ContentDisplay } from "../components/ContentDisplay";
import { Label } from "../components/Label";
import { Monster } from "../models/Monster";
import { Trait } from "../models/Trait";

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
