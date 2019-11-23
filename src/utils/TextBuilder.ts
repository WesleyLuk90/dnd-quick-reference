export class TextBuilder {
    phrases: string[] = [];

    add(text: string | null | undefined) {
        if (text != null && text !== "") {
            this.phrases.push(text);
        }
        return this;
    }

    list(items: string[]) {
        if (items.length > 0) {
            this.phrases.push(items.join(", "));
        }
        return this;
    }

    note(callable: (t: TextBuilder) => TextBuilder) {
        const builder = callable(new TextBuilder());
        if (builder.nonEmpty()) {
            this.phrases.push(`(${builder.build()})`);
        }
        return this;
    }

    nonEmpty() {
        return this.phrases.length > 0;
    }

    build() {
        return this.phrases.join(" ");
    }
}
