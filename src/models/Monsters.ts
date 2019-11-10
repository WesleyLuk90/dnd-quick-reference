import { ArmorClass } from "./ArmorClass";
import { MonsterType } from "./MonsterType";
import { Size } from "./Size";

export function formatSize(size: Size): string {
    switch (size) {
        case Size.TINY:
            return "tiny";
        case Size.SMALL:
            return "small";
        case Size.MEDIUM:
            return "medium";
        case Size.LARGE:
            return "large";
        case Size.HUGE:
            return "huge";
        case Size.GIGANTIC:
            return "gigantic";
    }
}

export function formatType(type: MonsterType): string {
    return type.type;
}

export function formatArmorClasses(armorClass: ArmorClass[]): string {
    return armorClass.map(a => a.format()).join(" ");
}
