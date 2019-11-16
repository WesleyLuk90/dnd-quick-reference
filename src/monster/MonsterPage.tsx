import React from "react";
import { useLocation } from "react-router";
import { MonsterCard } from "../components/MonsterCard";

export function MonsterPage() {
    const params = new URLSearchParams(useLocation().search);
    const name = params.get("name");
    if (name != null && name !== "") {
        const source = params.get("source");
        return (
            <div>
                <MonsterCard
                    monster={{
                        name: name,
                        source: !!source ? source : undefined
                    }}
                />
            </div>
        );
    } else {
        return <div>Foo</div>;
    }
}
