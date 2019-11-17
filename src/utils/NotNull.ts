export function notNull<T extends {}>(t: T | null | undefined): t is T {
    return t != null;
}
