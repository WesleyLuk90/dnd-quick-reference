export function assertNever(x: never): never {
    throw new Error("Unexpected value. Should have been never.");
}
