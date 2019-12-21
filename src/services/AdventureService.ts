import {
    AdventureSchema,
    AdventureSummarySchema
} from "../dataModels/AdventureData";
import { parseData } from "../dataModels/Parse";
import { AdventureSummary } from "../models/AdventureSummary";
import { notNull } from "../utils/NotNull";
import { HttpService } from "./HttpService";

export class AdventureService {
    static async list() {
        const data: { adventure: any[] } = await HttpService.getJson(
            "/data/adventures.json"
        );
        const adventures = data.adventure
            .map((p: any) => parseData(AdventureSummarySchema, p))
            .filter(notNull);
        return adventures.map(a => new AdventureSummary(a.name, a.id));
    }

    static async get(sum: AdventureSummary) {
        const data = await HttpService.getJson(
            `/data/adventure/adventure-${sum.id.toLocaleLowerCase()}.json`
        );
        console.log(data);
        parseData(AdventureSchema, data);
    }
}
