export function getMod(value: number) {
    return Math.floor((value - 10) / 2);
}

export function getSignedMod(value: number) {
    const mod = getMod(value);
    if (mod >= 0) {
        return `+${mod}`;
    } else {
        return mod.toString();
    }
}
