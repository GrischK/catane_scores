import React from "react";
import {ReactNode} from "react";
import styles from "./MysteriousText.module.css"
import {animated, useSprings} from "react-spring";

interface MysteriousTextProps {
    children: ReactNode;
    colorsList: string[];
}

export default function MysteriousText({children, colorsList}: MysteriousTextProps) {
    const childText = children && typeof children === "string" ? children : "";
    const colors = colorsList;

    const animations = useSprings(
        childText.length,
        childText.split("").map((_, index) => ({
            from: {opacity: 0},
            to: {opacity: 1},
            delay: Math.random() * 750,
        }))
    );

    return (
        <div className={styles.mysterious_text}>
            {animations.map((animation, index) => (
                <animated.span key={index} style={{
                    ...animation,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    fontFamily: 'Indie Flower, cursive',
                    fontWeight: 'bolder',
                    margin: '2px',
                    marginTop: '5vh',
                    textShadow: '1px 1px 2px grey',
                    // WebkitTextStroke: '.5px black'
                }}>
                    {childText[index]}
                </animated.span>
            ))}
        </div>
    );
}
