import React, { useEffect, useState } from "react";
import { AdventureSummary } from "../models/AdventureSummary";
import { AdventureService } from "../services/AdventureService";
import { AdventureDisplay } from "./AdventureDisplay";

export function AdventuresPage() {
    const [adventures, setAdventures] = useState<AdventureSummary[]>([]);
    const [adventure, setAdventure] = useState<AdventureSummary | null>(null);
    useEffect(() => {
        AdventureService.list().then(setAdventures);
    }, []);

    function selectAdventure(e: React.ChangeEvent<HTMLSelectElement>) {
        setAdventure(adventures.find(a => a.id === e.target.value) || null);
    }

    return (
        <div>
            <select
                onChange={selectAdventure}
                value={adventure ? adventure.id : ""}
            >
                <option value=""></option>
                {adventures.map(a => (
                    <option key={a.id} value={a.id}>
                        {a.name}
                    </option>
                ))}
            </select>
            {adventure && <AdventureDisplay adventureSummary={adventure} />}
        </div>
    );
}
