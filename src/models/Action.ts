import { Content } from "./Content";

export class Action {
    constructor(readonly name: string, readonly content: Content) {}
}
