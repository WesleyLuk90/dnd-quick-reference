import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Scroller } from "../components/Scroller";
import { Monster } from "../models/Monster";
import { MonsterReference } from "../models/MonsterData";
import { MonsterService } from "../services/MonsterService";
import { BemBuilder } from "../utils/BemBuilder";
import { classNames } from "./Classnames";
import "./MonsterList.css";

function href(ref: MonsterReference) {
    return `/#/monsters?name=${ref.name}&source=${ref.source || ""}`;
}

function alphabetic(a: Monster, b: Monster) {
    return a.name.localeCompare(b.name);
}

const BEM = new BemBuilder("monster-list");

export function MonsterList({
    selected
}: {
    selected: MonsterReference | null;
}) {
    const [monsters, setMonsters] = useState<Monster[] | null>(null);
    useEffect(() => {
        MonsterService.all().then(setMonsters);
    }, []);

    const [search, setSearch] = useState("");

    if (monsters == null) {
        return <span>Loading</span>;
    }

    function filter(monster: Monster) {
        if (search === "") {
            return true;
        }
        return monster.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
    }

    function isSelected(monster: Monster) {
        return selected != null && monster.is(selected);
    }

    return (
        <div className={BEM.block}>
            <div>
                <Input
                    value={search}
                    onChange={setSearch}
                    placeholder="Search"
                />
            </div>
            <div className={BEM.element("list")}>
                <Scroller
                    elements={monsters.filter(filter).sort(alphabetic)}
                    render={m => (
                        <a
                            className={classNames(BEM.element("item"), {
                                "bg-primary text-white": isSelected(m),
                                "bg-light": !isSelected(m)
                            })}
                            key={`${m.name} ${m.source}`}
                            href={href(m)}
                        >
                            <div className={BEM.element("name")}>{m.name}</div>
                            <div className={BEM.element("type")}>
                                {m.type.format()}
                            </div>
                            <div className={BEM.element("cr")}>
                                {m.formatChallengeRating()}
                            </div>
                            <div className={BEM.element("source")}>
                                {m.source}
                            </div>
                        </a>
                    )}
                    elementHeight={32}
                />
            </div>
        </div>
    );
}
