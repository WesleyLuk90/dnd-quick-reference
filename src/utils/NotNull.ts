export function notNull<T extends {}>(t: T | null | undefined): t is T {
    return t != null;
}

export function checkNotNull<T extends {}>(t: T | null | undefined): T {
    if (t == null) {
        throw new Error("got null");
    }
    return t;
}
