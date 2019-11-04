import { MonsterType, Size } from "./Monster";

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
    if (typeof type === "string") {
        return type;
    }
    return type.type;
}
