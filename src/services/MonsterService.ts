import { isLeft } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import { isObjectLike } from "lodash";
import { Monster } from "../models/Monster";
import {
    ExtendedMonster,
    isExtendedMonster,
    isMonster,
    MonsterData,
    MonsterReference,
    MonsterSchema
} from "../models/MonsterData";
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
        console.log(monsters.find(m => m.name === "Claugiyliamatar"));
        const found = new Set<string>();
        monsters.forEach(m => {
            if (m.languages != null) {
                m.languages.forEach(i => {
                    found.add(i);
                });
            }
        });
        console.log(found);
        let first = true;
        return monsters
            .map(m => {
                const result = MonsterSchema.decode(m);
                if (isLeft(result)) {
                    console.log(m);
                    console.log(PathReporter.report(result).join("\n"));
                    return m;
                } else {
                    const differentKeys = Object.keys(result.right).filter(
                        key =>
                            !isEqual(
                                (m as any)[key],
                                (result.right as any)[key]
                            )
                    );
                    if (differentKeys.length > 0 && first) {
                        console.error("Found different keys", differentKeys);
                        console.log(result.right);
                        console.log(m);
                        first = false;
                    }
                    return result.right;
                }
            })
            .map(toMonster);
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
