import React from "react";

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const defaultColor = 'hsl(50deg, 100%, 50%)';


// Function that will create a new sparkle instance
export const generateSparkle = (color = defaultColor) => {
    return {
        id: String(random(10000, 99999)),
        createdAt: Date.now(),

        // Bright yellow color by default
        color,
        size: random(10, 20),
        style: {
            top: random(-50, 100) + '%',
            left: random(-50, 100) + '%',
            zIndex: 2,
        }
    }
}

// Function for random number generation for interval sparkles apparition
export const useRandomInterval = (callback: () => void, minDelay: number, maxDelay: number): (() => void) => {
    const timeoutId = React.useRef<number | null>(null);
    const savedCallback = React.useRef<() => void>(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
            const handleTick = () => {
                const nextTickAt = random(minDelay, maxDelay);
                timeoutId.current = window.setTimeout(() => {
                    savedCallback.current();
                    handleTick();
                }, nextTickAt);
            };
            handleTick();
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

// Create a range for example to determine the sparkles number
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

// Check if first letter is vowel or includes part of Ionut firstname
export const isFirstLetterVowel = (word: string) => {
    if (word.includes('Ion') || word.includes('Yon')) {
        return
    }
    return /^[aeiou]/i.test(word);
};