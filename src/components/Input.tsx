import React from "react";

export function Input({
    value,
    onChange,
    placeholder
}: {
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
}) {
    return (
        <input
            className="form-control"
            value={value}
            onChange={e => {
                onChange(e.target.value);
            }}
            placeholder={placeholder}
        />
    );
}
