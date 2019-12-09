import { isObjectLike } from "lodash";
import {
    ExtendedMonster,
    isExtendedMonster,
    isMonster,
    MonsterData,
    MonsterReference,
    MonsterSchema
} from "../dataModels/MonsterData";
import { parseData } from "../dataModels/Parse";
import { Monster } from "../models/Monster";
import { notNull } from "../utils/NotNull";
import { HttpService } from "./HttpService";
import { toMonster } from "./MonsterConverter";

function url(file: string) {
    return `/data/bestiary/${file}`;
}

interface Index {
    [key: string]: string;
}

interface Bestiary {
    monster: (MonsterData | ExtendedMonster)[];
}

function find(monsters: Monster[], ref: MonsterReference): Monster {
    const found = monsters.find(m => m.is(ref));
    if (found == null) {
        throw new Error(`Failed to find monster ${JSON.stringify(ref)}`);
    }
    return found;
}

function printEnum(
    monsters: MonsterData[],
    addValues: (set: Set<String>, monster: MonsterData) => void
) {
    const found = new Set<string>();
    monsters.forEach(m => {
        addValues(found, m);
    });
    console.log(
        `export enum Foo {${Array.from(found.values())
            .map(
                v =>
                    `${v
                        .replace(/ /g, "_")
                        .replace(/[^a-z_]/gi, "")
                        .toLocaleUpperCase()} = "${v}"`
            )
            .join(",\n")}}`
    );
}

let cache: Promise<Monster[]> | null = null;
export class MonsterService {
    static all(): Promise<Monster[]> {
        if (cache == null) {
            cache = MonsterService.allRaw();
        }
        return cache;
    }

    static async allRaw(): Promise<Monster[]> {
        const res = await HttpService.getJson<Index>(url("index.json"));
        let monsters: MonsterData[] = [];
        let extended: ExtendedMonster[] = [];
        for (const key in res) {
            const response = await HttpService.getJson<Bestiary>(url(res[key]));
            monsters = monsters.concat(response.monster.filter(isMonster));
            extended = extended.concat(
                response.monster.filter(isExtendedMonster)
            );
        }
        extended.forEach(m => {
            const reference = m._copy;
            const found = monsters.find(
                mon =>
                    mon.name === reference.name &&
                    (reference.source == null ||
                        reference.source === mon.source)
            );
            if (found == null) {
                throw new Error(
                    `Monster ${JSON.stringify(reference)} not found`
                );
            }
            monsters.push({ ...found, ...m });
        });
        printEnum(monsters, (f, m) => {
            if (m.dragonCastingColor != null) {
                f.add(m.dragonCastingColor);
            }
        });
        const knownKeys = new Map<string, any>();
        const foundKeys = new Set<string>();
        let first = true;
        const mon = monsters
            .map(rawMonster => {
                const monster = parseData(MonsterSchema, rawMonster);
                if (monster == null) {
                    return null;
                }
                Object.keys(rawMonster).forEach(k =>
                    knownKeys.set(k, rawMonster)
                );
                Object.keys(monster).forEach(k => foundKeys.add(k));
                const differentKeys = Object.keys(monster).filter(
                    key =>
                        !isEqual(
                            (rawMonster as any)[key],
                            (monster as any)[key]
                        )
                );
                if (differentKeys.length > 0 && first) {
                    console.error("Found different keys", differentKeys);
                    console.log(monster);
                    console.log(rawMonster);
                    differentKeys.forEach(k =>
                        console.log((monster as any)[k], (rawMonster as any)[k])
                    );
                    first = false;
                }
                return monster;
            })
            .filter(notNull)
            .map(toMonster);
        foundKeys.forEach(k => knownKeys.delete(k));
        console.log(knownKeys);
        return mon;
    }

    static async get(ref: MonsterReference): Promise<Monster> {
        const all = await MonsterService.all();
        return find(all, ref);
    }
}

function isEqual(left: any, right: any): boolean {
    if (left === right) {
        return true;
    }
    if (Array.isArray(left) && Array.isArray(right)) {
        return (
            left.length === right.length &&
            left.every((l, i) => isEqual(l, right[i]))
        );
    }
    if (isObjectLike(left) && isObjectLike(right)) {
        const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
        return Array.from(keys.values()).every(k => isEqual(left[k], right[k]));
    }
    return false;
}
