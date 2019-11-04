export function makeLine(...parts: string[]): string {
    return sentenceCase(parts.join(" "));
}

export function sentenceCase(line: string): string {
    return line.charAt(0).toLocaleUpperCase() + line.slice(1);
}
