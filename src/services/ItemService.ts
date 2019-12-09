import { Item } from "../models/Item";
import { HttpService } from "./HttpService";

export class ItemService {
    static async all(): Promise<Item[]> {
        const json = await HttpService.getJson("data/items.json");
        console.log(json);
        return [];
    }
}
