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

export function defaultFormat<T extends { format(): string }>(ts: T[]): string {
    return ts.map(t => t.format()).join(", ");
}

export class Formatter {
    static create(base: string) {
        return new Formatter(base);
    }
    constructor(private base: string) {}

    private conditions: string[] = [];

    addCondition(value: string | null, format: (s: string) => string = s => s) {
        if (value != null && value !== "") {
            this.conditions.push(`${format(value)}`);
        }
        return this;
    }

    format() {
        return [this.base, ...this.conditions].join(" ");
    }
}
