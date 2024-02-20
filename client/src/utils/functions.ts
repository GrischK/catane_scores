import React from "react";

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const defaultColor = 'hsl(50deg, 100%, 50%)';

export const generateSparkle = (color = defaultColor) => {
    return {
        id: String(random(10000, 99999)),
        createdAt: Date.now(),
        color,
        size: random(10, 20),
        style: {
            top: random(-50, 100) + '%',
            left: random(-50, 100) + '%',
            zIndex: 2,
        }
    }
}

export const useRandomInterval = (callback: () => void, minDelay: number, maxDelay: number): (() => void) => {
    const timeoutId = React.useRef<number | null>(null);
    const savedCallback = React.useRef<() => void>(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        let isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number';
        if (isEnabled) {
            const handleTick = () => {
                const nextTickAt = random(minDelay, maxDelay);
                timeoutId.current = window.setTimeout(() => {
                    savedCallback.current();
                    handleTick();
                }, nextTickAt);
            };
            handleTick();
        }
        return () => {
            if (timeoutId.current !== null) {
                window.clearTimeout(timeoutId.current);
            }
        };
    }, [minDelay, maxDelay]);

    const cancel = React.useCallback(() => {
        if (timeoutId.current !== null) {
            window.clearTimeout(timeoutId.current);
        }
    }, []);

    return cancel;
};

export const range = (start: number, end?: number, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
};