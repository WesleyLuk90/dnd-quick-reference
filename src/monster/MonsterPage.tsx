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
        <div className="row monster-page">
            <div className="col monster-page__list">
                <MonsterList selected={selected} />
            </div>
            <div className="col monster-page__card">
                {selected && <MonsterCard monster={selected} />}
            </div>
        </div>
    );
}
