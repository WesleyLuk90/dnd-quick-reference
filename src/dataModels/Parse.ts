import { isLeft, Left } from "fp-ts/lib/Either";
import * as t from "io-ts";

function printError(original: any, result: Left<t.Errors>) {
    console.error(`Found ${result.left.length} errors`);
    console.log(original);
    result.left.forEach((error, i) => {
        if (i > 10) {
            return;
        }
        const path = error.context
            .map(c => c.key)
            .filter(k => !!k)
            .join(".");
        const value = (JSON.stringify(error.value) || "undefined").slice(0, 80);
        console.log(
            `${error.message || "Invaild value"} at ${path} got ${value}`
        );
    });
}

export function parseData<O>(model: t.Type<O>, data: any): O | null {
    const results = model.decode(data);
    if (isLeft(results)) {
        printError(data, results);
        return null;
    } else {
        return results.right;
    }
}
