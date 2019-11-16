import React from "react";
import { Definition } from "../components/Definition";
import { Monster } from "../models/Monster";

export function ChallengeRating({ monster }: { monster: Monster }) {
    if (monster.challengeRating == null) {
        return null;
    }

    return (
        <Definition label="Challenge" text={monster.challengeRating.format()} />
    );
}
