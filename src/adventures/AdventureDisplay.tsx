import React, { useEffect } from "react";
import { AdventureSummary } from "../models/AdventureSummary";
import { AdventureService } from "../services/AdventureService";

export function AdventureDisplay({
    adventureSummary
}: {
    adventureSummary: AdventureSummary;
}) {
    useEffect(() => {
        AdventureService.get(adventureSummary);
    }, [adventureSummary]);

    return <div>{adventureSummary.name}</div>;
}
