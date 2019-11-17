export function ordinal(count: number): string {
    switch (count) {
        case 0:
            return "0th";
        case 1:
            return "1st";
        case 2:
            return "2nd";
        case 3:
            return "3rd";
        default:
            return `${count}th`;
    }
}
