import React from "react";
import { useLocation } from "react-router";
import { MonsterCard } from "./MonsterCard";
import { MonsterList } from "./MonsterList";
import "./MonsterPage.css";

function useSelectedMonster() {
    const params = new URLSearchParams(useLocation().search);
    const name = params.get("name");
    if (name != null && name !== "") {
        const source = params.get("source");
        return {
            name: name,
            source: !!source ? source : undefined
        };
    }
    return null;
}

export function MonsterPage() {
    const selected = useSelectedMonster();
    return (
        <div className="monster-page">
            <div className="monster-page__list">
                <MonsterList selected={selected} />
            </div>
            <div className="monster-page__section">
                {selected && <MonsterCard monster={selected} />}
            </div>
        </div>
    );
}
