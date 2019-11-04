import { Alignments, CompoundAlignment, MonsterType, Size } from "./Monster";

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

export function formatAlignment(alignment: CompoundAlignment): string {
    if (alignment == null) {
        return "any";
    }
    return alignment
        .map(a => {
            switch (a) {
                case Alignments.LAWFUL:
                    return "lawful";
                case Alignments.NEUTRAL:
                    return "neutral";
                case Alignments.NEUTRAL_X:
                    return "neutral X";
                case Alignments.NEUTRAL_Y:
                    return "neutral Y";
                case Alignments.CHAOTIC:
                    return "chaotic";
                case Alignments.GOOD:
                    return "good";
                case Alignments.EVIL:
                    return "evil";
                case Alignments.UNALIGNED:
                    return "unaligned";
                case Alignments.ANY:
                    return "any";
                default:
                    return "other";
            }
        })
        .join(" ");
}
