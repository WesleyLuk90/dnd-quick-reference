import React, { useState } from "react";

export function CreatureCard() {
    const [count, setCount] = useState(2);

    return (
        <div>
            Monster {count}{" "}
            <button onClick={() => setCount(count + 1)}>Foo</button>
        </div>
    );
}
