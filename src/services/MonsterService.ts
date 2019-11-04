import { HttpService } from "./HttpService";
import { Monster, MonsterReference } from "../models/Monster";

function url(file: string) {
    return `/data/bestiary/${file}`;
}

interface Index {
    [key: string]: string;
}

interface Bestiary {
    monster: Monster[];
}

export class MonsterService {
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
        const all = await MonsterService.all();
        const found = all.find(
            m =>
                m.name.toLowerCase() === ref.name.toLowerCase() &&
                (ref.book == null || ref.book === m.source)
        );
        if (found == null) {
            throw new Error(`Failed to find monster ${JSON.stringify(ref)}`);
        }
        return found;
    }
}
