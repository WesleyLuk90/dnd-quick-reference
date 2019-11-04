import { HttpService } from "./HttpService";

function url(file: string) {
    return `/data/bestiary/${file}`;
}

interface Index {
    [key: string]: string;
}

export interface MonsterReference {
    name: string;
    book?: string;
}

export interface Monster {
    source: string;
    name: string;
    isNpc: boolean;
    _copy: boolean;
}

interface Bestiary {
    monster: Monster[];
}

export class CreatureService {
    static async all(): Promise<Monster[]> {
        const res = await HttpService.getJson<Index>(url("index.json"));
        let all: Monster[] = [];
        for (const key in res) {
            const response = await HttpService.getJson<Bestiary>(url(res[key]));
            all = all.concat(response.monster);
        }
        return all;
    }

    static async get(ref: MonsterReference): Promise<Monster> {
        const all = await CreatureService.all();
        const found = all.find(
            m => m.name.toLowerCase() == ref.name.toLowerCase()
        );
        if (found == null) {
            throw new Error(`Failed to find monster ${JSON.stringify(ref)}`);
        }
        return found;
    }
}
