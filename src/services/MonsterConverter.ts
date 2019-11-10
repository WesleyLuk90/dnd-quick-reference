import { ArmorCheck } from "../models/ArmorCheck";
import { Monster } from "../models/Monster";
import { MonsterData } from "../models/MonsterData";

function toAC(ac: MonsterData["ac"]): ArmorCheck[] {
    return ac.map(a => {
        if (typeof a == "number") {
            return new ArmorCheck(a, [], null);
        } else {
            return new ArmorCheck(a.ac, a.from || [], a.condition || null);
        }
    });
}

export function toMonster(monsterData: MonsterData): Monster {
    return new Monster(
        monsterData.name,
        monsterData.source,
        toAC(monsterData.ac)
    );
}
