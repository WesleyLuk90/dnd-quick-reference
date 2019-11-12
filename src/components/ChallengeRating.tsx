import React from "react";
import { Monster } from "../models/Monster";
import { Definition } from "./Definition";

export function ChallengeRating({ monster }: { monster: Monster }) {
    if (monster.challengeRating == null) {
        return null;
    }

    return (
        <Definition label="Challenge" text={monster.challengeRating.format()} />
    );
}
