import React from "react";
import { animated, useSprings } from "react-spring";
import { ReactNode } from "react";

interface MysteriousTextProps {
    children: ReactNode;
}

export default function MysteriousText({ children, ...props }: MysteriousTextProps) {
    const childText = children && typeof children === "string" ? children : "";

    // Créez un tableau de configurations d'animation pour chaque lettre avec un délai aléatoire
    const animations = useSprings(
        childText.length,
        childText.split("").map((_, index) => ({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: Math.random() * 350,
        }))
    );

    return (
        <>
            {animations.map((animation, index) => (
                <animated.span key={index} style={animation} {...props}>
                    {childText[index]}
                </animated.span>
            ))}
        </>
    );
}
