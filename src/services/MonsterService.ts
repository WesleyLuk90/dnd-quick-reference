import { isLeft } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";
import { isObjectLike } from "lodash";
import {
    ExtendedMonster,
    isExtendedMonster,
    isMonster,
    Monster,
    MonsterReference,
    MonsterSchema
} from "../models/Monster";
import { HttpService } from "./HttpService";

function url(file: string) {
    return `/data/bestiary/${file}`;
}

interface Index {
    [key: string]: string;
}

interface Bestiary {
    monster: (Monster | ExtendedMonster)[];
}

function find(monsters: Monster[], ref: MonsterReference): Monster {
    const found = monsters.find(
        m =>
            m.name.toLowerCase() === ref.name.toLowerCase() &&
            (ref.source == null || ref.source === m.source)
    );
    if (found == null) {
        throw new Error(`Failed to find monster ${JSON.stringify(ref)}`);
    }
    return found;
}

export class MonsterService {
    static async all(): Promise<Monster[]> {
        const res = await HttpService.getJson<Index>(url("index.json"));
        let monsters: Monster[] = [];
        let extended: ExtendedMonster[] = [];
        for (const key in res) {
            const response = await HttpService.getJson<Bestiary>(url(res[key]));
            monsters = monsters.concat(response.monster.filter(isMonster));
            extended = extended.concat(
                response.monster.filter(isExtendedMonster)
            );
        }
        extended.forEach(m => {
            const found = find(monsters, m._copy);
            monsters.push({ ...found, ...m });
        });
        let first = true;
        return monsters.map(m => {
            const result = MonsterSchema.decode(m);
            if (isLeft(result)) {
                console.log(m);
                console.log(PathReporter.report(result).join("\n"));
                return m;
            } else {
                const differentKeys = Object.keys(result.right).filter(
                    key => !isEqual((m as any)[key], (result.right as any)[key])
                );
                if (differentKeys.length > 0 && first) {
                    console.log(differentKeys);
                    console.log(result.right);
                    console.log(m);
                    first = false;
                }
                return result.right;
            }
        });
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
