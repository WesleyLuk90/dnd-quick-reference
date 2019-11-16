import React from "react";

export function Input({
    value,
    onChange
}: {
    value: string;
    onChange: (newValue: string) => void;
}) {
    return (
        <input
            value={value}
            onChange={e => {
                onChange(e.target.value);
            }}
        />
    );
}
