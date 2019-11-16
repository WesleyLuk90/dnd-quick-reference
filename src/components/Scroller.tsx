import React, { useEffect, useRef, useState } from "react";
import "./Scroller.css";

interface ScrollerPosition {
    scrollDistance: number;
    height: number;
}

export function Scroller<T>({
    elements,
    render,
    elementHeight
}: {
    elements: T[];
    render: (t: T) => React.ReactNode;
    elementHeight: number;
}) {
    const [position, setPosition] = useState<ScrollerPosition>({
        scrollDistance: 0,
        height: 1000
    });

    const scrollTarget = useRef<HTMLDivElement>(null);
    const timeout = useRef<number | null>(null);
    function updateScroll(scroller: HTMLDivElement | null | undefined) {
        if (scroller == null) {
            return;
        }
        setPosition({
            scrollDistance: scroller.scrollTop,
            height: scroller.clientHeight
        });
    }

    useEffect(() => {
        updateScroll(scrollTarget.current);
    }, []);

    function onScroll() {
        if (timeout.current == null) {
            timeout.current = requestAnimationFrame(() => {
                timeout.current = null;
                updateScroll(scrollTarget.current);
            });
        }
    }

    const before = Math.floor(position.scrollDistance / elementHeight);
    const count = Math.ceil(position.height / elementHeight) + 1;
    const after = elements.length - before - count;

    return (
        <div className="scroller" onScroll={onScroll} ref={scrollTarget}>
            <div className="scroller__area">
                <div
                    className="scroller__top-padding"
                    style={{ height: before * elementHeight }}
                />
                {elements.slice(before, before + count).map(render)}
                <div
                    className="scroller__bottom-padding"
                    style={{
                        height: after * elementHeight
                    }}
                />
            </div>
        </div>
    );
}
