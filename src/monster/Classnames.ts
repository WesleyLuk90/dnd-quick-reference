import { flatten } from "lodash";

interface ClassNamesObject {
    [key: string]: boolean;
}

function fromKeys(classes: ClassNamesObject) {
    return Object.keys(classes).filter(c => classes[c]);
}

export function classNames(...classes: (ClassNamesObject | string)[]) {
    return flatten(
        classes.map(c => {
            if (typeof c === "string") {
                return [c];
            } else {
                return fromKeys(c);
            }
        })
    ).join(" ");
}
