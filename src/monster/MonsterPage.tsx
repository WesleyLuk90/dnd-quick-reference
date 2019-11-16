import React from "react";
import { useLocation } from "react-router";
import { MonsterCard } from "./MonsterCard";
import { MonsterList } from "./MonsterList";
import "./MonsterPage.css";

function MonsterCardSection() {
    const params = new URLSearchParams(useLocation().search);
    const name = params.get("name");
    if (name != null && name !== "") {
        const source = params.get("source");
        return (
            <MonsterCard
                monster={{
                    name: name,
                    source: !!source ? source : undefined
                }}
            />
        );
    }
    return null;
}

export function MonsterPage() {
    return (
        <div className="monster-page">
            <div className="monster-page__list">
                <MonsterList />
            </div>
            <div className="monster-page__section">
                <MonsterCardSection />
            </div>
        </div>
    );
}
